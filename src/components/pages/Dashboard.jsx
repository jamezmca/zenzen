import React from 'react'
import Stats from '../Stats'
import Portal from '../Portal'
import History from '../History'
import UI from '../UI'
import Calendar from '../Calendar'
import Habits from '../Habits'
import Countdown from '../Countdown'
import DashedLine from '../DashedLine'

export default function Dashboard(props) {
    const showModal = false

    // stats (name, timer, streak & start_btn, levelbar * success_rate )
    // calendar showing vertical percentage bars for each day depending on how many items met
    // habits config (configure the tracked habits, save object for each day)

    // history portal - click on a calendar day to see what you did and did not, also show days where streak ended
    return (
        <section id='dashboard'>
            {showModal && (
                <Portal>
                    <History {...props} />
                </Portal>
            )}
            <Stats {...props} />
            <DashedLine title={'Habits'} />
            {/* <Countdown {...props} /> */}
            <Habits {...props} />
            <DashedLine title={'Calendar'} />
            <Calendar {...props} />
        </section>
    )
}
