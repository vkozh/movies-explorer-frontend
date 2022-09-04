import React from 'react'
import './ErrorPopup.css'

export default function ErrorPopup({ message, setIsShowMessage, setMessage }) {

  const handleClose = () => {
    setIsShowMessage(false)
    setMessage('')
  }

  const handleCloseOnOverlay = (e) => {
    if (e.target.currentTarget === e.target.value)
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
