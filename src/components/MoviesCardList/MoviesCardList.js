import React, { useEffect, useState } from "react"
import useWindowWidth from "../../hooks/useWindowWidth";
import { moviesApi } from "../../utils/MoviesApi";
import { getDataForBD } from "../../utils/utils";
import MoviesCard from "../MoviesCard/MoviesCard"
import "./MoviesCardList.css"

export default function MoviesCardList({
  isSavedMoviesPage = false,
  foundMovies,
  setFoundMovies,
  showError,
  page
}) {

  const screenWidth = useWindowWidth();
  const moreMoviesCount = screenWidth >= 1280 ? 4 : 2;
  const moviesCount = screenWidth >= 1280 ? 16 : screenWidth >= 768 ? 8 : 5;
  const [isCanLoadMore, setIsCanLoadMore] = useState(true);
  const [renderedMoviesCount, setRenderedMoviesCount] = useState(moviesCount);

  const loadMoreMovies = () => setRenderedMoviesCount(renderedMoviesCount + moreMoviesCount)

  const savedMoviesLocal = (movie) =>
    foundMovies.map(fm => {
      if (fm.movieId === movie.movieId) {
        movie.isSaved = true;
        return movie;
      }
      return fm;
    });

  const removedMoviesLocal = (movie) => {
    let movies = JSON.parse(localStorage.getItem(`movies-searchResult`));
    movies = foundMovies.map(fm => {
      if (fm.movieId === movie.movieId)
        fm.isSaved = false
      return fm
    })
    localStorage.setItem(`movies-searchResult`, JSON.stringify(movies))
    return isSavedMoviesPage &&
      foundMovies.filter((fm) => fm.movieId !== movie.movieId)
  }


  const handleLike = (isLike, movie) => {
    if (isLike) {
      moviesApi
        .saveMovie(getDataForBD(movie))
        .then(movie => {
          const movies = savedMoviesLocal(movie)
          setFoundMovies(movies)
          localStorage.setItem(`${page}-searchResult`, JSON.stringify(movies))
        })
        .catch(showError)
    }
    else
      moviesApi
        .removeMovie(movie._id)
        .then(movie => {
          const movies = removedMoviesLocal(movie)
          setFoundMovies(movies)
          localStorage.setItem(`${page}-searchResult`, JSON.stringify(movies))
        })
        .catch(showError)
  }

  useEffect(() => {
    setIsCanLoadMore(foundMovies.length > 0
      && foundMovies.length > renderedMoviesCount
      ? true
      : false);
  }, [renderedMoviesCount, foundMovies])

  return (
    <div className="section section__movies-list">
      {
        foundMovies.length > 0
          ? <div className="movies-list__container">
            {foundMovies.slice(0, renderedMoviesCount).map((movie) =>
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
