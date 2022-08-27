import { React, useState } from "react"
import "./Input.css"

export default function Input({ value, name, title, type = "text", onChange, error, ...inputProps }) {
  const inputId = `input-${name}`;

  const [isFocus, setIsFocuse] = useState(false)

  const handleBlur = (e) => {
    onChange(e);
    setIsFocuse(false);
  }
  const handleFocus = () => setIsFocuse(true)

  return (
    <div className={`formInput ${isFocus ? 'formInput_focused' : ''}`}>
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
        onChange={onChange}
        onFocus={handleFocus}
        {...inputProps}
      />

      <p className="formInput__error">
        {error}
      </p>
    </div>
  )
}
