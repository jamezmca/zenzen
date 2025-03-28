import React from 'react'

export default function Slider(props) {
  const { isChecked, habit, currDateString, handleModForm } = props

  return (
    <div onClick={() => { handleModForm(currDateString, habit) }} className='slider-container'>
      <div className={'slider ' + (!isChecked ? ' right-aligned' : ' left-aligned')}>
        <div className='bubble'></div>
      </div>
    </div>
  )
}
