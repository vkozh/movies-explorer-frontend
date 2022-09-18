import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice";
import savedMoviesReducer from "../features/savedMoviesSlice";
import userReducer from "../features/user";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    savedMovies: savedMoviesReducer,
    user: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
