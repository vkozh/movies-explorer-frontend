import React from "react"
import { Link } from "react-router-dom";
import logo from "../../../images/logo.svg";
import "./Logo.css"

export default function Logo() {
  return (
    <Link to="/" className="logo"><img alt="Логотип" src={logo} /></Link>
  )
}
