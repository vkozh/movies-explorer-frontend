import React from "react"
import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  let navigate = useNavigate();
  const handleClick = () => navigate(-1, { replace: true });
  return (
    <div className="not-found">
      <div className="not-found__text">
        <h1 className="not-found__title">404</h1>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
      <button onClick={handleClick} className="not-found__button">Назад</button>
    </div>
  )
}
