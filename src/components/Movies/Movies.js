import React, { useEffect, useState } from "react"
import Header from "../Header/Header"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import SearchForm from "../SearchForm/SearchForm"
import Footer from "../Footer/Footer";
import Preloader from "../../vendor/Preloader/Preloader"

export default function Movies({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true)
    }, 2000);
  }, [])

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <SearchForm />
      {isLoading
        ? <MoviesCardList />
        : <Preloader />
      }
      <Footer />
    </>
  )
}
