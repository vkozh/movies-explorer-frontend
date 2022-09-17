import React from "react"
import "./AboutProject.css";

export const AboutProject = React.forwardRef<HTMLElement>((props, ref) => {

    return (
    <section id="about" className="section" ref={ref}>
      <h2 className="section__title">О проекте</h2>
      <div className="section__columns">
        <div className="section__column">
          <h3 className="section__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="section__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="section__column">
          <h3 className="section__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="section__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__timeline">
        <p className="about-project__timeline-time about-project__timeline-time_bg-color_green">1 неделя</p>
        <p className="about-project__timeline-time about-project__timeline-time_bg-color_gray">4 недели</p>
        <p className="about-project__timeline-caption">Back-end</p>
        <p className="about-project__timeline-caption">Front-end</p>
      </div>
    </section>
  )
})
