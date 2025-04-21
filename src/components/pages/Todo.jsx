import React from 'react'

export default function Todo(props) {
    const { todos, currDateString, handleModTodos, handleSaveTodos, handleFindPrevTodos, isPrevTodos } = props

    return (
        <section id='todos'>
            <h3 className='special-shadow text-medium '>What&apos;s on for today?</h3>
            <div className='todo-btns'>
                <button disabled={!isPrevTodos()} className='' onClick={handleFindPrevTodos}> Import last <i className="fa-solid fa-upload"></i></button>
                <button className='' onClick={handleSaveTodos}> Save & Exit <i className="fa-solid fa-floppy-disk"></i></button>
            </div>
            <textarea placeholder='E.g. today go to gym, get fruit and finish tasks...' value={todos[currDateString] || ''} onChange={e => handleModTodos(e.target.value)}></textarea>

        </section>
    )
}
