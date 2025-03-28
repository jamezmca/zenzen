import React from 'react'

function FiveLines() {
    return (
        <>
            {[...Array(5).keys()].map(val => {
                return (
                    <div key={val} className=''></div>
                )
            })}
        </>
    )
}

export default function DashedLine(props) {
    const { title } = props
    return (
        <div className='dashed-line-container'>
            <FiveLines />
            <h6 className='special-shadow text-medium'>{title}</h6>
            <FiveLines />
        </div>
    )
}
