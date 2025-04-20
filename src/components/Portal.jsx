import React from 'react'
import ReactDom from 'react-dom'

export default function Portal(props) {
  const { children, handleCloseModal } = props

  // in the index.html i created a sibling div to the root div with an id of portal
  // ReactDom package allows me to take some new jsx and render it within this newly created div, instead of being in the context of whatever compoentn the portal is rendered within
  // Reactdom.createPortal takes two arguments, one is the jsx, and the second is the div within which we want to render the jsx - so i look within the document for the elemtn with the id of portal
  return ReactDom.createPortal(
    <div className='portal-container'>
      {/* the container div is fixed position and takes up the screen width and height */}
      <div onClick={handleCloseModal} className='portal-underlay' />
      {/* the underlay div sits behind the modal content, and when clicked closes the modal */}
      <div className='portal-content'>
        {/* the poratl content div contains the children content, whcih is whatever is contained within the opening and closing portal tags where the portal is conditionally rendered (in this case its the calendar) */}
        {children}
        {/* the children is a property of the portal, hence we access from the props */}
      </div>
    </div>,
    document.getElementById('portal')
  )
}
