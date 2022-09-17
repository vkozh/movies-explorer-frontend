import React from "react"
import Input from "../Input/Input"
import Form, { childrenProps } from "../Form/Form"
import { EMAIL_REGEXP } from "../../utils/constants"
import { IUser } from "../types/types"

type RegisterProps = {
  signup: (user: IUser) => void
}

export default function Register({ signup }: RegisterProps) {

  return (
    <Form
      title="Добро пожаловать!"
      textButton="Зарегистрироваться"
      question="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти"
      onSubmit={signup}>

      {({ handleChange, handleBlur, values, errors }: childrenProps) =>
        <>
          <Input
            value={values?.name || ""}
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            title="Имя"
            minLength={2}
            maxLength={30}
            error={errors?.name || ''}
            required
          />

          <Input
            value={values?.email || ""}
            name="email"
            title="E-mail"
            onChange={handleChange}
            onBlur={handleBlur}
            pattern={EMAIL_REGEXP}
            error={errors?.email || ''}
            required
          />

          <Input
            value={values?.password || ""}
            name="password"
            title="Пароль"
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            error={errors?.password || ''}
            minLength={8}
            required />
        </>
      }

    </Form>
  )
}
