import React from "react"
import "./FilterCheckbox.css"

export default function FilterCheckbox() {
  return (
    <div className="checkbox-bar">
      <input id="checkbox-short-movie" type="checkbox" className="checkbox-bar__input" />
      <span className="checkbox-bar__fake"></span>
      <label htmlFor="checkbox-short-movie" className="checkbox-bar__label">Короткометражки</label>
    </div>
  )
}
