import React from 'react'
import ProgressBar from './ProgressBar'
import Countdown from './Countdown'
import { countStreakUpToYesterday, getCompletedData, getHabitCompletion } from '../utils'

export default function Stats(props) {
  const { name, day, handleChangePage, data, habits, currDateString } = props

  const remainder = getHabitCompletion(habits, data?.[currDateString] || {})

  const completedLength = data?.[currDateString] ? Object.keys(getCompletedData(data?.[currDateString])).length : 0

  return (
    <>
      <div className='stats-card'>
        <div className='stats-columns'>
          <div className='welcome-text card double-col'>
            <div className='edit-name'>
              <p>Welcome</p>
              <button onClick={() => handleChangePage(0)} className='card-button-secondary'>
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
            </div>
            <h4 className='text-medium'>
              {name}
            </h4>
          </div>
          <div className='card'>
            <p className=''>Streak 🔥</p>
            <p className='text-medium'>{countStreakUpToYesterday(data)}</p>
          </div>
          <div className='card'>
            <p className=''>Countdown</p>
            <Countdown />
          </div>
        </div>
        <ProgressBar text={`Daily progress - ${completedLength} / ${habits.length}`} remainder={remainder} />
        <button onClick={() => {
          handleChangePage(2)
        }} className='white-btn start-task'>
          <h3 className=''>Complete survey &rarr;</h3>
        </button>
      </div>

    </>
  )
}
