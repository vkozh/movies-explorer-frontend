import React, { useCallback, useEffect, useState } from "react"
import { SHORT_MOVIE_DURATION } from "../../utils/constants";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"

export default function SearchForm({ movies, setSearchedMovies, page }) {
  const [inputValue, setInputValue] = useState(localStorage.getItem(`${page}-keyWord`) || '');
  const [isShortMovies, setIsShortMovies] = useState(localStorage.getItem(`${page}-isShortMovies`) === 'true' || false);
  const [showError, setShowError] = useState(false)

  const handleChangeInput = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0) setShowError(false);
  }

  const handleClick = () => {
    search();
    if (!inputValue) setShowError(true);
  }

  const search = useCallback(() => {

    const findMovies = (movie) =>
      movie.nameRU.toLowerCase().includes(inputValue.toLowerCase())

    const findMoviesAndShort = () =>
      movies && movies.filter(movie =>
        isShortMovies
          ? findMovies(movie) && movie.duration <= SHORT_MOVIE_DURATION
          : findMovies(movie)
      )

    const foundMovies = findMoviesAndShort();
    setSearchedMovies(foundMovies);

    localStorage.setItem(`${page}-keyWord`, inputValue);

  }, [movies, inputValue, isShortMovies, setSearchedMovies, page])

  useEffect(() => {
    search()
  }, [isShortMovies, movies])

  return (
    <div className="section search-form">
      <div className="search-form__input-bar input-bar">
        {showError && <p className="input-bar__error">Нужно ввести ключевое слово.</p>}
        <input
          value={inputValue}
          onChange={handleChangeInput}
          type="text"
          placeholder="Фильм"
          className="input-bar__input"
          required />

        <button
          className="input-bar__button"
          onClick={handleClick}>
          Поиск
        </button>

      </div>

      <FilterCheckbox
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        search={search}
        page={page}
      />
    </div>
  )
}
