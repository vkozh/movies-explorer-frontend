import React from "react"
import "./MoviesCard.css"
import cover from "../../images/cover.png"
import Like from "./Like/Like"
import Remove from "./Remove/Remove"

export default function MoviesCard({ isSavedMovies }) {
  return (
    <div className="movies-card">
      <img className="movies-card__cover-image" alt="Обложка фильма" src={cover} />
      <div className="movies-card__info">
        <p className="movies-card__title">33 слова о дизайне</p>
        {isSavedMovies
          ? <Remove />
          : <Like />}
      </div>
      <p className="movies-card__duration">1ч 42м</p>
    </div>
  )
}
