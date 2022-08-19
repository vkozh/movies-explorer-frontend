import React, { useEffect, useState } from "react"
import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader"
import { beatfilmMoviesApi, moviesApi } from "../../utils/MoviesApi";
import { checkIsSaved, formatMovies, formatSavedMovies } from "../../utils/utils";

export default function Movies() {

  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [foundMovies, setFoundMovies] = useState([]);

  useEffect(() => {
    beatfilmMoviesApi
      .getMovies(setIsLoading)
      .then(data => {
        const movie = formatMovies(data)
        setMovies(movie)
        setFoundMovies(movie);
      })
      .catch(error => console.log(error));

    moviesApi
      .getMovies(setIsLoading)
      .then(data => {
        let formattedMovies = formatSavedMovies(data)
        setSavedMovies(formattedMovies)
      })
      .catch(error => console.log(error));
  }, [])

  useEffect(() => {
    let saved = checkIsSaved(movies, savedMovies)
    setFoundMovies(saved)
    // console.log(saved)
  }, [savedMovies, movies])

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
            isSavedMovies={false}
          />
        }
      </main>
      <Footer />
    </>
  )
}
