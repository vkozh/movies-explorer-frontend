import { useEffect, useState } from "react";
import useWindowWidth from "../../../../utils/hooks/useWindowWidth";
import Humburger from "../../../Navigation/Humburger/Humburger";

export default function WithAuthorized(isLoggedIn, { MenuAuth, MenuUnauth }) {

  const WrappedComponentWithAuth = (props) => {
    if (isLoggedIn) {
      return <MenuAuth />
    }

    return <MenuUnauth />
  }

  return WrappedComponentWithAuth;
}
