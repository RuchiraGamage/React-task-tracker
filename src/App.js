import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import AddTask from './components/AddTask/AddTask';
import Footer from './components/Footer/Footer';
import About from './components/About/About';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState( [])

  useEffect(() => {
    const getTasks = async () => { 
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    } 

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data;
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data;
  }

  const deleteTask =async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method:'DELETE'
    })

  setTasks(tasks.filter((task) => (task.id !== id)))
  }
    
  const toggleReminder =async (id) => {
    // setTasks(tasks.map((task) => task.id === id 
    // ? {...task, reminder:!task.reminder} : task))

    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id 
    ? {...task, reminder:data.reminder} : task))
  }

  const addTask = async (task) => {

    const id = Math.floor(Math.random()*10000)+1

    const newTask = {id, ...task}

    const res = await fetch(`http://localhost:5000/tasks`, {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(newTask)
    })

    const data  = await res.json()
    setTasks([...tasks, data])
  }
  const x = false

  const toggleShowAddTask = () => {
    setShowAddTask(!showAddTask)
  }

  return (
    <Router>
  <div className="container">
      <Header title='Task Tracker' buttonFunction={toggleShowAddTask} showAddTask={showAddTask}/>
      <Route path='/' exact render={(props)=>(
        <>
            {
        showAddTask && (<AddTask addTask={addTask}/>)
      }
      {
        tasks.length > 0 
        ? (<Tasks tasks={tasks} onDelete = {deleteTask} onSetReminder= {toggleReminder}/>)
        : ('No tasks aavailable')
      }
        </>
      )} />
      <Route path='/about' component = {About} />
      <Footer/>
    </div>
    </Router>
  );
}

export default App; 