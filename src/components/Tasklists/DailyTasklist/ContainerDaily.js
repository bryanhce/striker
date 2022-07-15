import React from "react";
import AddTask from "../AddTask";
import ProgressBar from "../Progress";
import TableDaily from "./TableDaily";

export const ContainerDaily = ({
  todayString,
  tasks,
  strikeTask,
  deleteTask,
  addTask,
  filterPriority,
  filterEffort,
  filters,
  updateTaskTextState,
  updateTaskEffortState,
  changeTaskType,
  changeTaskPriority,
  updateTaskTypeEvent,
  updateTaskTextEvent,
  updateTaskPriorityEvent,
  updateTaskEffortEvent,
  togglePomo,
}) => {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const todayDate = new Date(todayString);
  const todayIndex = todayDate.getDay() - 1;
  let todayDay = daysOfWeek[todayIndex];
  if (todayIndex === -1) {
    todayDay = "sunday"
  }
  const todayDisplay =
    todayString.slice(8) +
    " . " +
    todayString.slice(5, 7) +
    " . " +
    todayString.slice(0, 4);

  return (
    <div className="border">
      <div className="border-header">
        <h2 className="border-day">{todayDay}</h2>
        <h2 className="border-date">{todayDisplay}</h2>
      </div>
      <TableDaily
        tasks={tasks}
        strikeTask={strikeTask}
        deleteTask={deleteTask}
        filterPriority={filterPriority}
        filterEffort={filterEffort}
        filters={filters}
        updateTaskTextState={updateTaskTextState}
        updateTaskEffortState={updateTaskEffortState}
        changeTaskType={changeTaskType}
        changeTaskPriority={changeTaskPriority}
        updateTaskTypeEvent={updateTaskTypeEvent}
        updateTaskTextEvent={updateTaskTextEvent}
        updateTaskPriorityEvent={updateTaskPriorityEvent}
        updateTaskEffortEvent={updateTaskEffortEvent}
        togglePomo={togglePomo}
      />
      <AddTask addTask={addTask} />
      <ProgressBar tasks={tasks} />
    </div>
  );
};
