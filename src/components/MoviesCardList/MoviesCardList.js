import React, { useEffect, useState } from "react"
import useWindowWidth from "../../hooks/useWindowWidth";
import { moviesApi } from "../../utils/MoviesApi";
import MoviesCard from "../MoviesCard/MoviesCard"
import "./MoviesCardList.css"

export default function MoviesCardList({
  isSavedMovies = false,
  foundMovies,
  setFoundMovies,
  showError
}) {

  const screenWidth = useWindowWidth();
  const moreMoviesCount = screenWidth >= 1280 ? 4 : 2;
  const moviesCount = screenWidth >= 1280 ? 16 : screenWidth >= 768 ? 8 : 5;

  const [isCanLoadMore, setIsCanLoadMore] = useState(true);
  const [renderedMoviesCount, setRenderedMoviesCount] = useState(moviesCount);

  const loadMoreMovies = () => setRenderedMoviesCount(renderedMoviesCount + moreMoviesCount)

  const handleLike = (isLike, movie) => {

    if (isLike) {
      moviesApi
        .saveMovie(movie)
        .catch(showError)
    }
    else
      moviesApi
        .removeMovie(movie._id)
        .then(movie => {
          setFoundMovies(foundMovies.filter(foundMovie => foundMovie._id !== movie._id))
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
                isSavedMovies={isSavedMovies}
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
