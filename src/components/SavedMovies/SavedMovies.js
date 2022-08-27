import React, { useEffect, useState } from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader"

export default function SavedMovies({
  isLoading, movies, showError
}) {

  const pageTitle = "savedMovies"
  const [foundMovies, setFoundMovies] = useState([]);

  useEffect(() => {
    setFoundMovies(JSON.parse(localStorage.getItem(`${pageTitle}-searchResult`)) || {})
  }, [])

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">
        <SearchForm
          movies={movies}
          setFoundMovies={setFoundMovies}
          page={pageTitle}
        />

        {isLoading
          ? <Preloader />
          : <MoviesCardList
            foundMovies={foundMovies}
            isSavedMovies={true}
            setFoundMovies={setFoundMovies}
            showError={showError}
          />
        }
      </main>
      <Footer />
    </>
  )
}
