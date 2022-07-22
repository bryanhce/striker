import { Calendar, Badge } from "antd";
import "./CalendarPage.css";
import "antd/dist/antd.min.css";
import { CalendarTask } from "../../components/Calendar/CalendarTask";
import { useState, useEffect } from "react";


//https://striker-backend.herokuapp.com/calendar/{{user-id}}?year-month=2022-06

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
  const dateString = value.format("YYYY-MM-DD");
  console.log(dateString);
  window.location.href = "https://striker-frontend.herokuapp.com/daily-task-list/" + dateString;
}

const CalendarPage = () => {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  console.log("User:");
  console.log(user);
  const userId = user.uid;

  //State for calendar tasks
  const [calendarTasks, setCalendarTasks] = useState([]);

  useEffect(() => {
    fetch(`https://striker-backend.herokuapp.com/calendar/${userId}?year-month=2022-07`)
    .then((response) => response.json())
    .then((jsonData) => setCalendarTasks(jsonData))
  }, []);
    
  function dateCellRender(value) {
    let listData = [];
    const dateString = value.format("YYYY-MM-DD");
    console.log(calendarTasks);
    if (calendarTasks) {
      for (let i=0; i < calendarTasks.length; i++) {
        if (calendarTasks[i].dailyLogDate === dateString && calendarTasks[i].priority.Valid) {
          listData.push(calendarTasks[i])
        }
      }
    }
    console.log(listData);
    return (
      <ul className="events">
        {listData.map((task) => (
          <li key={task.id}>
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
