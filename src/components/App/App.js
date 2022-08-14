import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound"
import Login from "../Login/Login";
import SavedMovies from "../SavedMovies/SavedMovies";
import { CurrentUserContext } from "../../utils/contexts/CurrentUserContext"

function App() {

  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "Лера", email: "v.a.kozh@ya.ru" })
  const navigate = useNavigate();

  const handleSignin = ({ name, email }) => {
    setIsloggedIn(true);
    setCurrentUser({ name, email })
  }

  const handleSignup = ({ name, email, password }) => {
    setIsloggedIn(true);
    setCurrentUser({
      name: name,
      email: email
    })
  }

  const handleLogout = () => {
    setIsloggedIn(false);
    setCurrentUser({});
    navigate("/signin")
  }

  const handleEditProfile = ({ name, email }) => {
    setCurrentUser({
      name: name,
      email: email
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/movies"
            element={
              <Movies isLoggedIn={true} />
            } />

          <Route
            path="/saved-movies"
            element={
              <SavedMovies
                isLoggedIn={true}
                isSavedMovies={true} />
            } />

          <Route
            path="/profile"
            element={
              <Profile
                isLoggedIn={true}
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
