import React from "react"
import "./Remove.css"

type RemoveProps = {
  handleClick: (isLike: boolean) => void
}

export default function Remove({ handleClick }: RemoveProps) {
  const handleRemove = () => {
    handleClick(false)
  }
  return (
    <svg
      onClick={handleRemove}
      className="remove"
      xmlns="http://www.w3.org/2000/svg">
      <rect rx="12" />
      <path fillRule="evenodd" clipRule="evenodd" d="m12 13.06 2.652 2.652 1.06-1.06L13.061
        12l2.651-2.652-1.06-1.06L12 10.939 9.348 8.287l-1.06 1.061L10.939 12l-2.652 2.652 1.061
        1.06L12 13.06Z"/>
    </svg>
  )
}
