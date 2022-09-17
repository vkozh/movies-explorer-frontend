import React from "react"
import { Link, NavLink } from "react-router-dom";
import iconProfile from "../../../../../images/account_man.svg"
import "./AuthMenuItems.css"

type isActiveClassNameParams = {
  isActive: boolean
}

export default function AuthMenuItems({ isHumburger = false }) {
  const isActiveClassName = ({ isActive }: isActiveClassNameParams) =>
    (`menu__link ${isActive ? "menu__link_active" : ""}`)

  return (
    <div className="menu">
      <div className="menu__links">

        {isHumburger &&
          <NavLink
            to="/"
            className={isActiveClassName}>
            Главная
          </NavLink>
        }

        <NavLink
          to="/movies"
          className={isActiveClassName}>
          Фильмы
        </NavLink>

        <NavLink
          to="/saved-movies"
          className={isActiveClassName}>
          Сохранённые фильмы
        </NavLink>
      </div>

      <Link
        to="/profile"
        className="menu__curcled-button">

        <img
          alt="Иконка профиля"
          src={iconProfile}
          className="menu__icon-profile"
        />
        Аккаунт
      </Link>

    </div >
  )
}
