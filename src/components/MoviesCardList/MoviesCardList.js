import React, { useEffect, useState } from "react"
import useWindowWidth from "../../hooks/useWindowWidth";
import { moviesApi } from "../../utils/MoviesApi";
import MoviesCard from "../MoviesCard/MoviesCard"
import "./MoviesCardList.css"

export default function MoviesCardList({
  isSavedMovies = false,
  movies
}) {

  const screenWidth = useWindowWidth();
  const moreMoviesCount = screenWidth >= 1280 ? 4 : 2;
  const moviesCount = screenWidth >= 1280 ? 16 : screenWidth >= 768 ? 8 : 5;

  const [isCanLoadMore, setIsCanLoadMore] = useState(true);
  const [renderedMoviesCount, setRenderedMoviesCount] = useState(moviesCount);

  const loadMoreMovies = () => setRenderedMoviesCount(renderedMoviesCount + moreMoviesCount)

  const handleLike = (isLike, movie) => {
    if (isLike) {
      movie['isSaved'] = true;
      moviesApi
        .saveMovie(movie)
        .then(movie => console.log(movie))
        .catch(error => console.log(error))
    }
    else
      moviesApi
        .removeMovie(movie.movieId)
        .then(movie => console.log(movie))
        .catch(error => console.log(error))
  }

  useEffect(() => {
    setIsCanLoadMore(movies.length > 0 && movies.length > renderedMoviesCount ? true : false);
  }, [renderedMoviesCount, movies])

  return (
    <div className="section section__movies-list">
      {
        movies.length > 0
          ? <div className="movies-list__container">{

            movies.slice(0, renderedMoviesCount).map((movie) =>
              <MoviesCard
                key={movie.movieId}
                isSavedMovies={isSavedMovies}
                movie={movie}
                handleLike={handleLike}
              />)

          }</div>
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
