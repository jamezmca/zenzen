import React from 'react'
import ReactDom from 'react-dom'

export default function Portal(props) {
  const { children, handleCloseModal } = props
  return ReactDom.createPortal(
    <div className='portal-container'>
      <div onClick={handleCloseModal} className='portal-underlay' />
      <div className='portal-content'>
        {children}
      </div>
    </div>,
    document.getElementById('portal')
  )
}
