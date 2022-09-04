import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";
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

  const { values, setValues, handleChange, handleBlur, errors, isValidForm, setIsValidForm } = useFormValidation();
  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  }

  useEffect(() => {
    if (theme === 'profile')
      setValues({ name: currentUser.name, email: currentUser.email })
  }, [])

  useEffect(() => {
    if (theme === 'profile') {
      if (values.name === currentUser.name && values.email === currentUser.email)
        setIsValidForm(false);
    }
  }, [values])

  return (
    <div className={`form ${theme ? "form_" + theme : ""}`}>

      {showLogo &&
        <div className="form__logo" >
          <Logo />
        </div>
      }

      <p className="form__greetings">
        {title}
      </p>

      <form
        className="form__form"
        onSubmit={handleSubmit}>

        <div className="form__inputs-container">

          {children({
            values,
            handleChange,
            errors,
            handleBlur
          })}

        </div>

        <button
          className="form__filled-button"
          type="submit"
          disabled={theme && textButton === 'Редактировать' ? false : !isValidForm}
        >
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
