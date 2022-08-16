import React from "react"
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"
import "./SearchForm.css"

export default function SearchForm() {
  return (
    <div className="section search-form">
      <div className="search-form__input-bar input-bar">
        <input
          type="text"
          placeholder="Фильм"
          className="input-bar__input"
          required />
        <button className="input-bar__button">Поиск</button>
      </div>
      <FilterCheckbox />
    </div>
  )
}
