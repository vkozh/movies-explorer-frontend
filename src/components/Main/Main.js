import React, { useRef } from "react"
import Header from "../Header/Header";
import "./Main.css";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import AboutProject from "./AboutProject/AboutProject";
import Footer from "../Footer/Footer";

export default function Main({ isLoggedIn }) {
  const aboutProjectRef = useRef(null);

  return (
    <div className="main">
      <Header
        isPromoMenu={true}
        isLoggedIn={isLoggedIn}
      />
      <Promo ref={aboutProjectRef} />
      <AboutProject ref={aboutProjectRef} />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </div>
  )
}
