import React, { useContext, useState } from "react"
import "./Profile.css"
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function Profile({ logout, editProfile, setCurrentUser }) {
  const currentUser = useContext(CurrentUserContext)
  const [isEdit, setIsEdit] = useState(false);

  const handleEditProfile = () => setIsEdit(true)

  const handleSaveProfile = (newUserData) => {
    setIsEdit(false)
    editProfile({ ...currentUser, ...newUserData });
    setCurrentUser({ ...currentUser, ...newUserData })
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
              title={`Привет, ${currentUser.name}!`}
              textButton={isEdit ? "Сохранить" : "Редактировать"}
              onSubmit={isEdit ? handleSaveProfile : handleEditProfile}
              theme="profile"
            >
              {({ handleChange, values, errors }) =>
                <>
                  <Input
                    value={isEdit ? values.name || currentUser.name : currentUser.name}
                    name="name"
                    title="Имя"
                    onChange={handleChange}
                    minLength="2"
                    maxLength="30"
                    disabled={!isEdit}
                    error={errors.name}
                  />

                  <Input
                    value={isEdit ? values.email || currentUser.email : currentUser.email}
                    name="email"
                    title="E-mail"
                    type="email"
                    disabled={!isEdit}
                    onChange={handleChange}
                    error={errors.email}
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
