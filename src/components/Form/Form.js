import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Logo from "../Header/Logo/Logo";
import "./Form.css"
import "./Form_profile.css"

export default function Form({
  showLogo = true,
  showFooter = true,
  title,
  textButton,
  question,
  link,
  linkText,
  children,
  onSubmit,
  theme = ""
}) {

  const [isValidForm, setIsValidForm] = useState(true);
  const [inputsData, setInputsData] = useState({});
  const onChangeInput = (inputData) =>
    setInputsData({ ...inputsData, ...inputData })

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputsData);
  }

  return (
    <div className={`form ${theme ? "form_" + theme : ""}`}>

      {showLogo &&
        <div className="form__logo" >
          <Logo />
        </div>}
      <p className="form__greetings">
        {title}
      </p>

      <form
        className="form__form"
        onSubmit={handleSubmit}>

        <div className="form__inputs-container">

          {children({
            inputsData,
            onChangeInput
          })}

        </div>

        <button
          className="form__filled-button"
          disabled={!isValidForm} >
          {textButton}
        </button>
      </form>

      {showFooter &&
        <div className="form__footer">
          <p
            className="form__footer-text" >
            {question}&nbsp;

            <Link
              className="form__footer-link"
              to={link}>
              {linkText}
            </Link>

          </p>
        </div>
      }

    </div>
  )
}
