import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader";
import { IMovie, IsetMovies, IshowError } from "../types/types";

type SavedMoviesProps = {
  isLoading: boolean;
  savedMovies: IMovie[];
  showError: IshowError;
  movies: IMovie[];
  loadData: () => void;
  // setMovies: IsetMovies
  // setSavedMovies: IsetMovies
};

export default function SavedMovies({
  isLoading,
  savedMovies,
  showError,
  movies,
  loadData,
}: //  setMovies,
// setSavedMovies,
SavedMoviesProps) {
  const pageTitle = "savedMovies";
  const [searchedMovies, setSearchedMovies] = useState(
    movies.filter((m) => m.isSaved)
  );

  useEffect(() => {
    !savedMovies.length && loadData();
  }, []);

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

        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies}
            searchedMovies={searchedMovies}
            setSearchedMovies={setSearchedMovies}
            isSavedMoviesPage={true}
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
