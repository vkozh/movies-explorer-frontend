import React from "react"
import Input from "../Input/Input"
import Form from "../Form/Form"

export default function Register({ signup }) {

  return (
    <Form
      title="Добро пожаловать!"
      textButton="Зарегистрироваться"
      question="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      onSubmit={signup}>

      {({ handleChange, values, errors }) =>
        <>
          <Input
            value={values.name || ""}
            name="name"
            onChange={handleChange}
            title="Имя"
            minLength="2"
            maxLength="30"
            error={errors.name}
            required
          />

          <Input
            value={values.email || ""}
            name="email"
            title="E-mail"
            onChange={handleChange}
            type="email"
            error={errors.email}
            required
          />

          <Input
            value={values.password || ""}
            name="password"
            title="Пароль"
            onChange={handleChange}
            type="password"
            error={errors.password}
            minLength="8"
            required />
        </>
      }

    </Form>
  )
}
