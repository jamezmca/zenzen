import React from 'react'

export default function MiniProgressBar(props) {
    const { percentage } = props
    return (
        <div className='vert-progress-bar'>
            <div style={{ height: `${percentage}%` }}></div>
        </div>
    )
}
