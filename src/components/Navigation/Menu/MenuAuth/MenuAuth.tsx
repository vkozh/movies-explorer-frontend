import React from "react"
import useWindowWidth from "../../../../hooks/useWindowWidth";
import Humburger from "../../Humburger/Humburger";
import AuthMenuItems from "./AuthMenuItems/AuthMenuItems";

export default function MenuAuth() {
  const screenWidth = useWindowWidth();

  return (
    screenWidth <= 768 ? <Humburger /> : <AuthMenuItems />
  )
}
