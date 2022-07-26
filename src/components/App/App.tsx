import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Login from "../Login/Login";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import { beatfilmMoviesApi, moviesApi } from "../../utils/MoviesApi";
import {
  dCheckIsSaved,
  // checkIsSaved,
  // formatMovies,
  // fillAllIsSaved,
  // getDataLS,
} from "../../utils/utils";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import { IMovie, IUser, IMessage } from "../types/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchMovies, saveMovies } from "../../features/moviesSlice";
import { fetchSavedMovies } from "../../features/savedMoviesSlice";
import { fetchUser } from "../../features/userSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsloggedIn] = useState<boolean | undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [movies, setMovies] = useState<IMovie[]>(getDataLS("movies") || []);
  // const [savedMovies, setSavedMovies] = useState<IMovie[]>(
  //   getDataLS("savedMovies") || []
  // );
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isLoadData, setIsLoadData] = useState<boolean>(false);
  const location = useLocation();
  const newIsLoading = useAppSelector((state) => state.movies.loading);
  const newError = useAppSelector((state) => state.movies.error);
  const dMovies = useAppSelector((state) => state.movies.movies);
  const dSavedMovies = useAppSelector((state) => state.savedMovies.movies);

  const showMessage = (message: IMessage | string): void => {
    if (typeof message === "string") setMessage(message);
    else setMessage(message.message);
    location.pathname !== "/" && setIsShowMessage(true);
  };

  useEffect(() => {
    newError && showMessage(newError);
  }, [newError]);

  const setVisitData = (user: IUser): void => {
    setIsloggedIn(true);
    setCurrentUser(user);
  };

  const clearVisitData = (): void => {
    setIsloggedIn(false);
    setCurrentUser(undefined);
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const tokenCheck = (): void => {
    dispatch(fetchUser());

    mainApi
      .getUser()
      .then((user: IUser) => {
        if (user) {
          setVisitData(user);
          navigate(location.pathname, { replace: true });
        }
      })
      .catch((e: string) => {
        showMessage(e);
        clearVisitData();
        navigate("/signin");
      });
  };

  const handleSignin = (data: IUser): void => {
    mainApi
      .login(data)
      .then((user: IUser) => {
        setVisitData(user);
        navigate("/movies", { replace: true });
      })
      .catch(showMessage);
  };

  const handleSignup = ({ name, email, password }: IUser): void => {
    mainApi
      .register({ name, email, password })
      .then(() => {
        handleSignin({ email, password });
      })
      .catch(showMessage);
  };

  const handleLogout = (): void => {
    mainApi
      .logout()
      .then(() => {
        clearVisitData();
      })
      .catch(showMessage);
  };

  const handleEditProfile = async (data: IUser) => {
    mainApi
      .updateProfile(data)
      .then(({ ...userData }) => {
        setCurrentUser({ ...userData });
        showMessage("Сохранено");
      })
      .catch(showMessage);
  };

  const loadData = (): void => {
    if (isLoggedIn === true && !isLoadData) {
      const loadMovies = dispatch(fetchMovies(setIsLoading));
      const loadSavedMovies = dispatch(fetchSavedMovies(setIsLoading));

      Promise.all([loadMovies, loadSavedMovies])
        .then((data) => {
          const movies = data[0].payload as IMovie[];
          const savedMovies = data[1].payload as IMovie[];

          // mark saved movies in dMovies with isSaved = true/false from SavedMovies data
          const checkedMovies = dCheckIsSaved(movies, savedMovies);
          dispatch(saveMovies(checkedMovies));
        })
        .catch(showMessage);
    }
    //   isLoggedIn === true &&
    //     !isLoadData &&
    //     !movies.length &&
    //     Promise.all([
    //       beatfilmMoviesApi.getMovies(setIsLoading),
    //       moviesApi.getMovies(setIsLoading),
    //     ])
    //       .then((data) => {
    //         const formattedMovies = formatMovies(data[0]) as IMovie[];
    //         const savedMovies = fillAllIsSaved(data[1]) || {};
    //         const checkedMovies = checkIsSaved(formattedMovies, savedMovies);

    //         setMovies(checkedMovies);
    //         setSavedMovies(savedMovies);

    //         localStorage.setItem(`savedMovies`, JSON.stringify(savedMovies));
    //         localStorage.setItem(
    //           `movies-searchResult`,
    //           JSON.stringify(formattedMovies.map((m: IMovie) => m.movieId))
    //         );
    //       })
    // .catch(showMessage);

    setIsLoadData(true);
  };

  // useEffect(() => {
  //   movies && localStorage.setItem(`movies`, JSON.stringify(movies));
  // }, [movies]);

  // useEffect(() => {
  //   savedMovies &&
  //     localStorage.setItem(`savedMovies`, JSON.stringify(savedMovies));
  // }, [savedMovies]);

  // useEffect(() => {
  //   if (Object.keys(dMovies).length && Object.keys(dSavedMovies).length) {
  //     const checkedMovies = dCheckIsSaved(dMovies, dSavedMovies);
  //     dispatch(saveMovies(checkedMovies));
  //   }
  // }, [dMovies, dSavedMovies, dispatch]);

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Routes>
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  component={Movies as React.ComponentType}
                  loadData={loadData}
                  isLoggedIn={isLoggedIn}
                  showMessage={showMessage}
                  // with redux
                  movies={dMovies}
                  savedMovies={dSavedMovies}
                  isLoading={newIsLoading}
                  // with local storage and state
                  // isLoading={isLoading}
                  // setIsLoading={setIsLoading}
                  // movies={movies}
                  // setMovies={setMovies}
                  // savedMovies={savedMovies}
                  // setSavedMovies={setSavedMovies}
                />
              }
            />

            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  component={SavedMovies}
                  isLoggedIn={isLoggedIn}
                  showMessage={showMessage}
                  loadData={loadData}
                  // with redux
                  movies={dMovies}
                  savedMovies={dSavedMovies}
                  isLoading={newIsLoading}
                  // with local storage and state
                  // isLoading={isLoading}
                  // setIsLoading={setIsLoading}
                  // movies={movies}
                  // setMovies={setMovies}
                  // savedMovies={savedMovies}
                  // setSavedMovies={setSavedMovies}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  component={Profile as React.ComponentType}
                  logout={handleLogout}
                  editProfile={handleEditProfile}
                  setCurrentUser={setCurrentUser}
                  setMessage={setMessage}
                />
              }
            />

            <Route
              path="/signin"
              element={
                <ProtectedRoute
                  component={Login}
                  isLoggedIn={!isLoggedIn}
                  signin={handleSignin}
                />
              }
            />

            <Route
              path="/signup"
              element={
                <ProtectedRoute
                  component={Register}
                  isLoggedIn={!isLoggedIn}
                  signup={handleSignup}
                />
              }
            />

            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </CurrentUserContext.Provider>

      {isShowMessage && (
        <ErrorPopup
          message={message}
          setMessage={setMessage}
          setIsShowMessage={setIsShowMessage}
        />
      )}
    </>
  );
}

export default App;
