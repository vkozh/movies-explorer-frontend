import React, { useState } from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader"

export default function SavedMovies({
  isLoading, movies, showError
}) {

  const pageTitle = "savedMovies"
  const [foundMovies, setFoundMovies] = useState(
    JSON.parse(localStorage.getItem(`movies-searchResult`)).filter(m => m.isSaved)
    || movies
  );

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">
        <SearchForm
          movies={foundMovies}
          setFoundMovies={setFoundMovies}
          page={pageTitle}
        />

        {isLoading
          ? <Preloader />
          : <MoviesCardList
            foundMovies={foundMovies}
            isSavedMoviesPage={true}
            setFoundMovies={setFoundMovies}
            showError={showError}
            page={pageTitle}
          />
        }
      </main>
      <Footer />
    </>
  )
}
