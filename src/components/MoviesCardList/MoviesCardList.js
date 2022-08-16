import React, { useState } from "react"
import MoviesCard from "../MoviesCard/MoviesCard"
import "./MoviesCardList.css"
import Preloader from "../../vendor/Preloader/Preloader"
import useWindowWidth from "../../utils/hooks/useWindowWidth"

export default function MoviesCardList({ isSavedMovies }) {
  const screenWidth = useWindowWidth();
  const moviesCount = screenWidth >= 1280 ? 16 : screenWidth >= 768 ? 8 : 5;
  const savedMoviesCount = screenWidth >= 768 ? 3 : 2;
  const [countMovies, setCountMovies] = useState(isSavedMovies ? savedMoviesCount : moviesCount);
  const [isLoading, setIsLoading] = useState(true);

  const loadMoreMovies = () => {
    setIsLoading(false)
    setTimeout(() => {
      setIsLoading(true)
      setCountMovies(countMovies + (isSavedMovies ? savedMoviesCount : moviesCount))
    }, 1000);
  }

  return (
    <div className="section section__movies-list">
      <div className="movies-list__container">
        {Array(countMovies).fill().map((_, i) =>
          <MoviesCard key={i} isSavedMovies={isSavedMovies} />
        )}
      </div>
      {isLoading
        ? ""
        : <Preloader />
      }
      <button onClick={loadMoreMovies} className="movies-list__button-more">Ещё</button>
    </div>
  )
}
