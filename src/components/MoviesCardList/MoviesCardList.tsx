import React, { useEffect, useState } from "react";
import { saveMovies } from "../../features/moviesSlice";
import { saveSavedMovies } from "../../features/savedMoviesSlice";
import useWindowWidth from "../../hooks/useWindowWidth";
import { useAppDispatch } from "../../store/hooks";
import {
  SCREEN,
  START_COUNT_MOVIES,
  COUNT_MOVIES,
} from "../../utils/constants";
import { moviesApi } from "../../utils/MoviesApi";
import {
  getDataForDB,
  // filledLikeMovies,
  // removedLikeMovies,
  dRemovedLikeMovies,
  dFilledLikeMovies,
} from "../../utils/utils";
import MoviesCard from "../MoviesCard/MoviesCard";
import { IMovie, IsetMovies, IshowError } from "../types/types";
import "./MoviesCardList.css";

type MoviesCardListProps = {
  isSavedMoviesPage?: boolean;
  movies: IMovie[];
  searchedMovies: IMovie[];
  savedMovies: IMovie[];
  setSearchedMovies: IsetMovies;
  showError: IshowError;
  // setSavedMovies: IsetMovies;
  // setMovies: IsetMovies;
};

export default function MoviesCardList({
  isSavedMoviesPage = false,
  searchedMovies,
  setSearchedMovies,
  // setSavedMovies,
  // setMovies,
  movies,
  showError,
  savedMovies,
}: MoviesCardListProps) {
  const screenWidth = useWindowWidth();
  const dispatch = useAppDispatch();

  const moreMoviesCount =
    screenWidth >= SCREEN.DESKTOP ? COUNT_MOVIES.DESKTOP : COUNT_MOVIES.TABLET;

  const moviesCount =
    screenWidth >= SCREEN.DESKTOP
      ? START_COUNT_MOVIES.DESKTOP
      : screenWidth >= SCREEN.TABLET
      ? START_COUNT_MOVIES.TABLET
      : START_COUNT_MOVIES.MOBILE;

  const [isCanLoadMore, setIsCanLoadMore] = useState(true);
  const [renderedMoviesCount, setRenderedMoviesCount] = useState(moviesCount);

  const loadMoreMovies = () =>
    setRenderedMoviesCount(renderedMoviesCount + moreMoviesCount);

  const saveMovieLocal = (movie: IMovie) => {
    movie.isSaved = true;
    setSearchedMovies(dFilledLikeMovies(searchedMovies, movie));
    // setSavedMovies([...savedMovies, movie]);
    dispatch(saveSavedMovies([...savedMovies, movie]));
  };

  const removeMovieLocal = (movie: IMovie) => {
    if (isSavedMoviesPage) {
      setSearchedMovies(
        searchedMovies.filter((sm) => sm.movieId !== movie.movieId)
      );
    }

    dispatch(saveMovies(dRemovedLikeMovies(movies, movie)));
    dispatch(
      saveSavedMovies(savedMovies.filter((sm) => sm.movieId !== movie.movieId))
    );
    // setSavedMovies(savedMovies.filter((sm) => sm.movieId !== movie.movieId));
    // setMovies(removedLikeMovies(movies, movie));
  };

  const handleLike = (isLike: boolean, movie: IMovie) => {
    if (isLike) {
      moviesApi
        .saveMovie(getDataForDB(movie))
        .then(saveMovieLocal)
        .catch(showError);
    } else {
      moviesApi
        .removeMovie(movie._id as number)
        .then(removeMovieLocal)
        .catch(showError);
    }
  };

  useEffect(() => {
    setIsCanLoadMore(
      searchedMovies.length > 0 && searchedMovies.length > renderedMoviesCount
        ? true
        : false
    );
  }, [renderedMoviesCount, searchedMovies]);

  return (
    <div className="section section__movies-list">
      {searchedMovies && searchedMovies.length > 0 ? (
        <div className="movies-list__container">
          {searchedMovies.slice(0, renderedMoviesCount).map((movie) => (
            <MoviesCard
              key={movie.movieId}
              isSavedMoviesPage={isSavedMoviesPage}
              movie={movie}
              handleLike={handleLike}
            />
          ))}
        </div>
      ) : (
        <p className="movies-list__message">Ничего не найдено.</p>
      )}
      {isCanLoadMore && (
        <button onClick={loadMoreMovies} className="movies-list__button-more">
          Ещё
        </button>
      )}
    </div>
  );
}
