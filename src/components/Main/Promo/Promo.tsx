import React from "react"
import "./Promo.css";
import planet_web from "../../../images/planet_web.svg"

type PromoProps = {
  element: HTMLElement | null
}

export const Promo = (({element}: PromoProps) => {

  const scrollToAboutProject = () => element?.scrollIntoView();

  return (
    <div className="promo">
      <img className="promo__main-img" alt="Планета веба" src={planet_web} />
      <div className="promo__info">

        <div className="promo__text">
          <h1 className="promo__title">Учебный проект студента факультета <span className="nobr">Веб-разработки</span>.</h1>
          <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
        </div>

        <button onClick={scrollToAboutProject} className="promo__bordered_button">Узнать больше</button>

      </div>
    </div>
  )
})
