import React, { act, useState } from 'react'

export default function History(props) {
  const { selectedDate, data, handleCloseModal } = props
  const dataToShow = data?.[selectedDate]

  if (!dataToShow) {
    handleCloseModal()
  }

  const keys = Object.keys(dataToShow)

  return (
    <div className='history-container'>
      <div>
        <div>
          <h3 className='text-gradient '>History</h3>
          <p className='text-medium'>{selectedDate}</p>
        </div>
        <button onClick={handleCloseModal} className='link-button'>
          <i className='fa-solid fa-xmark' />
        </button>
      </div>
      <div>
        {keys.map((activity, index) => {
          return (
            <div key={index} className={' ' + (index % 2 == 0 ? ' bg-muted' : ' ')}>
              <p>{dataToShow[activity] ? '✅' : '❌'}</p>
              <p>{activity}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
