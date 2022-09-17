import React, { Dispatch } from 'react'
import './ErrorPopup.css'

type ErrorPopupProps = {
  message: string
  setIsShowMessage: Dispatch<React.SetStateAction<boolean>>
  setMessage: Dispatch<React.SetStateAction<string>>
}

export default function ErrorPopup({ message, setIsShowMessage, setMessage }: ErrorPopupProps) {

  const handleClose = () => {
    setIsShowMessage(false)
    setMessage('')
  }

  const handleCloseOnOverlay = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.currentTarget === e.target) //?
      handleClose();
  }

  return (
    <div className='errorPopup' onClick={handleCloseOnOverlay}>
      <div className='errorPopup__container'>
        <button className='errorPopup__close' onClick={handleClose} />
        {message !== 'Сохранено' && <p className='errorPopup__title'>Ошибка</p>}
        <p className='errorPopup__message'>{message}</p>
      </div>
    </div>
  )
}
