import React, { useEffect, useState } from "react"
import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader"

export default function Movies({
  movies, isLoading,
}) {

  const pageTitle = "movies"
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
          fromPage="movies"
        />

        {isLoading
          ? <Preloader />
          : <MoviesCardList
            foundMovies={foundMovies}
            isSavedMovies={false}
          />
        }

      </main>
      <Footer />
    </>
  )
}
