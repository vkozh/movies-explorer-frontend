import React from "react"
import { Link } from "react-router-dom";
import "./MenuAnauth.css"

export default function MenuUnauth() {
  return (
    <div className="menu-unauth">
      <Link to="/signup" className="menu__link">Регистрация</Link>
      <Link to="/signin" className="menu__filled-button">Войти</Link>
    </div>
  )
}

