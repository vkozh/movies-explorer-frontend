import React, { useRef } from "react"
import Header from "../Header/Header";
import "./Main.css";
import {Promo} from "./Promo/Promo";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import {AboutProject} from "./AboutProject/AboutProject";
import Footer from "../Footer/Footer";

type MainProps = {
  isLoggedIn: boolean | undefined
}

export default function Main({ isLoggedIn }: MainProps) {
  const aboutProjectRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <Header
        isPromoMenu={true}
        isLoggedIn={isLoggedIn}
      />
      <main className="main">
        <Promo element={aboutProjectRef?.current} />
        <AboutProject ref={aboutProjectRef} />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}
