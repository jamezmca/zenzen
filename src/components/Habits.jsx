import React, { useState } from 'react'

export default function Habits(props) {
  const { habits, handleDeleteHabit, handleAddHabit } = props
  const [showInput, setShowInput] = useState(false)
  const [inputVal, setInputVal] = useState('')

  return (
    <section id='habits' className=''>
      {showInput && (
        <div className='habit-input'>
          <input value={inputVal} onChange={e => setInputVal(e.target.value)} placeholder='E.g. go to gym' />
          <button onClick={() => {
            handleAddHabit(inputVal)
            setShowInput(!showInput)
            setInputVal('')
          }} className='card-button'>
            Add
          </button>
        </div>
      )}
      {habits.map((habit, habitIndex) => {
        return (
          <button onClick={() => handleDeleteHabit(habitIndex)} key={habitIndex} className='card-button'>
            <div className='card '>
              <i className="fa-solid fa-trash"></i>
            </div>
            {habit}
          </button>
        )
      })}
      {!showInput && (
        <button onClick={() => setShowInput(!showInput)} className='add-habit card-button'>
          <p>
            Add habit
          </p>
          <i className='fa-solid fa-plus'></i>
        </button>
      )}
    </section>
  )
}
