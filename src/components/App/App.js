import { useCallback, useEffect, useState } from "react";
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
import { checkIsSaved, formatMovies } from "../../utils/utils";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

function App() {

  const [isLoggedIn, setIsloggedIn] = useState(false);
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
      .then(_ => {
        navigate('/signin', { replace: true })
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

  const loadMovies = useCallback(() => {
    const beatsMovieFetch = beatfilmMoviesApi.getMovies(setIsLoading);
    const moviesFetch = moviesApi.getMovies(setIsLoading);

    isLoggedIn &&
      Promise
        .all([beatsMovieFetch, moviesFetch])
        .then(data => {
          const formattedMovies = formatMovies(data[0]);
          const savedMovies = data[1] || {};
          const checkedMovies = checkIsSaved(formattedMovies, savedMovies);

          setMovies(checkedMovies);
          setSavedMovies(savedMovies);
        })
        .catch(showError);
  }, [isLoggedIn, savedMovies, showError])

  useEffect(() => {
    loadMovies();
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
                  isLoggedIn={isLoggedIn}
                  component={Movies}
                  movies={movies}
                  isLoading={isLoading}
                  showError={showError}
                />
              } />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  component={SavedMovies}
                  isLoading={isLoading}
                  movies={savedMovies}
                  showError={showError}
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
                <Login signin={handleSignin} />
              } />

            <Route
              path="/signup"
              element={
                <Register signup={handleSignup} />
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
          setIsShowError={setIsShowError} />
      }
    </>
  );
}

export default App;
