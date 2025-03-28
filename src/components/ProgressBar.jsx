import React from 'react'

export default function ProgressBar(props) {
    const { text, remainder } = props
    return (
        <div className='level'>
            <div>
                <h4 className=''>{text}</h4>
            </div>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((e, i) => {
                return (
                    <div className='level-bar' key={i} />
                )
            })}
            <div className='xp' style={{ width: `${remainder}%` }} />
        </div>
    )
}
