import "./DailyTasklist.css";
import { useState, useEffect, Fragment } from "react";
import { ContainerDaily } from "../../components/Tasklists/DailyTasklist/ContainerDaily";
import "../../components/YesterdayModal/YesterdayModal";
import YesterdayModal from "../../components/YesterdayModal/YesterdayModal";
import PomodoroModal from "../../components/PomodoroModal/PomodoroModal";
import { SideMenu } from "../../components/Tasklists/DailyTasklist/SideMenu";
import { v4 as uuidv4 } from "uuid";
import { use135 } from "../../context/OneThreeFiveContext";
import OneThreeFiveModal from "../../components/OneThreeFiveModal/OneThreeFiveModal";
import { useParams } from "react-router-dom";

function DailyTasklist() {
  //Get User Data:
  let user = JSON.parse(localStorage.getItem("currentUser"));
  console.log("User:");
  console.log(user);
  const userId = user.uid;

  const { date } = useParams();

  //Today's date:
  const dateString = date;
  const monthString = dateString.slice(0, 7);

  //State for Task list
  const [tasks, setTasks] = useState([]);

  //State for Monthly Tasks
  const [monthlyTasks, setMonthlyTasks] = useState([]);

  //Sort Tasks and Subtasks
  function sortTasks(tasks) {
    // eslint-disable-next-line
    const parentTasks = tasks.filter((task) => task.parent == "");
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

  //function take loads tasks in the daily log
  const GetDailyTasks = () => {
    fetch(
      `https://striker-backend.herokuapp.com/task-list/${userId}?date=${dateString}`
    )
      .then((response) => response.json())
      .then((data) => data.filter((task) => !task.deadline.Valid))
      .then((dailyData) =>
        dailyData.map((task) => {
          return {
            id: task.id,
            type: task.taskType,
            text: task.description,
            priority: task.priority.Int64,
            effort: task.effort.Int64,
            striked: task.isCompleted.Bool,
          };
        })
      )
      .then((log) => {
        console.log("Loading data for date: " + dateString);
        console.log(log);
        return log;
      })
      .then((filteredData) => setTasks(filteredData))
      .catch(setTasks([]));
  };

  //Initial update of tasks
  useEffect(() => {
    console.log("Updating Tasks:");
    GetDailyTasks();

    //gets monthly tasks
    fetch(
      `https://striker-backend.herokuapp.com/calendar/${userId}?year-month=${monthString}`
    )
      .then((response) => response.json())
      .then((data) => data.filter((task) => task.progress.Valid))
      .then((dailyData) => {
        return dailyData.map((task) => {
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
        });
      })
      .then((log) => {
        console.log("Data (Monthly): ");
        console.log(log);
        return log;
      })
      .then((filteredData) => {
        setMonthlyTasks(sortTasks(filteredData));
        return filteredData;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // State for filters, first value is if filter is clicked, second is up or down
  const [filters, setFilters] = useState([
    [0, 1],
    [0, 1],
  ]);

  //State for Number of Added Tasks
  const [addedTasks, setAddedTasks] = useState([0]);

  //Strike Task Event
  const strikeTask = (id) => {
    setTasks(
      tasks.map((task) =>
        // eslint-disable-next-line
        task.id == id
          ? {
              id: task.id,
              type: task.type,
              text: task.text,
              priority: task.priority,
              effort: task.effort,
              striked: !task.striked,
            }
          : task
      )
    );
    updateTaskStriked(id);
  };

  //Update Task Striked Event
  const updateTaskStriked = (id) => {
    const element = document.getElementById(id + "ID");
    const isCompleted = !element.classList.contains("striked");
    console.log(isCompleted);
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
    setTasks(tasks.filter((task) => task.id !== id));
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
      priority: 0,
      effort: 0,
      striked: false,
    };
    setTasks([...tasks, newTask]);

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
        effort: 0,
        priority: 0,
        userId: userId,
        hasChildren: false,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task?date=${dateString}`,
      requestOptions
    ).then((response) => {
      console.log("Adding task response: ");
      console.log(response.json());
    });
    return taskId;
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
                priority: task.priority,
                effort: task.effort,
                striked: task.striked,
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
                priority: task.priority,
                effort: task.effort,
                striked: task.striked,
              }
            : task
        )
      );
    } else {
      //TODO this should change for the keyboard shortcut
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

  //Change and update Task Type Event via dropdown
  const changeAndUpdateTaskTypeDropdown = (id, taskType) => {
    //changing task type
    setTasks(
      tasks.map((task) =>
        // eslint-disable-next-line
        task.id == id
          ? {
              id: task.id,
              type: taskType,
              text: task.text,
              priority: task.priority,
              effort: task.effort,
              striked: task.striked,
            }
          : task
      )
    );
    //updating task type
    updateTaskType(taskType, id);
  };

  //Change Task Text Event
  const updateTaskTextState = (id) => {
    const targetText = document.getElementsByClassName(id + "text")[0];
    const updatedText = targetText.textContent;
    setTasks(
      tasks.map((task) =>
        // eslint-disable-next-line
        task.id == id
          ? {
              id: task.id,
              type: task.type,
              text: updatedText,
              priority: task.priority,
              effort: task.effort,
              striked: task.striked,
            }
          : task
      )
    );
    updateTaskText(updatedText, id);
  };

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

  //Change Task Priority Event
  const changeTaskPriority = (id, e) => {
    e.preventDefault();
    // eslint-disable-next-line
    if (e.keyCode == 40) {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? {
                id: task.id,
                type: task.type,
                text: task.text,
                priority: task.priority + 1 <= 2 ? task.priority + 1 : 0,
                effort: task.effort,
                striked: task.striked,
              }
            : task
        )
      );
    } else if (e.keyCode === 38) {
      setTasks(
        tasks.map((task) =>
          task.id === id
            ? {
                id: task.id,
                type: task.type,
                text: task.text,
                priority: task.priority - 1 >= 0 ? task.priority - 1 : 2,
                effort: task.effort,
                striked: task.striked,
              }
            : task
        )
      );
    } else {
      alert("Use the up or down arrows to swap through task priorities!");
    }
  };

  //Update Task Priority Event
  const updateTaskPriority = (taskPriority, id) => {
    //Send to Backend:
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        priority: taskPriority,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task/${id}`,
      requestOptions
    )
      .then((response) => console.log(response.json()))
      .catch((e) => console.log(e));
  };

  //Change and update task priority for dropdown
  const changeAndUpdateTaskPriorityDropdown = (taskPriority, id) => {
    //changing the priority
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              id: task.id,
              type: task.type,
              text: task.text,
              priority: taskPriority,
              effort: task.effort,
              striked: task.striked,
            }
          : task
      )
    );

    //updating the priority
    updateTaskPriority(taskPriority, id);
  };

  //Change Task Effort Event
  const updateTaskEffortState = (id) => {
    const targetEffort = document.getElementsByClassName(id + "effort")[0];
    const updatedEffort = parseInt(targetEffort.textContent);
    console.log("Updated Effort:");
    console.log(updatedEffort);
    setTasks(
      tasks.map((task) =>
        // eslint-disable-next-line
        task.id == id
          ? {
              id: task.id,
              type: task.type,
              text: task.text,
              priority: task.priority,
              effort: updatedEffort ? updatedEffort : 0,
              striked: task.striked,
            }
          : task
      )
    );
    updateTaskEffort(updatedEffort, id);
  };

  //Update Task Effort Event
  const updateTaskEffort = (taskEffort, id) => {
    //Send to Backend:
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        effort: taskEffort,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task/${id}`,
      requestOptions
    )
      .then((response) => console.log(response.json()))
      .catch((e) => console.log(e));
  };

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
    });
    setTasks(newTasks);
    setFilters([
      [1, filters[0][1] * -1],
      [0, 1],
    ]);
  };

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
    });
    setTasks(newTasks);
    setFilters([
      [0, 1],
      [1, filters[1][1] * -1],
    ]);
  };

  //Transfer Side Menu Task Event:
  const transferTask = (oldId, text, type) => {
    //Remove old task
    setMonthlyTasks(monthlyTasks.filter((task) => task.id !== oldId));

    //Add to local tasks
    const taskId = uuidv4();
    const newTask = {
      id: taskId,
      type: type,
      text: text,
      priority: 0,
      effort: 0,
      striked: false,
    };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);

    //Send to Backend:
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: taskId,
        taskType: type,
        description: text,
        effort: 0,
        priority: 0,
        userId: userId,
        hasChildren: false,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task?date=${dateString}`,
      requestOptions
    ).then((response) => {
      console.log("Transferring task response: ");
      console.log(response.json());
    });
  };

  //Modal popup for yesterday's task upon login

  //state for yesterday task modal
  const [isYesterdayModalVisible, setIsVisible] = useState(false);

  //date to check against last login date
  let realToday = new Date();
  const realTodayString =
    realToday.getFullYear() +
    "-" +
    String(realToday.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(realToday.getDate()).padStart(2, "0");

  //function to update last login date to new date
  const updateLastLoginDate = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `https://striker-backend.herokuapp.com/last-login/${userId}`,
      requestOptions
    )
      .then((response) => console.log(response.json()))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    //this func also updates last login date
    const checkLastLogin = () => {
      fetch(`https://striker-backend.herokuapp.com/last-login/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.lastLogin !== realTodayString) {
            updateLastLoginDate();
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
    };

    checkLastLogin();
    //uncomment for testing
    // setIsVisible(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeYesterdayModal = () => {
    setIsVisible(!isYesterdayModalVisible);
  };

  //Modal popup for pomodoro timer
  const [isPomoVisible, setPomoVisible] = useState(false);

  //to open and close pomo modal
  const togglePomo = () => {
    setPomoVisible(!isPomoVisible);
  };

  //for 135 feature
  const { is135Active } = use135();
  const [is135ErrorVisible, set135ErrorVisible] = useState(false);

  useEffect(() => {
    function check135Condition() {
      const numOfRedTasks = tasks.reduce(
        (x, y) => (y.priority === 2 ? x + 1 : x),
        0
      );
      const numOfOrangeTasks = tasks.reduce(
        (x, y) => (y.priority === 1 ? x + 1 : x),
        0
      );
      const numOfGreenTasks = tasks.reduce(
        (x, y) => (y.priority === 0 ? x + 1 : x),
        0
      );

      if (
        tasks.length > 9 ||
        numOfRedTasks > 1 ||
        numOfOrangeTasks > 3 ||
        numOfGreenTasks > 5
      ) {
        set135ErrorVisible(true);
      }
    }

    if (is135Active) {
      check135Condition();
    }
  }, [tasks, is135Active]);

  const addTaskShortcut = (event) => {
    if (event.defaultPrevented) return  // Exits here if event has been handled
    event.preventDefault()
    if (event.key === "Enter") {
      console.log(`SHORTCUT TRIGGERED! PRESSED ${event.key}`);    
      console.log(tasks);

      const taskId = uuidv4();
      console.log("Adding Task of ID: " + taskId);
      const newTask = {
        id: taskId,
        type: 0,
        text: "",
        priority: 0,
        effort: 0,
        striked: false,
      };  
      //Send to Backend:
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: taskId,
          taskType: 0,
          description: "",
          effort: 0,
          priority: 0,
          userId: userId,
          hasChildren: false,
        }),
      };
      fetch(
        `https://striker-backend.herokuapp.com/task-list/single-task?date=${dateString}`,
        requestOptions
      ).then((response) => {
        console.log("Adding task response: ");
        console.log(response.json());
      }).then((response) => GetDailyTasks());
    } else {
      console.log("NO!");
    }
  }

  // attach the event listener
  document.addEventListener('keyup', addTaskShortcut);

  return (
    <Fragment>
      {isYesterdayModalVisible && (
        <YesterdayModal
          closeYesterdayModal={closeYesterdayModal}
          GetDailyTasks={GetDailyTasks}
        />
      )}
      <OneThreeFiveModal
        is135ErrorVisible={is135ErrorVisible}
        set135ErrorVisible={set135ErrorVisible}
      />
      {isPomoVisible && <PomodoroModal togglePomo={togglePomo} />}
      <div className="dailyLogCenterRow">
        <ContainerDaily
          todayString={date}
          tasks={tasks}
          strikeTask={strikeTask}
          deleteTask={deleteTask}
          addTask={addTask}
          filterPriority={filterPriority}
          filterEffort={filterEffort}
          filters={filters}
          updateTaskTextState={updateTaskTextState}
          updateTaskEffortState={updateTaskEffortState}
          changeTaskType={changeTaskType}
          changeTaskPriority={changeTaskPriority}
          updateTaskTypeEvent={updateTaskType}
          updateTaskTextEvent={updateTaskText}
          updateTaskPriorityEvent={updateTaskPriority}
          updateTaskEffortEvent={updateTaskEffort}
          togglePomo={togglePomo}
          changeAndUpdateTaskTypeDropdown={changeAndUpdateTaskTypeDropdown}
          changeAndUpdateTaskPriorityDropdown={
            changeAndUpdateTaskPriorityDropdown
          }
        />
        {window.innerWidth > 1024 && (
          <SideMenu monthlyTasks={monthlyTasks} transferTask={transferTask} />
        )}
      </div>
    </Fragment>
  );
}

export default DailyTasklist;
