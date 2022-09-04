import React, { useEffect, useState } from "react"
import useWindowWidth from "../../hooks/useWindowWidth";
import { SCREEN, START_COUNT_MOVIES, COUNT_MOVIES } from "../../utils/constants";
import { moviesApi } from "../../utils/MoviesApi";
import { getDataForDB, filledLikeMovies, removedLikeMovies } from "../../utils/utils";
import MoviesCard from "../MoviesCard/MoviesCard"
import "./MoviesCardList.css"

export default function MoviesCardList({
  isSavedMoviesPage = false,
  foundMovies,
  searchedMovies,
  setSearchedMovies,
  setSavedMovies,
  setMovies,
  movies,
  setFoundMovies,
  showError,
  savedMovies,
  page
}) {

  const screenWidth = useWindowWidth();

  const moreMoviesCount = screenWidth >= SCREEN.DESKTOP
    ? COUNT_MOVIES.DESKTOP
    : COUNT_MOVIES.TABLET;

  const moviesCount = screenWidth >= SCREEN.DESKTOP
    ? START_COUNT_MOVIES.DESKTOP
    : screenWidth >= SCREEN.TABLET
      ? START_COUNT_MOVIES.TABLET
      : START_COUNT_MOVIES.MOBILE;

  const [isCanLoadMore, setIsCanLoadMore] = useState(true);
  const [renderedMoviesCount, setRenderedMoviesCount] = useState(moviesCount);

  const loadMoreMovies = () => setRenderedMoviesCount(renderedMoviesCount + moreMoviesCount)

  const saveMovieLocal = (movie) => {
    movie.isSaved = true;
    setSearchedMovies(filledLikeMovies(searchedMovies, movie));
    setSavedMovies([...savedMovies, movie])
  }

  const removeMovieLocal = (movie) => {

    if (isSavedMoviesPage) {
      setSearchedMovies(searchedMovies.filter((sm) => sm.movieId !== movie.movieId))
    }

    setSavedMovies(savedMovies.filter(sm => sm.movieId !== movie.movieId))
    setMovies(removedLikeMovies(movies, movie))

  }

  const handleLike = (isLike, movie) => {
    console.log(movie)
    if (isLike) {
      moviesApi
        .saveMovie(getDataForDB(movie))
        .then(saveMovieLocal)
        .catch(showError)
    }
    else {
      moviesApi
        .removeMovie(movie._id)
        .then(removeMovieLocal)
        .catch(showError)
    }
  }

  useEffect(() => {
    setIsCanLoadMore(searchedMovies.length > 0
      && searchedMovies.length > renderedMoviesCount
      ? true
      : false);
  }, [renderedMoviesCount, searchedMovies])

  return (
    <div className="section section__movies-list">
      {
        foundMovies && foundMovies.length > 0
          ? <div className="movies-list__container">
            {searchedMovies.slice(0, renderedMoviesCount).map((movie) =>
              <MoviesCard
                key={movie.movieId}
                isSavedMoviesPage={isSavedMoviesPage}
                movie={movie}
                handleLike={handleLike}
              />)}
          </div>
          : <p className="movies-list__message">Ничего не найдено.</p>
      }
      {isCanLoadMore &&
        <button onClick={loadMoreMovies} className="movies-list__button-more">
          Ещё
        </button>
      }
    </div>
  )


}
