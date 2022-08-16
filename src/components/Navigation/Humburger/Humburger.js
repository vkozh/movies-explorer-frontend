import React, { useState } from "react"
import AuthMenuItems from "../Menu/AuthMenuItems/AuthMenuItems"
import "./Humburger.css"

export default function Humburger() {
  const [isOpenHumburger, setIsOpenHumburger] = useState(false)
  const handleHumburger = () => setIsOpenHumburger(!isOpenHumburger)
  const handleCloseMenu = (e) => e.target === e.currentTarget ? setIsOpenHumburger(false) : "";

  return (
    <div
      className={`humburger ${!isOpenHumburger ? "humburger_closed" : ""}`}
      onClick={handleCloseMenu}
    >

      <div className="humburger__container">
        <button
          className="humburger__button"
          onClick={handleHumburger}>
        </button>

        <div className="humburger__menu">
          <AuthMenuItems isHumburger={true} />
        </div>
      </div>
    </div>
  )
}
