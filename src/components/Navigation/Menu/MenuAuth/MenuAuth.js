import React from "react"
import useWindowWidth from "../../../../utils/hooks/useWindowWidth";
import Humburger from "../../../Navigation/Humburger/Humburger";
import AuthMenuItems from "../AuthMenuItems/AuthMenuItems";

export default function MenuAuth() {
  const screenWidth = useWindowWidth();

  return (
    screenWidth <= 768 ? <Humburger /> : <AuthMenuItems />
  )
}
