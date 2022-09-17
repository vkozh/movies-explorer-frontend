import React from "react"
import WithAuthorized from "../../WithAuthorized/WithAuthorized";
import ComponentAuth from "./MenuAuth/MenuAuth";
import ComponentUnauth from "./MenuUnauth/MenuUnauth";

type MenuProps = {
  isLoggedIn: boolean | undefined
}

export default function Menu({ isLoggedIn }: MenuProps) {
  const MenuWithAuth = WithAuthorized(ComponentAuth, ComponentUnauth, isLoggedIn)

  return (
    <MenuWithAuth />
  )
}
