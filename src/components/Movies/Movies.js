import React, { useEffect, useState } from "react"
import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader"
import { filterMovies } from "../../utils/utils";

export default function Movies({
  movies, isLoading, showError, savedMovies, setSavedMovies, setMovies, loadData
}) {

  const pageTitle = "movies";

  const [searchedMovies, setSearchedMovies] = useState(filterMovies(pageTitle, movies))

  useEffect(() => {
    localStorage.setItem(
      `${pageTitle}-searchResult`,
      JSON.stringify(searchedMovies.map(m => m.movieId))
    )
  }, [searchedMovies])

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">

        <SearchForm
          movies={movies}
          setSearchedMovies={setSearchedMovies}
          page={pageTitle}
          loadData={loadData}
        />

        {isLoading
          ? <Preloader />
          : <MoviesCardList
            movies={movies}
            setMovies={setMovies}
            setSearchedMovies={setSearchedMovies}
            foundMovies={movies}
            searchedMovies={searchedMovies}
            isSavedMovies={false}
            showError={showError}
            setFoundMovies={setMovies}
            savedMovies={savedMovies}
            setSavedMovies={setSavedMovies}
            page={pageTitle}
          />
        }

      </main>
      <Footer />
    </>
  )
}
