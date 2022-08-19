import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound"
import Login from "../Login/Login";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";

function App() {

  const [isLoggedIn, setIsloggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({})
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
        else setIsloggedIn(false)
      })
      .catch(error => console.error(error))
  }

  const handleSignin = (data) => {
    mainApi
      .login(data)
      .then(_ => {
        tokenCheck();
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
      .then(res => {
        console.log(res)
        tokenCheck();
        setCurrentUser({});
        navigate("/signin", { replace: true })
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
                component={Movies} />
            } />

          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                component={SavedMovies} />
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
