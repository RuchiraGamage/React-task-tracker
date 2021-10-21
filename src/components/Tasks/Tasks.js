import Task from "../Task/Task"

const Tasks = ({tasks, onDelete, onSetReminder}) => {
    return (
        // setTasks([...tasks], {})
        <>
          {tasks.map((task) => (
            <Task key={task.id} task={task} 
            onDelete= {onDelete} 
            onSetReminder={onSetReminder} />)
            )}  
        </>
    )
}

export default Tasks
