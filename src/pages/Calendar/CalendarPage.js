import { Calendar } from "antd";
import "./CalendarPage.css";
import "antd/dist/antd.min.css";
import { CalendarTask } from "../../components/Calendar/CalendarTask";
import { useState, useEffect } from "react";



function CalendarPage() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  console.log("User:");
  console.log(user);
  const userId = user.uid;

  function getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  function monthCellRender(value) {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>  
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  
  function onDateSelected(value) {
    const string = value.format("YYYY-MM");
    setDateSelected(string);
  }

  //State for date selected
  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;

    return [year, month].join('-');
}
  const todayString = formatDate(new Date());
  const [dateSelected, setDateSelected] = useState([todayString]);

  //State for calendar tasks
  const [calendarTasks, setCalendarTasks] = useState([]);

  useEffect(() => {
    //Fetch data
    fetch(`https://striker-backend.herokuapp.com/calendar/${userId}?year-month=${dateSelected}`)
    .then((response) => response.json())
    .then((jsonData) => setCalendarTasks(jsonData))

    //Make cells drop targets
    const calendarCells = document.getElementsByClassName("ant-picker-cell ant-picker-cell-in-view");

    
    for (let i=0; i < calendarCells.length; i++) {
      calendarCells[i].addEventListener('dragover', dragOver);
      calendarCells[i].addEventListener('dragenter', dragEnter);
      calendarCells[i].addEventListener('dragleave', dragLeave);
      calendarCells[i].addEventListener('drop', drop);

      calendarCells[i].addEventListener('click', () => {
        const dateString = calendarCells[i].getAttribute('title');
        console.log(dateString);
        window.location.href = "https://striker-frontend.herokuapp.com/daily-task-list/" + dateString;
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function dragStart(e) {
    console.log("START!");
    console.log(calendarTasks);

    e.dataTransfer.setData('text/plain', e.target.id);
  }

  function drop(e) {
    e.preventDefault();
    console.log("DROPPED!");
    console.log(calendarTasks);

    const taskId = e.dataTransfer.getData('text/plain');
    const dropLocationDate = e.target.parentElement.parentElement.title;
    
    //Update Backend:
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dailyLogDate: dropLocationDate,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task/${taskId}`,
      requestOptions
    )
    .then((response) => console.log(response.json()))
    .catch((e) => console.log(e));

    //Update Calendar Tasks State:
    const newCalendarTasks = calendarTasks.map((task) => task.id === taskId ? {id: task.id, dailyLogDate: dropLocationDate, taskType: task.taskType, description: task.description, isCompleted: task.isCompleted, effort: task.effort, priority: task.priority, userId: task.userId, hasChildren: task.hasChildren} : task);

    setCalendarTasks(newCalendarTasks);
  };

  function dragOver(e) {
    e.preventDefault();
    if (!this.className.includes("calendarHovered")) {
      this.className += " calendarHovered";
    }
  }

  function dragEnter(e) {
    e.preventDefault();
    this.className += " calendarHovered";
  }
    
  function dragLeave(e) {
    e.preventDefault();
    this.className = "ant-picker-cell ant-picker-cell-in-view";
  }

  function dragDrop() {
    this.className = "ant-picker-cell ant-picker-cell-in-view";
  }

  function dateCellRender(value) {
    let listData = [];
    const dateString = value.format("YYYY-MM-DD");
    if (calendarTasks) {
      for (let i=0; i < calendarTasks.length; i++) {
        if (calendarTasks[i].dailyLogDate === dateString && calendarTasks[i].priority.Valid) {
          listData.push(calendarTasks[i])
        }
      }
    }
    return (
      <ul className="events">
        {listData.map((task) => (
          <li key={task.id} id={task.id} draggable="true" onDrop={drop} onDragStart={dragStart}>
            <CalendarTask type={task.taskType} text={task.description} />
          </li>
        ))}
      </ul>
    );
  }
  
  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onSelect={onDateSelected}
    />
  );
};

export default CalendarPage;
