import { React, useEffect, useState } from "react"
import "./Input.css"

export default function Input({ value, name, title, type = "text", onChange, ...inputProps }) {
  const inputId = `input-${name}`;

  const [errorMessage, setErrorMessage] = useState("");

  const handleBlur = (e) => setErrorMessage(e.target.validationMessage);
  const handleChange = (e) => {
    onChange({ [name]: e.target.value });
  }

  return (
    <div className="formInput">
      <label
        className="formInput__label"
        htmlFor={inputId}>
        {title}
      </label>

      <input
        id={inputId}
        className="formInput__input"
        type={type}
        onBlur={handleBlur}
        name={name}
        value={value}
        onChange={handleChange}
        {...inputProps}
      />

      <p className="formInput__error">
        {errorMessage}
      </p>
    </div>
  )
}
