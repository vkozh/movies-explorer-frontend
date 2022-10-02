import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IMovie } from "../components/types/types";
import { moviesApi } from "../utils/MoviesApi";
import { fillAllIsSaved, getDataLS } from "../utils/utils";

type InitialState = {
  loading: boolean;
  movies: IMovie[];
  error: string | undefined;
};

const initialState: InitialState = {
  loading: false,
  movies: getDataLS("savedMovies") || [],
  error: "",
};

export const fetchSavedMovies = createAsyncThunk(
  "savedMovies/fetchMovies",
  (setIsLoading: (isLoading: boolean) => void) => {
    return moviesApi
      .getMovies(setIsLoading)
      .then((data) => fillAllIsSaved(data) as IMovie[]);
  }
);

const savedMoviesSlice = createSlice({
  name: "savedMovies",
  initialState,
  reducers: {
    saveSavedMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSavedMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSavedMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload;
      state.error = "";
    });
    builder.addCase(fetchSavedMovies.rejected, (state, action) => {
      state.loading = false;
      state.movies = [];
      state.error = action.error.message;
    });
  },
});

export const { saveSavedMovies } = savedMoviesSlice.actions;
export default savedMoviesSlice.reducer;
