import React from 'react'
import Form from '../Form'

export default function Challenge(props) {
    // form to input data for day - can save or complete (if forgets to complete then the saved data is used the following day)
    const { habits, handleChangePage } = props
    return (
        <section id='challenge'>
            <h3 className='special-shadow text-medium'>Today I have ...</h3>
            <Form {...props} />
            <button onClick={() => {
                handleChangePage(1)
            }}>
                &larr; Save & Exit
            </button>
        </section>
    )
}
