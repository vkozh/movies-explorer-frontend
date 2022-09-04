import React, { useState } from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader"

export default function SavedMovies({
  isLoading, savedMovies, showError, setSavedMovies, movies, setMovies, loadData
}) {

  const pageTitle = "savedMovies"
  const [searchedMovies, setSearchedMovies] = useState(movies.filter(m => m.isSaved))

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">
        <SearchForm
          movies={savedMovies}
          setSearchedMovies={setSearchedMovies}
          page={pageTitle}
          loadData={loadData}
        />

        {isLoading
          ? <Preloader />
          : <MoviesCardList
            movies={movies}
            setMovies={setMovies}
            foundMovies={searchedMovies}
            searchedMovies={searchedMovies}
            setSearchedMovies={setSearchedMovies}
            isSavedMoviesPage={true}
            showError={showError}
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
