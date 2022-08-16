import React from "react"
import "./Techs.css"

export default function Techs() {
  return (
    <section className="section techs section_bg-color_gray">
      <h2 className="section__title">Технологии</h2>

      <h4 className="techs__title">7 технологий</h4>
      <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>

      <ul className="techs__items">
        <li className="techs__item">HTML</li>
        <li className="techs__item">CSS</li>
        <li className="techs__item">JS</li>
        <li className="techs__item">React</li>
        <li className="techs__item">Git</li>
        <li className="techs__item">Express.js</li>
        <li className="techs__item">mongoDB</li>
      </ul>
    </section>
  )
}
