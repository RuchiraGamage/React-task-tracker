import {useState} from 'react'
import React from 'react'

const AddTask = ({addTask}) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {

        e.preventDefault()
        if(!text){
            alert('Please add a task')
            return
        }

        addTask({text,day,reminder});

        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text'
                 value={text}
                 placeholder='Add Task'
                 onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text'
                 placeholder='Add Day & Time'
                 value={day}
                 onChange={(e) => setDay(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'
                value={reminder}
                checked={reminder}
                onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            <input type='submit'
             value='Save Task' 
             className='btn btn-block' />
        </form>
    )
}

export default AddTask