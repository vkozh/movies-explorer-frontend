import React, { useEffect, useState } from "react"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader"
import { moviesApi } from "../../utils/MoviesApi";

export default function SavedMovies() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);


  useEffect(() => {
    moviesApi
      .getMovies(setIsLoading)
      .then(data => {
        setMovies(data)
        setFoundMovies(data);
      })
      .catch();
  }, [])

  return (
    <>
      <Header isLoggedIn={true} />
      <main className="main">
        <SearchForm
          movies={movies}
          foundMovies={foundMovies}
          setFoundMovies={setFoundMovies}
        />

        {isLoading
          ? <Preloader />
          : <MoviesCardList
            movies={foundMovies}
            isSavedMovies={true}
          />
        }
      </main>
      <Footer />
    </>
  )
}
