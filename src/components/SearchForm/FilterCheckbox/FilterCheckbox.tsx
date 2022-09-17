import React from "react"
import "./FilterCheckbox.css"

type FilterCheckboxProps = {
  isShortMovies: boolean
  setIsShortMovies: React.Dispatch<React.SetStateAction<boolean>>
  page: string
}

export default function FilterCheckbox({ isShortMovies, setIsShortMovies, page }: FilterCheckboxProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked

    setIsShortMovies(isChecked);
    if (page === 'movies')
      localStorage.setItem(`${page}-isShortMovies`, String(isChecked));
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
