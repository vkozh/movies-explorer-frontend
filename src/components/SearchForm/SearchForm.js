import React, { useCallback, useEffect, useState } from "react"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"

export default function SearchForm({ movies, setFoundMovies, fromPage }) {
  const [inputValue, setInputValue] = useState('');
  const [isShortMovies, setIsShortMovies] = useState(false);
  const handleChangeInput = (e) => setInputValue(e.target.value);

  const handleSearch = useCallback(() => {

    const findMovies = (movie) =>
      movie.nameRU.toLowerCase().includes(inputValue.toLowerCase())

    const findMoviesAndShort = () =>
      movies.filter(movie =>
        isShortMovies
          ? findMovies(movie) && movie.duration <= 40
          : findMovies(movie)
      )

    const foundMovies = findMoviesAndShort();
    setFoundMovies(foundMovies);

    localStorage.setItem(`${fromPage}-searchResult`, JSON.stringify(foundMovies));
    localStorage.setItem(`${fromPage}-keyWord`, inputValue);

  }, [movies, inputValue, isShortMovies, setFoundMovies, fromPage])


  useEffect(() => {
    setInputValue(localStorage.getItem(`${fromPage}-keyWord`))
    setIsShortMovies(!!localStorage.getItem(`${fromPage}-isShortMovies`))
  }, [])

  return (
    <div className="section search-form">
      <div className="search-form__input-bar input-bar">
        <input
          value={inputValue || ''}
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
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        search={handleSearch}
        fromPage={fromPage}
      />
    </div>
  )
}
