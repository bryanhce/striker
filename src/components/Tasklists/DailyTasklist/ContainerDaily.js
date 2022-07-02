import React from "react";
import AddTask from "../AddTask";
import ProgressBar from "../Progress";
import TableDaily from "./TableDaily";

export const ContainerDaily = ({
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
}) => {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  var today = new Date();
  return (
    <div className="border">
      <div className="border-header">
        <h2 className="border-day">{daysOfWeek[today.getDay() - 1]}</h2>
        <h2 className="border-date">
          {today.getDate() +
            " . " +
            today.getMonth() +
            " . " +
            today.getFullYear()}
        </h2>
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
      />
      <AddTask addTask={addTask} />
      <ProgressBar tasks={tasks} />
    </div>
  );
};
