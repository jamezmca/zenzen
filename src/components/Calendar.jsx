import React, { useState } from 'react'
import MiniProgressBar from './MiniProgressBar'
import { getCompletedData, getCurrentDateString } from '../utils'
import Portal from './Portal'
import History from './History'

const months = { 'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr', 'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug', 'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec' }
const monthsArr = Object.keys(months)
const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


export default function Calendar(props) {
    const { data } = props
    const now = new Date()
    const currMonth = now.getMonth()
    const [selectedMonth, setSelectMonth] = useState(Object.keys(months)[currMonth])
    const [selectedYear, setSelectedYear] = useState(now.getFullYear())
    const [selectedDate, setSelectedDate] = useState(null)
    const toggleModal = (d) => { setSelectedDate(curr => curr ? null : d) }

    const numericMonth = monthsArr.indexOf(selectedMonth)

    function handleIncrementMonth(val) {
        // value +1 -1
        // if we hit the bounds of the months, then we can just adjust the year that is displayed instead
        if (numericMonth + val < 0) {
            // set month value = 11 and decrement the year
            setSelectedYear(curr => curr - 1)
            setSelectMonth(monthsArr[monthsArr.length - 1])
        } else if (numericMonth + val > 11) {
            // set month val = 0 and increment the year
            setSelectedYear(curr => curr + 1)
            setSelectMonth(monthsArr[0])
        } else {
            setSelectMonth(monthsArr[numericMonth + val])
        }
    }

    const monthNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), 1)

    const firstDayOfMonth = monthNow.getDay()
    const daysInMonth = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth) + 1, 0).getDate()

    const daysToDisplay = firstDayOfMonth + daysInMonth

    const numRows = (Math.floor(daysToDisplay / 7)) + (daysToDisplay % 7 ? 1 : 0)

    const isCurrMonth = monthNow.toString().includes(monthsArr[currMonth].slice(0, 3))

    return (
        <div id='calendar' className=''>
            {/* the portal is rendered here, because the logic for its conditional rendering is relevant to this calendar (ie they click a day in the calendar and then the portal shows the history for that day) */}
            {/* the state to manage whether or not the history portal is displayed, is either null when no day is selected, or it's equal to the day when a day is selected so that within the modal we may look up the history for that day */}
            {selectedDate && (
                <Portal handleCloseModal={toggleModal}>
                    <History handleCloseModal={toggleModal} selectedDate={selectedDate} data={data} />
                </Portal>
            )}
            <div className=''>
                <button onClick={() => {
                    handleIncrementMonth(-1)
                }} className='card-button-secondary'><i className="fa-solid fa-chevron-left"></i></button>
                <p className={''}>{selectedMonth}, {selectedYear}</p>
                <button onClick={() => {
                    handleIncrementMonth(+1)
                }} className='card-button-secondary'><i className="fa-solid fa-chevron-right"></i></button>
            </div>
            <div className='calendar-container '>
                {[...Array(numRows).keys()].map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className='week-container'>
                            {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                                let dayIndex = (rowIndex * 7) + dayOfWeekIndex - (firstDayOfMonth - 1)

                                let dayDisplay = dayIndex > daysInMonth ? false : (row === 0 && dayOfWeekIndex < firstDayOfMonth) ? false : true

                                let isToday = dayIndex === now.getDate() && isCurrMonth

                                if (!dayDisplay) {
                                    return (
                                        <div className='invis' key={dayOfWeekIndex} />
                                    )
                                }


                                const dayNow = new Date(selectedYear, Object.keys(months).indexOf(selectedMonth), dayIndex)

                                const formattedString = getCurrentDateString(dayNow)
                                const daysData = data?.[formattedString] || {}

                                let p = Object.keys(getCompletedData(daysData)).length * 100 / Object.keys(daysData).length

                                return (
                                    <div onClick={() => {
                                        if (!daysData) { return }
                                        setSelectedDate(formattedString)
                                    }} className={'regular ' + (isToday ? ' isToday' : ' ') + (data?.[formattedString] ? ' pointer' : ' ')} key={dayOfWeekIndex}>
                                        <p>{dayIndex}</p>
                                        {formattedString in data && (
                                            <MiniProgressBar percentage={p} />

                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}