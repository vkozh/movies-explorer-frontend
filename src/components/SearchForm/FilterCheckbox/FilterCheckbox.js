import React from "react"
import "./FilterCheckbox.css"

export default function FilterCheckbox({ isShortMovies, setIsShortMovies, page }) {

  const handleChange = (e) => {
    const isChecked = e.target.checked

    setIsShortMovies(isChecked);
    localStorage.setItem(`${page}-isShortMovies`, isChecked);
  }

  return (
    <div className="checkbox-bar">
      <input
        checked={isShortMovies}
        onChange={handleChange}
        id="checkbox-short-movie"
        type="checkbox"
        className="checkbox-bar__input" />
      <span className="checkbox-bar__fake"></span>
      <label htmlFor="checkbox-short-movie" className="checkbox-bar__label">
        Короткометражки
      </label>
    </div>
  )
}
