import React from "react"
import "./AboutMe.css"
import photo from "../../../images/me.jpg"

export default function AboutMe() {
  return (
    <section className="section about-me">
      <h2 className="section__title">Студент</h2>

      <div className="about-me__container">
        <div className="about-me__info">
          <div className="about-me__info-inner">
            <h4 className="about-me__title">Лера</h4>
            <p className="about-me__subtitle">Веб-разработчик, Москва</p>

            <p className="about-me__description">Я родилась в&nbsp;Липецке, закончила университет в&nbsp;наукограде Дубна
              по&nbsp;специальности Системный анализ и&nbsp;управление. Работала в&nbsp;научном институте администратором сайтов,
              после курса по&nbsp;веб-разработке перешла в&nbsp;Лабораторию Касперского. А&nbsp;недавно прошла собеседование в&nbsp;Яндекс.
              Люблю хорошее кино и&nbsp;книги.
            </p>

          </div>
          <a className="about-me__social-link" href="https://github.com/vkozh" target="_blank"
            rel="noreferrer">Github ↗</a>
        </div>

        <img className="about-me__photo" src={photo} alt="Фотография автора" />
      </div>
    </section>
  )
}
