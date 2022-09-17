import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useFormValidation from "../../hooks/useFormValidation";
import Logo from "../Header/Logo/Logo";
import { Errors, IUser, Values } from "../types/types";
import "./Form.css"
import "./Form_profile.css"

export type childrenProps = {
  values: Values | undefined,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  errors: Errors | undefined,
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
}

type FormProps = {
  showLogo?: boolean
  showFooter?: boolean
  title: string
  textButton: string
  question?: string
  link?: string
  linkText?: string
  children: (params: childrenProps) => React.ReactNode
  onSubmit: (user: IUser) => void
  theme?: string
}

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
}: FormProps) {

  const { values, setValues, handleChange, handleBlur, errors, isValidForm, setIsValidForm } = useFormValidation();
  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values as IUser);
  }

  useEffect(() => {
    if (theme === 'profile')
      setValues({ name: currentUser?.name, email: currentUser?.email } as IUser)
  }, [])

  useEffect(() => {
    if (theme === 'profile') {
      if (values?.name === currentUser?.name && values?.email === currentUser?.email)
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
            errors,
            handleChange,
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
              to={link as string}>
              {linkText}
            </Link>

          </p>
        </div>
      }

    </div>
  )
}
