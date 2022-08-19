import React, { useEffect, useState } from "react"
import "./FilterCheckbox.css"

export default function FilterCheckbox({ setIsShortMovies }) {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked(!checked)
    setIsShortMovies(!checked);
  }
  // useEffect(() => {
  //   console.log(checked)
  // }, [checked])
  return (
    <div className="checkbox-bar">
      <input
        defaultChecked={checked}
        onChange={handleChange}
        id="checkbox-short-movie"
        type="checkbox"
        className="checkbox-bar__input" />
      <span className="checkbox-bar__fake"></span>
      <label htmlFor="checkbox-short-movie" className="checkbox-bar__label">
        Короткометражки
      </label>
    </div>
  )
}
