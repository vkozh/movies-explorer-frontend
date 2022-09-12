import React from "react"
import WithAuthorized from "../../WithAuthorized/WithAuthorized";
import MenuAuth from "./MenuAuth/MenuAuth";
import MenuUnauth from "./MenuUnauth/MenuUnauth";

export default function Menu({ isLoggedIn }) {
  const MenuWithAuth = WithAuthorized(isLoggedIn, MenuAuth, MenuUnauth)

  return (
    <MenuWithAuth />
  )
}
