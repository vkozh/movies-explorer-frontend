import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader";
import { filterMovies } from "../../utils/utils";
import { IMovie, IshowError } from "../types/types";

type MoviesProps = {
  movies: IMovie[];
  isLoading: boolean;
  showError: IshowError;
  savedMovies: IMovie[];
  loadData: () => void;
  // setSavedMovies: React.Dispatch<React.SetStateAction<IMovie[]>>,
  // setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>,
};

export default function Movies({
  movies,
  isLoading,
  showError,
  savedMovies,
  loadData,
}: //  setSavedMovies, setMovies,
MoviesProps) {
  const pageTitle = "movies";

  const [searchedMovies, setSearchedMovies] = useState(
    filterMovies(pageTitle, movies)
  );

  useEffect(() => {
    localStorage.setItem(
      `${pageTitle}-searchResult`,
      JSON.stringify(searchedMovies.map((m) => m.movieId))
    );
  }, [searchedMovies]);

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

        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            setSearchedMovies={setSearchedMovies}
            searchedMovies={searchedMovies}
            showError={showError}
            savedMovies={savedMovies}
            // setMovies={setMovies}
            // setSavedMovies={setSavedMovies}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
