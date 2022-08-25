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
import { checkIsSaved, formatMovies } from "../../utils/utils";

function App() {

  const [isLoggedIn, setIsloggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const tokenCheck = () => {
    mainApi
      .getUser()
      .then(user => {
        if (user) {
          setIsloggedIn(true)
          setCurrentUser(user);
          navigate(location.pathname);
        }
        else {
          setIsloggedIn(false)
          setCurrentUser({});
          localStorage.clear();
          navigate('/')
        }
      })
      .catch(error => console.error(error))
  }

  const handleSignin = (data) => {
    mainApi
      .login(data)
      .then(user => {
        setIsloggedIn(true)
        setCurrentUser(user);
        navigate('/movies', { replace: true })
      })
      .catch(error => console.error(error))
  }

  const handleSignup = (data) => {
    mainApi
      .register(data)
      .then(_ => {
        navigate('/signin', { replace: true })
      })
      .catch(error => console.error(error))
  }

  const handleLogout = () => {
    mainApi
      .logout()
      .then(_ => {
        tokenCheck();
        navigate("/", { replace: true })
      })
      .catch(error => console.error(error))
  }

  const handleEditProfile = (data) => {
    mainApi
      .editProfile(data)
      .then((name, email) => {
        setCurrentUser({ name, email })
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    tokenCheck();

    const beatsMovieFetch = beatfilmMoviesApi.getMovies(setIsLoading);
    const moviesFetch = moviesApi.getMovies(setIsLoading);

    Promise
      .all([beatsMovieFetch, moviesFetch])
      .then(data => {
        const formattedMovies = formatMovies(data[0]);
        const savedMovies = data[1];
        const checkedMovies = checkIsSaved(formattedMovies, savedMovies);

        setMovies(checkedMovies);
        setSavedMovies(savedMovies);
      })
      .catch(error => console.log(error));
  }, [])

  return (
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
  );
}

export default App;
