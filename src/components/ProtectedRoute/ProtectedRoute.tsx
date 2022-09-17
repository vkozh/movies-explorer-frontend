import React from 'react'
import { Navigate } from 'react-router'
import { IMessage, IMovie, IUser } from '../types/types'
// import WithAuthorized from '../WithAuthorized/WithAuthorized'

type ProtectedRouteProps<T> = {
  isLoggedIn: boolean | undefined
  component: React.ComponentType<T>
  movies?: IMovie[]
  setMovies?: React.Dispatch<React.SetStateAction<IMovie[]>>
  isLoading?: boolean
  setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>
  showMessage?: (message: IMessage | string) => void
  savedMovies?: IMovie[]
  setSavedMovies?: React.Dispatch<React.SetStateAction<IMovie[]>>
  loadData?: ()=>void
  logout?: (user: IUser) => void
  editProfile?: (user: IUser) => void
  signin?: (user: IUser) => void
  setCurrentUser?: (user: IUser) => void
  setMessage?: React.Dispatch<React.SetStateAction<string>>
  signup?: (user: IUser) => void
}

export default function ProtectedRoute<T extends Record<string, unknown>>({
  isLoggedIn,
  component: ComponentAuth,
  ...props
}: ProtectedRouteProps<T>): JSX.Element {

  if(isLoggedIn)
    return (
      <ComponentAuth {...props as T}/>
    )
  else
    return(
      <Navigate to='/' />
    )

}
