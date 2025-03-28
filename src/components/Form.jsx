import React from 'react'
import Slider from './Slider'

function HabitCheckbox(props) {
    const { habit, index, data } = props
    return (
        <div className={'habit-container ' + (index % 2 == 0 ? ' bg-muted' : ' ')}>
            <div>
                <p style={{ opacity: 0.2 }} className=''>{(index + 1) / 9 > 1 ? index + 1 : `0${index + 1}`}</p>
                <p className=''>{habit}</p>
            </div>
            <Slider {...props} />
        </div>
    )
}

export default function Form(props) {
    const { habits, data, currDateString } = props

    return (
        <div className='form-container'>
            {habits.map((habit, habitIndex) => {
                return (
                    <HabitCheckbox key={habitIndex} habit={habit} index={habitIndex} isChecked={data?.[currDateString]?.[habit]} {...props} />
                )
            })}
        </div>
    )
}
