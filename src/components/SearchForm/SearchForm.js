import React, { useCallback, useEffect, useState } from "react"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"

export default function SearchForm({ movies, setFoundMovies, page }) {
  const [inputValue, setInputValue] = useState(localStorage.getItem(`${page}-keyWord`) || '');
  const [isShortMovies, setIsShortMovies] = useState(localStorage.getItem(`${page}-isShortMovies`) === 'true' || false);

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

    localStorage.setItem(`${page}-keyWord`, inputValue);
    localStorage.setItem(`${page}-searchResult`, JSON.stringify(movies));
  }, [movies, inputValue, isShortMovies, setFoundMovies, page])

  useEffect(() => {
    handleSearch()
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
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        search={handleSearch}
        page={page}
      />
    </div>
  )
}
