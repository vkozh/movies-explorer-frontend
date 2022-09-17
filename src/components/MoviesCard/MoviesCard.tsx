import React from "react"
import "./MoviesCard.css"
import Like from "./Like/Like"
import Remove from "./Remove/Remove"
import { IMovie } from "../types/types"

type MoviesCardProps = {
  isSavedMoviesPage: boolean
  movie: IMovie
  handleLike: (isLike: boolean, movie: IMovie) => void
}

export default function MoviesCard({ isSavedMoviesPage, movie, handleLike }: MoviesCardProps) {
  const { nameRU, duration, image, trailerLink, isSaved = false } = movie;

  function convertDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`
  }

  const handleClick = (isLike: boolean) => {
    handleLike(isLike, movie);
  }

  return (
    <div className="movies-card">
      <a className="movies-card__link" href={trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__cover-image" alt="Обложка фильма" src={String(image)} />
      </a>

      <div className="movies-card__info">
        <p className="movies-card__title">{nameRU}</p>
        {isSavedMoviesPage
          ? <Remove handleClick={handleClick} />
          : <Like handleClick={handleClick} isSaved={isSaved} />}
      </div>

      <p className="movies-card__duration">{convertDuration(duration)}</p>
    </div>
  )
}
