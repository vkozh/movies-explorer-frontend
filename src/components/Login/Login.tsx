import React from "react"
import Input from "../Input/Input"
import Form, { childrenProps } from "../Form/Form"
import { IUser } from "../types/types"

type LoginProps = {
  signin: (user: IUser) => void
}

export default function Login({ signin }: LoginProps) {

  return (
    <Form
      title="Рады видеть!"
      textButton="Войти"
      question="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      onSubmit={signin}
    >
      {({ handleChange, handleBlur, values, errors }: childrenProps) =>
        <>
          <Input
            value={values?.email || ""}
            name="email"
            title="E-mail"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            required
            error={errors?.email || ""}
          />

          <Input
            value={values?.password || ""}
            name="password"
            title="Пароль"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            required
            error={errors?.password || ""}
          />
        </>
      }
    </Form>
  )
}
