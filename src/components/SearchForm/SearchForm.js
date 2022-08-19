import React, { useEffect, useState } from "react"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"

export default function SearchForm({ movies, setFoundMovies }) {
  const [inputValue, setInputValue] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const handleChangeInput = (e) => setInputValue(e.target.value);

  const findMovies = (movie) => movie.nameRU.toLowerCase().includes(inputValue.toLowerCase())

  const findMoviesAndShort = () =>
    movies.filter(movie =>
      isShortMovies
        ? findMovies(movie) && movie.duration <= 40
        : findMovies(movie)
    )

  const handleSearch = () => {
    setFoundMovies(findMoviesAndShort());
  }

  useEffect(() => {
    setFoundMovies(findMoviesAndShort());
  }, [isShortMovies])

  return (
    <div className="section search-form">
      <div className="search-form__input-bar input-bar">
        <input
          value={inputValue}
          onChange={handleChangeInput}
          type="text"
          placeholder="Фильм"
          className="input-bar__input"
          required />

        <button
          className="input-bar__button"
          onClick={handleSearch}>
          Поиск
        </button>
      </div>

      <FilterCheckbox
        setIsShortMovies={setIsShortMovies} />
    </div>
  )
}
