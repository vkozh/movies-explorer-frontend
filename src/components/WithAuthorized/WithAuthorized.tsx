import React from "react"

export default function WithAuthorized(
  ComponentAuth: React.ComponentType,
  ComponentUnauth: React.ComponentType,
  isLoggedIn: boolean | undefined
  ): React.ComponentType {

  const WrappedComponentWithAuth = () => {

    if (isLoggedIn) {
      return <ComponentAuth />
    }

    return <ComponentUnauth />
  }

  return WrappedComponentWithAuth;
}
