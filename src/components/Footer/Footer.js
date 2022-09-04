import React from "react"
import "./Footer.css"

export default function Footer() {
  return (
    <footer className="section footer">
      <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>

      <div className="footer__menu">
        <ul className="footer__menu-items">
          <li className="footer__menu-item">
            <a href="https://practicum.yandex.ru/" className="footer__menu-link">Яндекс.Практикум</a></li>
          <li className="footer__menu-item">
            <a href="https://github.com/vkozh" className="footer__menu-link">Github</a></li>
        </ul>

        <p className="footer__rights">© 2022</p>
      </div>
    </footer>
  )
}
