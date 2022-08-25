import React from 'react'
import { Navigate } from 'react-router'
import WithAuthorized from '../WithAuthorized/WithAuthorized'

export default function ProtectedRoute({
  isLoadUserData,
  isLoggedIn,
  component: Component,
  ...props }) {

  let ComponentWithAuth = WithAuthorized(isLoggedIn, Component, Navigate)

  return (
    <ComponentWithAuth to="/" {...props} />
  )
}
