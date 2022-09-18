import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../components/types/types";
import { beatfilmMoviesApi } from "../utils/MoviesApi";
import { formatMovies, getDataLS } from "../utils/utils";

type InitialState = {
  loading: boolean;
  movies: IMovie[];
  error: string | undefined;
};

const initialState: InitialState = {
  loading: false,
  movies: getDataLS("movies") || [],
  error: "",
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  (setIsLoading: (isLoading: boolean) => void) => {
    return beatfilmMoviesApi
      .getMovies(setIsLoading)
      .then((data) => formatMovies(data) as IMovie[]);
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
      state.error = "";
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = false;
      state.movies = [];
      state.error = action.error.message;
    });
  },
});

export default moviesSlice.reducer;
