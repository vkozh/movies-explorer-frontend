import React, { useCallback, useEffect, useState } from "react"
import { SHORT_MOVIE_DURATION } from "../../utils/constants";
import { IMovie, IsetMovies } from "../types/types";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"

type SearchFormProps = {
  movies: IMovie[]
  setSearchedMovies: IsetMovies
  page: string
  loadData: () => void
}

export default function SearchForm({ movies, setSearchedMovies, page, loadData }: SearchFormProps) {
  const [inputValue, setInputValue] = useState(localStorage.getItem(`${page}-keyWord`) || '');
  const [isShortMovies, setIsShortMovies] = useState(
    localStorage.getItem(`${page}-isShortMovies`) === 'true' || false);
  const [showError, setShowError] = useState(false)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length > 0) setShowError(false);
  }

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue)
      setShowError(true);
    else {
      loadData();
      search();
    }
  }

  const search = useCallback(() => {

    const findMovies = (movie: IMovie) =>
      movie.nameRU.toLowerCase().includes(inputValue.toLowerCase())

    const findMoviesAndShort = () =>
      movies && movies.filter(movie =>
        isShortMovies
          ? findMovies(movie) && movie.duration <= SHORT_MOVIE_DURATION
          : findMovies(movie)
      )

    const foundMovies = findMoviesAndShort();
    setSearchedMovies(foundMovies);

    if (page === 'movies')
      localStorage.setItem(`${page}-keyWord`, inputValue);

  }, [movies, inputValue, isShortMovies, setSearchedMovies, page])

  useEffect(() => {
    search()
  }, [isShortMovies, movies])

  return (
    <div className="section search-form">
      <form
        className="search-form__input-bar input-bar"
        onSubmit={handleSubmit}
      >
        {showError && <p className="input-bar__error">Нужно ввести ключевое слово.</p>}
        <input
          value={inputValue}
          onChange={handleChangeInput}
          type="text"
          placeholder="Фильм"
          className="input-bar__input"
        />

        <button
          className="input-bar__button"
          type="submit">
          Поиск
        </button>

      </form>

      <FilterCheckbox
        setIsShortMovies={setIsShortMovies}
        isShortMovies={isShortMovies}
        page={page}
      />
    </div>
  )
}
