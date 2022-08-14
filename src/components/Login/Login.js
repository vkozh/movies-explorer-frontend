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
      {({ onChangeInput, inputsData }) =>
        <>
          <Input
            value={inputsData.email || ""}
            name="email"
            title="E-mail"
            type="email"
            onChange={onChangeInput}
          />

          <Input
            value={inputsData.password || ""}
            name="password"
            title="Пароль"
            type="password"
            onChange={onChangeInput}
          />
        </>
      }
    </Form>
  )
}
