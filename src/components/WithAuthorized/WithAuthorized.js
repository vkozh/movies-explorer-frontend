

export default function WithAuthorized(isLoggedIn, ComponentAuth, ComponentUnauth) {

  const WrappedComponentWithAuth = (props) => {

    if (isLoggedIn) {
      return <ComponentAuth {...props} />
    }

    return <ComponentUnauth {...props} />
  }

  return WrappedComponentWithAuth;
}
