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
import { checkIsSaved, formatMovies, fillAllIsSaved } from "../../utils/utils";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

function App() {

  const [isLoggedIn, setIsloggedIn] = useState(undefined);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState(JSON.parse(localStorage.getItem('movies')) || []);
  const [savedMovies, setSavedMovies] = useState(
    JSON.parse(localStorage.getItem('savedMovies')) || []);
  const [isShowMessage, setIsShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoadData, setIsLoadData] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const showMessage = (message, isError = true) => {
    setMessage(isError ? message.message : message)
    location.pathname !== '/' && setIsShowMessage(true)
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
          navigate(location.pathname, { replace: true });
        }
        else {
          clearVisitData();
        }
      })
      .catch(e => {
        showMessage(e)
        navigate('/signin');
      })
  }

  const handleSignin = (data) => {
    mainApi
      .login(data)
      .then(user => {
        setVisitData(user)
        navigate('/movies', { replace: true })
      })
      .catch(showMessage)
  }

  const handleSignup = ({ name, email, password }) => {
    mainApi
      .register({ name, email, password })
      .then(user => {
        handleSignin({ email, password })
      })
      .catch(showMessage)
  }

  const handleLogout = () => {
    mainApi
      .logout()
      .then(_ => {
        clearVisitData();
      })
      .catch(showMessage)
  }

  const handleEditProfile = async (data) => {
    mainApi
      .updateProfile(data)
      .then(({ ...userData }) => {
        setCurrentUser({ ...userData });
        showMessage('Сохранено', false);
      })
      .catch(showMessage)
  }

  const loadData = () => {

    isLoggedIn === true && !isLoadData && !movies.length &&
      Promise
        .all([
          beatfilmMoviesApi.getMovies(setIsLoading),
          moviesApi.getMovies(setIsLoading)])
        .then(data => {
          const formattedMovies = formatMovies(data[0]);
          const savedMovies = fillAllIsSaved(data[1]) || {};
          const checkedMovies = checkIsSaved(formattedMovies, savedMovies);

          setMovies(checkedMovies);
          setSavedMovies(savedMovies);

          localStorage.setItem(`savedMovies`, JSON.stringify(savedMovies));
          localStorage.setItem(`movies-searchResult`, JSON.stringify(
            formattedMovies.map(m => m.movieId)))
        })
        .catch(showMessage);

    setIsLoadData(true);
  };

  useEffect(() => {
    movies && localStorage.setItem(`movies`, JSON.stringify(movies));
  }, [movies])

  useEffect(() => {
    savedMovies && localStorage.setItem(`savedMovies`, JSON.stringify(savedMovies));
  }, [savedMovies])

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
                  showMessage={showMessage}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  loadData={loadData}
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
                  showMessage={showMessage}
                  savedMovies={savedMovies}
                  setSavedMovies={setSavedMovies}
                  loadData={loadData}
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
                  setMessage={setMessage}
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

      {isShowMessage &&
        <ErrorPopup
          message={message}
          setMessage={setMessage}
          setIsShowMessage={setIsShowMessage}
        />
      }
    </>
  );
}

export default App;
