import React from "react";
import "./Header.css";
import Menu from "../Navigation/Menu/Menu";
import Logo from "./Logo/Logo";

export default function Header({ isPromoMenu = false, isLoggedIn }) {

  return (
    <header className={`header ${isPromoMenu ? "header_theme_promo" : ""}`}>
      <Logo />
      <Menu isLoggedIn={isLoggedIn} />
    </header>
  )
}
