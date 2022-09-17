import React, { useState } from "react"
import "./Input.css"

type InputProps = {
  value: string
  name: string
  title: string
  type?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  error: string
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  disabled?: boolean
}

export default function Input(
  { value, name, title, type = "text", onChange, onBlur, error, ...inputProps }: InputProps
  ) {
  const inputId = `input-${name}`;

  const [isFocus, setIsFocuse] = useState(false)

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocuse(false);
    onBlur(e);
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
