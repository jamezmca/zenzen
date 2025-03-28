import React from 'react'
import Tracker from './Tracker'
import Habits from './Habits'

// japanese themed tab system between tracker (sliders for each habit), habits (add modify up to 8 habits), history (month by month view for each habit - view up to 3 habits at a time or show a general percentage for each day)

// tracker & habits are tabs, and history is an adjacent that brings up a modal btn

export default function UI() {

    const selectedTab = 0
    const tabs = {
        0: <Tracker />,
        1: <Habits />
    }

    return (
        <div className='tabs-container'>
            {tabs[selectedTab]}
        </div>
    )
}
