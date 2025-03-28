import React, { useEffect, useState } from 'react'
import { getTimeLeftToday } from '../utils'

export default function Countdown(props) {
    // Example Usage:
    const [timer, setTimer] = useState(getTimeLeftToday())

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(getTimeLeftToday())
        }, 1000)
        return () => clearInterval(interval) // Cleanup function
    }, [])

    return (
        <p className='text-medium countdown-timer '>{`${timer.hours}:${timer.minutes}:${timer.seconds}`}</p>
    )
}
