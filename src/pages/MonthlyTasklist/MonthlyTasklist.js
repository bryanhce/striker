import './MonthlyTasklist.css';
import { useState, useEffect } from "react"
import { Container } from '../../components/Tasklists/MonthlyTasklist/ContainerMonthly';
import StrikerLayout from '../StrikerLayout/StrikerLayout';

function MonthlyTasklist() {
  //Example Tasklist from API:
  const apiTasklist = [
    {
        id: 1,
        type: 0,
        text: "Bryan Orbital Meeting",
        deadline: "23-05-2022",
        progress: 0,
        striked: false,
        parent: null,
        hasChildren: true
    },
    {
        id: 2,
        type: 1,
        text: "Temasek Hall engagement camp props",
        deadline: "27-05-2022",
        progress: 1,
        striked: false,
        parent: null,
        hasChildren: true
    },
    {
        id: 3,
        type: 1,
        text: "CS2040S Tutorial 1",
        deadline: "21-05-2022",
        progress: 0,
        striked: false,
        parent: null,
        hasChildren: true
    },
    {
      id: 4,
      type: 2,
      text: "LSM1301 Lab 2",
      deadline: "30-05-2022",
      progress: 2,
      striked: false,
      parent: null,
      hasChildren: false
    },
    {
      id: 5,
      type: 1,
      text: "CS2040S T1 Q5",
      deadline: "18-05-2022",
      progress: 1,
      striked: false,
      parent: 3,
      hasChildren: false
    },
    {
      id: 6,
      type: 1,
      text: "CS2040S T1 Q7",
      deadline: "19-05-2022",
      progress: 1,
      striked: false,
      parent: 3,
      hasChildren: false
    },
    {
      id: 7,
      type: 1,
      text: "Develop Front-End",
      deadline: "19-05-2022",
      progress: 1,
      striked: false,
      parent: 1,
      hasChildren: false
    },
    {
      id: 8,
      type: 1,
      text: "Finish Proposals",
      deadline: "19-05-2022",
      progress: 1,
      striked: false,
      parent: 2,
      hasChildren: false
    }
  ];

  //Sort Tasks and Subtasks
  function sortTasks(tasks) {
    const parentTasks = tasks.filter((task) => task.parent == null);

    const subtasks = tasks.filter((task) => task.parent !== null);

    let sortedTasks = [];
    for (let i = 0; i < parentTasks.length; i++) {
      sortedTasks.push(parentTasks[i]);
      for (let n = 0; n < subtasks.length; n++) {
        if (subtasks[n].parent == parentTasks[i].id) {
          sortedTasks.push(subtasks[n]);
        }
      }
    }
    
    return sortedTasks;
  }

  //State for Task list
  const [tasks, setTasks] = useState(sortTasks(apiTasklist));

  // State for filters, first value is if filter is clicked, second is up or down
  const [filters, setFilters] = useState([
    [0, 1], [0, 1]
  ]);
   
  //State for Subtasks Buttons
  const initialSubtasksBtnState = tasks.map((task) => false);
  const [subtasksBtnState, setSubtasksBtnState] = useState(initialSubtasksBtnState);
  
  //State for Shown Subtasks
  const initialShownSubtasksState = tasks.map((task) => false);
  const [shownSubtasksState, setShownSubtasksState] = useState(initialShownSubtasksState);


  //Strike Task Event
  const strikeTask = (id) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        if (tasks[i].striked) {
          setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type, text: task.text, deadline: task.deadline, progress: 1, striked: !task.striked, parent: task.parent, hasChildren: task.hasChildren} : task));
        } else {
          setTasks(sortTasks(tasks.map((task) => task.id == id || task.parent == id ? {id: task.id, type: task.type, text: task.text, deadline: task.deadline, progress: 2, striked: true, parent: task.parent, hasChildren: task.hasChildren} : task)));
        }
      }
    }
  }

  //Delete Task Event
  const deleteTask = (id) => {
    const newTasks = sortTasks(tasks);
    const newSubtasksBtnState = [...subtasksBtnState];
    const newShownSubtasksState = [...shownSubtasksState];

    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].id === id || newTasks[i].parent === id) {
        newTasks.splice(i, 1);
        newSubtasksBtnState.splice(i, 1);
        newShownSubtasksState.splice(i, 1);
        i -= 1;
      }
    }

    setTasks(newTasks);
    setSubtasksBtnState(newSubtasksBtnState);
    setShownSubtasksState(newShownSubtasksState);
  }

  //Add Task Event
  const addTask = () => {
    const newTask = {id: tasks.length + 1, type: 0, text: "", deadline: "", progress: 0, striked: false, parent: null, hasChildren: false};
    setTasks(sortTasks([...tasks, newTask]));
    setSubtasksBtnState([...subtasksBtnState, false]);
    setShownSubtasksState([...shownSubtasksState, false]);  
  }

  //Change Task Text Event
  const updateTaskTextState = (id) => {
    const targetText = document.getElementsByClassName(id + "text")[0];
    const updatedText = targetText.textContent;
    console.log("Updated Text:");
    console.log(updatedText);
    setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type, text: updatedText, deadline: task.deadline, progress: task.progress, striked: task.striked, parent: task.parent, hasChildren: task.hasChildren} : task))
  }

  //Change Task Type Event
  const changeTaskType = (id, keypressed) => {
    console.log("Changing task type of task " + id + ", key pressed: " + keypressed);
    if (keypressed == 1) {
      setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type + 1 <= 2 ? task.type + 1 : 0, text: task.text, deadline: task.deadline, progress: task.progress, striked: task.striked, parent: task.parent, hasChildren: task.hasChildren} : task))
    } else if (keypressed == 0) {
      setTasks(tasks.map((task) => task.id == id ? {id: task.id, type: task.type - 1 >= 0 ? task.type - 1 : 2, text: task.text, deadline: task.deadline, progress: task.progress, striked: task.striked, parent: task.parent, hasChildren: task.hasChildren} : task))
    }
  }

  //Change Task Progress Event
  const changeTaskProgress = (id, keypressed) => {
    let taskClicked;
    const targetTasks = [];
    let newProgress;
    let newStriked;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id == id) {
        taskClicked = tasks[i];
        targetTasks.push(taskClicked);
        if (keypressed == 0) {
          newProgress = tasks[i].progress - 1 >= 0 ? tasks[i].progress - 1 : 2;
        } else {
          newProgress = tasks[i].progress + 1 <= 2 ? tasks[i].progress + 1 : 0;
        }
      } else if (tasks[i].parent == id) {
        targetTasks.push(tasks[i]);
      }
    }
    if (newProgress == 2) {
      newStriked = true;
    } else {
      newStriked = false;
    }
    if (newStriked) {
      for (let n = 0; n < targetTasks.length; n++) {
        targetTasks[n].progress = newProgress;
        targetTasks[n].striked = newStriked;
      }
    } else {
      taskClicked.progress = newProgress;
      taskClicked.striked = newStriked
    }

    setTasks(sortTasks(tasks));
  }

  //Filter Deadline Event
  const filterDeadline = () => {
    let newTasks = [...tasks];
    newTasks.sort((a, b) => {
      if (a.deadline < b.deadline) {
        return 1 * filters[0][1];
      }
      if (a.deadline > b.deadline) {
        return -1 * filters[0][1];
      }
      return 0;
    })
    setTasks(sortTasks(newTasks));
    setFilters([[1, filters[0][1] * -1], [0, 1]]);
  }

  //Filter Progress Event
  const filterProgress = () => {
    let newTasks = [...tasks];
    newTasks.sort((a, b) => {
      if (a.progress < b.progress) {
        return 1 * filters[1][1];
      }
      if (a.progress > b.progress) {
        return -1 * filters[1][1];
      }
      return 0;
    })
    setTasks(sortTasks(newTasks));
    setFilters([[0, 1], [1, filters[1][1] * -1]]);
  }

  //Show Subtasks Event
  const showSubtasks = (id) => {
    const newShownSubtaskState = [...shownSubtasksState];
    let taskIndex = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].parent == id) {
            newShownSubtaskState[i] = !newShownSubtaskState[i];
        }
        if (tasks[i].id == id) {
            taskIndex = i;
        }
    }
    const newSubtaskBtnState = [...subtasksBtnState];
    newSubtaskBtnState[taskIndex] = !newSubtaskBtnState[taskIndex];
    setSubtasksBtnState(newSubtaskBtnState);
    setShownSubtasksState(newShownSubtaskState);
  }

  //Add Subtask Event
  const addSubtask = (parentId) => {
    const newTask = {id: tasks.length + 1, type: 0, text: "", deadline: "", progress: 0, striked: false, parent: parentId, hasChildren: false};
    const newTasks = tasks.map((task) => task.id == parentId ? {id: task.id, type: task.type, text: task.text, deadline: task.deadline, progress: task.progress, striked: task.striked, parent: task.parent, hasChildren: true} : task);
    setTasks(sortTasks([...newTasks, newTask]));

    const newSubtasksBtnState = [];
    const newShownSubtasksState = [];
    let counter = 0;

    for (let i = 0; i < tasks.length; i++) {
      newSubtasksBtnState.push(subtasksBtnState[counter]);
      newShownSubtasksState.push(shownSubtasksState[counter]);
      counter++;
      if (tasks[i].id == parentId) {
        newSubtasksBtnState.push(false);
        newShownSubtasksState.push(false);
      }
    }

    setSubtasksBtnState(newSubtasksBtnState);
    console.log("1");
    setShownSubtasksState(newShownSubtasksState);
    console.log("2");
  }
  
  return (
    <StrikerLayout>
      <div className="container">
        <Container tasks={tasks} setTasks={setTasks} strikeTask={strikeTask} deleteTask={deleteTask} addTask={addTask}
        filterPriority={filterDeadline} filterEffort={filterProgress} filters={filters}
        updateTaskText={updateTaskTextState} changeTaskType={changeTaskType} changeTaskProgress={changeTaskProgress}
        subtasksBtnState={subtasksBtnState} shownSubtasksState={shownSubtasksState} showSubtasks={showSubtasks} addSubtask={addSubtask}/>
      </div>
    </StrikerLayout>
  );
}

export default MonthlyTasklist;
