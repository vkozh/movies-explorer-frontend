import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound"
import Login from "../Login/Login";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import { beatfilmMoviesApi, moviesApi } from "../../utils/MoviesApi";
import { checkIsSaved, formatMovies, fillAllIsSaved, saveSavedMoviesLS } from "../../utils/utils";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

function App() {

  const [isLoggedIn, setIsloggedIn] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isShowError, setIsShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();
  const location = useLocation();

  const showError = (error) => {
    setErrorMessage(error.message)
    location.pathname !== '/' && setIsShowError(true)
  }

  const setVisitData = (user) => {
    setIsloggedIn(true)
    setCurrentUser(user);
  }

  const clearVisitData = () => {
    setIsloggedIn(false)
    setCurrentUser({});
    localStorage.clear();
    navigate("/", { replace: true })
  }

  const tokenCheck = () => {
    mainApi
      .getUser()
      .then(user => {
        if (user) {
          setVisitData(user)
          navigate(location.pathname);
        }
        else {
          clearVisitData();
          navigate('/sigin')
        }
      })
      .catch(showError)
  }

  const handleSignin = (data) => {
    mainApi
      .login(data)
      .then(user => {
        setVisitData(user)
        navigate('/movies', { replace: true })
      })
      .catch(showError)
  }

  const handleSignup = (data) => {
    mainApi
      .register(data)
      .then(user => {
        setVisitData(user)
        navigate('/movies', { replace: true })
      })
      .catch(showError)
  }

  const handleLogout = () => {
    mainApi
      .logout()
      .then(_ => {
        clearVisitData();
      })
      .catch(showError)
  }

  const handleEditProfile = (data) => {
    mainApi
      .updateProfile(data)
      .then(({ ...userData }) => {
        setCurrentUser({ ...userData })
      })
      .catch(showError)
  }

  useEffect(() => {

    isLoggedIn === true &&
      Promise
        .all([
          beatfilmMoviesApi.getMovies(setIsLoading),
          moviesApi.getMovies(setIsLoading)])
        .then(data => {
          const formattedMovies = formatMovies(data[0]);
          const savedMovies = fillAllIsSaved(data[1]) || {};
          const checkedMovies = checkIsSaved(formattedMovies, savedMovies); // потом убрать

          setMovies(checkedMovies);
          setSavedMovies(savedMovies);

          localStorage.setItem(`movies-searchResult`, JSON.stringify(
            formattedMovies.map(m => m.movieId)))
        })
        .catch(showError);

  }, [isLoggedIn])

  useEffect(() => {
    tokenCheck();
  }, [])

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>

            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  component={Movies}
                  isLoggedIn={isLoggedIn}
                  setMovies={setMovies}
                  movies={movies}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  showError={showError}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              } />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  movies={movies}
                  setMovies={setMovies}
                  component={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  showError={showError}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                />
              } />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  component={Profile}
                  logout={handleLogout}
                  editProfile={handleEditProfile}
                  setCurrentUser={setCurrentUser}
                />
              } />

            <Route
              path="/signin"
              element={
                <ProtectedRoute
                  component={Login}
                  isLoggedIn={!isLoggedIn}
                  signin={handleSignin}
                />
              } />

            <Route
              path="/signup"
              element={
                <ProtectedRoute
                  component={Register}
                  isLoggedIn={!isLoggedIn}
                  signup={handleSignup}
                />
              } />

            <Route
              path="/"
              exact
              element={
                <Main isLoggedIn={isLoggedIn} />
              } />

            <Route
              path="*"
              element={<NotFound />} />

          </Routes>
        </div>
      </CurrentUserContext.Provider>

      {isShowError &&
        <ErrorPopup
          message={errorMessage}
          setErrorMessage={setErrorMessage}
          setIsShowError={setIsShowError}
        />
      }
    </>
  );
}

export default App;
