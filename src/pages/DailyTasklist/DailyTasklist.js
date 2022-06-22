import './DailyTasklist.css';
import { useState } from "react"
import { ContainerDaily } from '../../components/Tasklists/DailyTasklist/ContainerDaily';
import StrikerLayout from '../StrikerLayout/StrikerLayout';

function DailyTasklist() {
  //State for Task list
  const [tasks, setTasks] = useState([
    {
        id: 1,
        type: 0,
        text: "Bryan Orbital Meeting",
        priority: 2,
        effort: 90,
        striked: false
    },
    {
        id: 2,
        type: 1,
        text: "Temasek Hall engagement camp props",
        priority: 1,
        effort: 10,
        striked: false
    },
    {
        id: 3,
        type: 1,
        text: "CS2040S Tutorial 1",
        priority: 0,
        effort: 75,
        striked: true
    },
    {
      id: 4,
      type: 2,
      text: "LSM1301 Lab 2",
      priority: 1,
      effort: 40,
      striked: false
    }
  ]);

  // State for filters, first value is if filter is clicked, second is up or down
  const [filters, setFilters] = useState([
    [0, 1], [0, 1]
  ]);

  //Strike Task Event
  const strikeTask = (id) => {
    setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type, text: task.text, priority: task.priority, effort: task.effort, striked: !task.striked} : task))
  }

  //Delete Task Event
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Add Task Event
  const addTask = () => {
    const newTask = {id: tasks.length + 1, type: 0, text: "", priority: 0, effort: 0, striked: false};
    setTasks([...tasks, newTask]);
  }

  //Change Task Type Event
  const changeTaskType = (id, keypressed) => {
    console.log("Changing task type of task " + id + ", key pressed: " + keypressed);
    if (keypressed == 1) {
      setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type + 1 <= 2 ? task.type + 1 : 0, text: task.text, priority: task.priority, effort: task.effort, striked: task.striked} : task))
    } else if (keypressed == 0) {
      setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type - 1 >= 0 ? task.type - 1 : 2, text: task.text, priority: task.priority, effort: task.effort, striked: task.striked} : task))
    }
  }

  //Change Task Text Event
  const updateTaskTextState = (id) => {
    const targetText = document.getElementsByClassName(id + "text")[0];
    const updatedText = targetText.textContent;
    console.log("Updated Text:");
    console.log(updatedText);
    setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type, text: updatedText, priority: task.priority, effort: task.effort, striked: task.striked} : task))
  }

  //Change Task Priority Event
  const changeTaskPriority = (id, keypressed) => {
    if (keypressed == 1) {
      setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type, text: task.text, priority: task.priority + 1 <= 2 ? task.priority + 1 : 0, effort: task.effort, striked: task.striked} : task))
    } else if (keypressed == 0) {
      setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type, text: task.text, priority: task.priority - 1 >= 0 ? task.priority - 1 : 2, effort: task.effort, striked: task.striked} : task))
    }    
  }

  //Change Task Effort Event
  const updateTaskEffortState = (id) => {
    const targetEffort = document.getElementsByClassName(id + "effort")[0];
    const updatedEffort = parseInt(targetEffort.textContent);
    console.log("Updated Effort:");
    console.log(updatedEffort);
    setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type, text: task.text, priority: task.priority, effort: updatedEffort, striked: task.striked} : task))
  }

  //Filter Priority Event
  const filterPriority = () => {
    let newTasks = [...tasks];
    newTasks.sort((a, b) => {
      if (a.priority < b.priority) {
        return 1 * filters[0][1];
      }
      if (a.priority > b.priority) {
        return -1 * filters[0][1];
      }
      return 0;
    })
    setTasks(newTasks);
    setFilters([[1, filters[0][1] * -1], [0, 1]]);
  }

  //Filter Effort Event
  const filterEffort = () => {
    let newTasks = [...tasks];
    newTasks.sort((a, b) => {
      if (a.effort < b.effort) {
        return -1 * filters[1][1];
      }
      if (a.effort > b.effort) {
        return 1 * filters[1][1];
      }
      return 0;
    })
    setTasks(newTasks);
    setFilters([[0, 1], [1, filters[1][1] * -1]]);
  }
  
  return (
    <StrikerLayout>
      <ContainerDaily tasks={tasks} strikeTask={strikeTask} deleteTask={deleteTask} addTask={addTask}
      filterPriority={filterPriority} filterEffort={filterEffort} filters={filters}
      updateTaskText={updateTaskTextState} updateTaskEffort={updateTaskEffortState} changeTaskType={changeTaskType} changeTaskPriority={changeTaskPriority}/>
    </StrikerLayout>
  );
}

export default DailyTasklist;
