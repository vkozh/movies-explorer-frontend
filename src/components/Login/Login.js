import React from "react"
import Input from "../Input/Input"
import Form from "../Form/Form"

export default function Login({ signin }) {

  return (
    <Form
      title="Рады видеть!"
      textButton="Войти"
      question="Ещё не зарегистрированы?"
      link="/signup"
      linkText="Регистрация"
      onSubmit={signin}
    >
      {({ handleChange, values, errors }) =>
        <>
          <Input
            value={values.email || ""}
            name="email"
            title="E-mail"
            type="email"
            onChange={handleChange}
            required
            error={errors.email}
          />

          <Input
            value={values.password || ""}
            name="password"
            title="Пароль"
            type="password"
            onChange={handleChange}
            required
            error={errors.password}
          />
        </>
      }
    </Form>
  )
}
