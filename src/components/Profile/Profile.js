import React, { useContext, useState } from "react"
import "./Profile.css"
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"
import Form from "../Form/Form";
import Input from "../Input/Input";

export default function Profile({ logout, editProfile }) {
  const currentUser = useContext(CurrentUserContext)
  const [isEdit, setIsEdit] = useState(false);

  const handleLogout = () => logout();

  const handleEditProfile = () => {
    setIsEdit(true)
    editProfile(currentUser);
  }

  const handleSaveProfile = () => {
    setIsEdit(false)
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
              {({ onChangeInput, inputsData }) =>
                <>
                  <Input
                    value={isEdit ? inputsData.name : inputsData.name || currentUser.name}
                    name="name"
                    title="Имя"
                    onChange={onChangeInput}
                    minLength="2"
                    maxLength="30"
                    disabled={!isEdit}
                  />

                  <Input
                    value={isEdit ? inputsData.email : inputsData.email || currentUser.email}
                    name="email"
                    title="E-mail"
                    type="email"
                    disabled={!isEdit}
                    onChange={onChangeInput}
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
