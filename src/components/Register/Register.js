import React from "react"
import Input from "../Input/Input"
import Form from "../Form/Form"

export default function Register({ signup }) {

  return (
    <div className="section register">

      <Form
        title="Добро пожаловать!"
        textButton="Зарегистрироваться"
        question="Уже зарегистрированы?"
        link="/signin"
        linkText="Войти"
        onSubmit={signup}>

        {({ onChangeInput, inputsData }) =>
          <>
            <Input
              value={inputsData.name || ""}
              name="name"
              onChange={onChangeInput}
              title="Имя"
              minLength="2"
              maxLength="30"
            />

            <Input
              value={inputsData.email || ""}
              name="email"
              title="E-mail"
              onChange={onChangeInput}
              type="email" />

            <Input
              value={inputsData.password || ""}
              name="password"
              title="Пароль"
              onChange={onChangeInput}
              type="password" />
          </>
        }

      </Form>

    </div>
  )
}
