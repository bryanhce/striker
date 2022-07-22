import React from 'react'

export const CalendarTask = ({ type, text }) => {

  //Task type buttons
  const taskType = (type) => {
    if (type === 0) {
      return <input
          type="image"
          className="calendarStrikeBtn"
          alt="event"
          src={require("../../images/event.png")}/>
    } else if (type === 1) {
        return <input
        type="image"
        className="calendarStrikeBtn"
        alt="event"
        src={require("../../images/assignment.png")}/>
    } else if (type === 2) {
      return <input
      type="image"
      className="calendarStrikeBtn"
      alt="event"
      src={require("../../images/note.png")}/>
    }
  };

    return (
        <div className="calendarTaskContainer">
            {taskType(type)}
            <div className="calendarTaskText">{text}</div>
        </div>
    )
}
