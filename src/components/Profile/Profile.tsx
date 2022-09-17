import React, { useContext, useState } from "react"
import "./Profile.css"
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import Form, { childrenProps } from "../Form/Form";
import Input from "../Input/Input";
import { EMAIL_REGEXP } from "../../utils/constants";
import { IUser } from "../types/types";

type ProfileProps = {
  logout: () => void,
  editProfile: (user: IUser) => void
}

export default function Profile({ logout, editProfile }: ProfileProps) {
  const currentUser = useContext<IUser | undefined>(CurrentUserContext)
  const [isEdit, setIsEdit] = useState(false);

  const handleEditProfile = () => setIsEdit(true);

  const handleSaveProfile = (newUserData: IUser) => {
    setIsEdit(false);
    editProfile({ ...currentUser, ...newUserData })
  }

  return (
    <>
      <Header isLoggedIn={true} />

      <main className="main">
        <div className="section profile">
          <div className="profile__main">

            <Form
              showLogo={false}
              showFooter={false}
              title={`Привет, ${currentUser?.name}!`}
              textButton={isEdit ? "Сохранить" : "Редактировать"}
              onSubmit={isEdit ? handleSaveProfile : handleEditProfile}
              theme="profile"
            >
              {({ handleChange, handleBlur, values, errors }: childrenProps) =>
                <>
                  <Input
                    value={isEdit ? values?.name || currentUser?.name || '' : currentUser?.name || ''}
                    name="name"
                    title="Имя"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    minLength={2}
                    maxLength={30}
                    disabled={!isEdit}
                    error={errors?.name || ''}
                  />

                  <Input
                    value={isEdit ? values?.email || currentUser?.email || '': currentUser?.email || ''}
                    name="email"
                    title="E-mail"
                    disabled={!isEdit}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={errors?.email || ''}
                    pattern={EMAIL_REGEXP}
                  />

                </>
              }

            </Form>

          </div>

          <div className="profile__footer">
            <button
              className="profile__footer-button"
              onClick={logout} >
              Выйти из аккаунта
            </button>
          </div>

        </div>
      </main>
    </>
  )
}
