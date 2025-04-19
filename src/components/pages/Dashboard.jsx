import React from 'react'
import Stats from '../Stats'
import Calendar from '../Calendar'
import Habits from '../Habits'
import DashedLine from '../DashedLine'

export default function Dashboard(props) {

    // stats (name, timer, streak & start_btn, levelbar * success_rate )
    // calendar showing vertical percentage bars for each day depending on how many items met
    // habits config (configure the tracked habits, save object for each day)

    // history portal - click on a calendar day to see what you did and did not, also show days where streak ended
    const { handleChangePage, currTodo } = props
    return (
        <section id='dashboard'>
            <Stats {...props} />
            <DashedLine title={'To Do'} />
            <button onClick={() => { handleChangePage(3) }} className='textarea-button'>
                {/* onclick show todo */}
                {currTodo.split('\n').map((text, idx) => {
                    return (
                        <p key={idx}>{text}</p>
                    )
                })}
            </button>
            <DashedLine title={'Habits'} />
            {/* <Countdown {...props} /> */}
            <Habits {...props} />
            <DashedLine title={'Calendar'} />
            <Calendar {...props} />
        </section>
    )
}
