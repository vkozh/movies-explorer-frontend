import React from "react"
import "./Portfolio.css"

export default function Portfolio() {
  return (
    <div className="section portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a className="portfolio__item-link" href="https://vkozh.github.io/how-to-learn/" target="_blank" rel="noreferrer">
            <span className="portfolio__item_text">Статичный сайт</span> <span className="portfolio__icon-arrow">↗</span>
          </a></li>
        <li className="portfolio__item">
          <a className="portfolio__item-link" href="https://vkozh.github.io/russian-travel/" target="_blank" rel="noreferrer">
            <span className="portfolio__item_text">Адаптивный сайт</span> <span className="portfolio__icon-arrow">↗</span>
          </a></li>
        <li className="portfolio__item">
          <a className="portfolio__item-link" href="https://lekozhe-mesto.nomoredomains.xyz/" target="_blank" rel="noreferrer">
            <span className="portfolio__item_text">Одностраничное приложение</span> <span className="portfolio__icon-arrow">↗</span>
          </a></li>
      </ul>
    </div>
  )
}
