import "./MonthlyTasklist.css";
import { useState, useEffect } from "react";
import { Container } from "../../components/Tasklists/MonthlyTasklist/ContainerMonthly";
import { v4 as uuidv4 } from "uuid";

function MonthlyTasklist() {
  //Get User Data:
  let user = JSON.parse(localStorage.getItem("currentUser"));
  console.log("User:");
  console.log(user);
  const userId = user.uid;
  //const userId = "dVxGQxT8uKepfQLJxqnhBRWx6Dz1";

  //Today's date:
  let today = new Date();
  const dateString =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");
  const monthString =
    today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0");
  console.log("Loading data for month: " + monthString);

  //State for Task list
  const [tasks, setTasks] = useState([]);

  //State for Subtasks Buttons
  const [subtasksBtnState, setSubtasksBtnState] = useState([]);

  //State for Shown Subtasks
  const [shownSubtasksState, setShownSubtasksState] = useState([]);

  //Sort Tasks and Subtasks
  function sortTasks(tasks) {
    // eslint-disable-next-line
    const parentTasks = tasks.filter((task) => task.parent == "");
    // eslint-disable-next-line
    const subtasks = tasks.filter((task) => task.parent !== "");

    let sortedTasks = [];
    for (let i = 0; i < parentTasks.length; i++) {
      sortedTasks.push(parentTasks[i]);
      for (let n = 0; n < subtasks.length; n++) {
        // eslint-disable-next-line
        if (subtasks[n].parent == parentTasks[i].id) {
          sortedTasks.push(subtasks[n]);
        }
      }
    }

    return sortedTasks;
  }

  //Initial update of tasks state, subtask button state and shown subtasks state
  useEffect(() => {
    fetch(
      `https://striker-backend.herokuapp.com/calendar/${userId}?year-month=${monthString}`
    )
      .then((response) => response.json())
      .then((data) => data.filter((task) => task.progress.Valid))
      .then((dailyData) =>
        dailyData.map((task) => {
          return {
            id: task.id,
            type: task.taskType,
            text: task.description,
            deadline: task.deadline.String,
            progress: task.progress.Int64,
            striked: task.isCompleted.Bool,
            parent: task.parentId.String,
            hasChildren: task.hasChildren,
          };
        })
      )
      .then((log) => {
        console.log("Data: ");
        console.log(log);
        return log;
      })
      .then((filteredData) => {
        setTasks(sortTasks(filteredData));
        return filteredData;
      })
      .then((filteredData) => {
        setSubtasksBtnState(filteredData.map((task) => false));
        return filteredData;
      })
      .then((filteredData) =>
        setShownSubtasksState(filteredData.map((task) => false))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // State for filters, first value is if filter is clicked, second is up or down
  const [filters, setFilters] = useState([
    [0, 1],
    [0, 1],
  ]);

  //State for Number of Added Tasks
  const [addedTasks, setAddedTasks] = useState([0]);

  //State for Last Subtask Added Parent
  const [lastParent, setLastParent] = useState([null]);

  //Strike Task Event
  const strikeTask = (id) => {
    for (let i = 0; i < tasks.length; i++) {
      // eslint-disable-next-line
      if (tasks[i].id == id) {
        if (tasks[i].striked) {
          setTasks(
            tasks.map((task) =>
              // eslint-disable-next-line
              task.id == id
                ? {
                    id: task.id,
                    type: task.type,
                    text: task.text,
                    deadline: task.deadline,
                    progress: 1,
                    striked: !task.striked,
                    parent: task.parent,
                    hasChildren: task.hasChildren,
                  }
                : task
            )
          );
        } else {
          setTasks(
            sortTasks(
              tasks.map((task) =>
                // eslint-disable-next-line
                task.id == id || task.parent == id
                  ? {
                      id: task.id,
                      type: task.type,
                      text: task.text,
                      deadline: task.deadline,
                      progress: 2,
                      striked: true,
                      parent: task.parent,
                      hasChildren: task.hasChildren,
                    }
                  : task
              )
            )
          );
        }
      }
    }
    const element = document.getElementById(id + "ID");
    const isCompleted = !element.classList.contains("striked");
    //Send to Backend:
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isCompleted: isCompleted,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task/${id}`,
      requestOptions
    )
      .then((response) => console.log(response.json()))
      .catch((e) => console.log(e));
  };
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

    fetch(`https://striker-backend.herokuapp.com/task-list/single-task/${id}`, {
      method: "DELETE",
    }).then((response) => console.log(response));
  };

  //Add Task Event
  const addTask = () => {
    const taskId = uuidv4();
    console.log("Adding Task of ID: " + taskId);
    const newTask = {
      id: taskId,
      type: 0,
      text: "",
      deadline: "",
      progress: 0,
      striked: false,
      parent: "",
      hasChildren: false,
    };
    setTasks(sortTasks([...tasks, newTask]));
    setSubtasksBtnState([...subtasksBtnState, false]);
    setShownSubtasksState([...shownSubtasksState, false]);

    const newAddedTasks = addedTasks[0] + 1;
    setAddedTasks([newAddedTasks]);

    //Send to Backend:
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: taskId,
        taskType: 0,
        description: "",
        progress: 0,
        userId: userId,
        hasChildren: false,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task?date=${dateString}`,
      requestOptions
    ).then((response) => console.log(response.json()));
  };
  //Callback for Add Task Event
  useEffect(() => {
    if (addedTasks[0] > 0) {
      const newTaskElement =
        document.getElementsByClassName("task")[
          document.getElementsByClassName("task").length - 1
        ];
      const newDivPosition = newTaskElement.offsetTop;
      document.getElementsByClassName("tableContainer")[0].scrollTop =
        newDivPosition;
    }
  }, [addedTasks]);

  //Update Task Text Event (Backend)
  const updateTaskText = (taskText, id) => {
    //Send to Backend:
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: taskText,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task/${id}`,
      requestOptions
    )
      .then((response) => console.log(response.json()))
      .catch((e) => console.log(e));
  };

  //Change Task Text Event
  const updateTaskTextState = (id) => {
    const targetText = document.getElementsByClassName(id + "text")[0];
    const updatedText = targetText.textContent;
    console.log("Updated Text:");
    console.log(updatedText);
    setTasks(
      tasks.map((task) =>
        // eslint-disable-next-line
        task.id == id
          ? {
              id: task.id,
              type: task.type,
              text: updatedText,
              deadline: task.deadline,
              progress: task.progress,
              striked: task.striked,
              parent: task.parent,
              hasChildren: task.hasChildren,
            }
          : task
      )
    );
    updateTaskText(updatedText, id);
  };

  //Change Task Type Event
  const changeTaskType = (id, e) => {
    e.preventDefault();
    // eslint-disable-next-line
    if (e.keyCode == 40) {
      setTasks(
        tasks.map((task) =>
          // eslint-disable-next-line
          task.id == id
            ? {
                id: task.id,
                type: task.type + 1 <= 2 ? task.type + 1 : 0,
                text: task.text,
                deadline: task.deadline,
                progress: task.progress,
                striked: task.striked,
                parent: task.parent,
                hasChildren: task.hasChildren,
              }
            : task
        )
      );
      // eslint-disable-next-line
    } else if (e.keyCode == 38) {
      setTasks(
        tasks.map((task) =>
          // eslint-disable-next-line
          task.id == id
            ? {
                id: task.id,
                type: task.type - 1 >= 0 ? task.type - 1 : 2,
                text: task.text,
                deadline: task.deadline,
                progress: task.progress,
                striked: task.striked,
                parent: task.parent,
                hasChildren: task.hasChildren,
              }
            : task
        )
      );
    } else {
      alert("Use the up or down arrows to swap through task types!");
    }
  };

  //Update Task Type Event
  const updateTaskType = (taskType, id) => {
    //Send to Backend:
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskType: taskType,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task/${id}`,
      requestOptions
    )
      .then((response) => console.log(response.json()))
      .catch((e) => console.log(e));
  };

  //Update Task Progress Event
  const updateTaskProgress = (taskProgress, id) => {
    //Send to Backend:
    const bodyJson =
      // eslint-disable-next-line
      taskProgress == 2
        ? {
            progress: taskProgress,
            isCompleted: true,
          }
        : {
            progress: taskProgress,
            isCompleted: false,
          };
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyJson),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task/${id}`,
      requestOptions
    )
      .then((response) => console.log(response.json()))
      .catch((e) => console.log(e));
  };

  //Change Task Progress Event
  const changeTaskProgress = (id, e) => {
    let taskClicked;
    const targetTasks = [];
    let newProgress;
    let newStriked;
    e.preventDefault();
    for (let i = 0; i < tasks.length; i++) {
      // eslint-disable-next-line
      if (tasks[i].id == id) {
        taskClicked = tasks[i];
        targetTasks.push(taskClicked);
        // eslint-disable-next-line
        if (e.keyCode == 40) {
          newProgress = tasks[i].progress - 1 >= 0 ? tasks[i].progress - 1 : 2;
          // eslint-disable-next-line
        } else if (e.keyCode == 38) {
          newProgress = tasks[i].progress + 1 <= 2 ? tasks[i].progress + 1 : 0;
        } else {
          alert("Use the up or down arrows to swap through task progress!");
        }
        // eslint-disable-next-line
      } else if (tasks[i].parent == id) {
        targetTasks.push(tasks[i]);
      }
    }
    // eslint-disable-next-line
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
      taskClicked.striked = newStriked;
    }

    setTasks(sortTasks(tasks));
  };

  //Update Task Type Event
  const updateTaskDeadline = (taskDeadline, id) => {
    //Send to Backend:
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deadline: taskDeadline,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task/${id}`,
      requestOptions
    )
      .then((response) => console.log(response.json()))
      .catch((e) => console.log(e));
  };

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
    });
    setTasks(sortTasks(newTasks));
    setFilters([
      [1, filters[0][1] * -1],
      [0, 1],
    ]);
  };

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
    });
    setTasks(sortTasks(newTasks));
    setFilters([
      [0, 1],
      [1, filters[1][1] * -1],
    ]);
  };

  //Show Subtasks Event
  const showSubtasks = (id) => {
    const newShownSubtaskState = [...shownSubtasksState];
    let taskIndex = 0;
    for (let i = 0; i < tasks.length; i++) {
      // eslint-disable-next-line
      if (tasks[i].parent == id) {
        newShownSubtaskState[i] = !newShownSubtaskState[i];
      }
      // eslint-disable-next-line
      if (tasks[i].id == id) {
        taskIndex = i;
      }
    }
    const newSubtaskBtnState = [...subtasksBtnState];
    newSubtaskBtnState[taskIndex] = !newSubtaskBtnState[taskIndex];
    setSubtasksBtnState(newSubtaskBtnState);
    setShownSubtasksState(newShownSubtaskState);
  };

  //Add Subtask Event
  const addSubtask = (parentId) => {
    const taskId = uuidv4();
    console.log("Adding Task of ID: " + taskId);
    const oldLength = tasks.length;
    const oldParentIndex = tasks.indexOf(
      // eslint-disable-next-line
      tasks.filter((task) => task.id == parentId)[0]
    );
    const newTask = {
      id: taskId,
      type: 0,
      text: "",
      deadline: "",
      progress: 0,
      striked: false,
      parent: parentId,
      hasChildren: false,
    };
    const newTasks = tasks.map((task) =>
      // eslint-disable-next-line
      task.id == parentId
        ? {
            id: task.id,
            type: task.type,
            text: task.text,
            deadline: task.deadline,
            progress: task.progress,
            striked: task.striked,
            parent: task.parent,
            hasChildren: true,
          }
        : task
    );
    const newSortedTasks = sortTasks([...newTasks, newTask]);
    setTasks(newSortedTasks);

    const newSubtasksBtnState = [];
    const newShownSubtasksState = [];
    let counter = 0;

    console.log(oldParentIndex);
    const booleanValue = subtasksBtnState[oldParentIndex];
    console.log(booleanValue);
    for (let i = 0; i < oldLength; i++) {
      newSubtasksBtnState.push(subtasksBtnState[counter]);
      newShownSubtasksState.push(shownSubtasksState[counter]);
      counter++;
      // eslint-disable-next-line
      if (tasks[i].id == parentId) {
        newSubtasksBtnState.push(false);
        newShownSubtasksState.push(booleanValue);
      }
    }

    setSubtasksBtnState(newSubtasksBtnState);
    setShownSubtasksState(newShownSubtasksState);
    if (!booleanValue) {
      setLastParent([parentId]);
    }

    //Send to Backend:
    const requestOptionsSubtask = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskType: 0,
        description: "",
        progress: 0,
        userId: userId,
        parentId: parentId,
        hasChildren: false,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task?date=${dateString}`,
      requestOptionsSubtask
    ).then((response) => console.log(response.json()));

    //Send to Backend:
    const requestOptionsParent = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hasChildren: true,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task/${parentId}`,
      requestOptionsParent
    )
      .then((response) => console.log(response.json()))
      .catch((e) => console.log(e));
  };

  //Callback for addSubtask
  useEffect(() => {
    if (lastParent[0]) {
      showSubtasks(lastParent[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastParent]);

  return (
    <div className="container">
      <Container
        tasks={tasks}
        setTasks={setTasks}
        strikeTask={strikeTask}
        deleteTask={deleteTask}
        addTask={addTask}
        filterPriority={filterDeadline}
        filterEffort={filterProgress}
        filters={filters}
        updateTaskText={updateTaskTextState}
        changeTaskType={changeTaskType}
        updateTaskTypeEvent={updateTaskType}
        changeTaskProgress={changeTaskProgress}
        updateTaskProgressEvent={updateTaskProgress}
        updateTaskDeadlineEvent={updateTaskDeadline}
        subtasksBtnState={subtasksBtnState}
        shownSubtasksState={shownSubtasksState}
        showSubtasks={showSubtasks}
        addSubtask={addSubtask}
      />
    </div>
  );
}

export default MonthlyTasklist;
