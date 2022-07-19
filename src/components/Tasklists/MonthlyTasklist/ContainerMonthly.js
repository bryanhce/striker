import React from "react";
import AddTask from "../AddTask";
import ProgressBar from "../Progress";
import TableMonthly from "./TableMonthly";

export const Container = ({
  tasks,
  setTasks,
  strikeTask,
  deleteTask,
  addTask,
  filterPriority,
  filterEffort,
  filters,
  updateTaskText,
  changeTaskType,
  updateTaskTypeEvent,
  updateTaskDeadlineEvent,
  changeTaskProgress,
  updateTaskProgressEvent,
  subtasksBtnState,
  shownSubtasksState,
  showSubtasks,
  addSubtask,
  changeAndUpdateProgressDropdown,
  changeAndUpdateTaskTypeDropdown,
}) => {
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  var today = new Date();
  return (
    <div className="border">
      <div className="border-header">
        <h2 className="border-month">{months[today.getMonth()]}</h2>
      </div>
      <TableMonthly
        tasks={tasks}
        setTasks={setTasks}
        strikeTask={strikeTask}
        deleteTask={deleteTask}
        filterPriority={filterPriority}
        filterEffort={filterEffort}
        filters={filters}
        updateTaskText={updateTaskText}
        changeTaskType={changeTaskType}
        updateTaskTypeEvent={updateTaskTypeEvent}
        changeTaskProgress={changeTaskProgress}
        updateTaskProgressEvent={updateTaskProgressEvent}
        updateTaskDeadlineEvent={updateTaskDeadlineEvent}
        subtasksBtnState={subtasksBtnState}
        shownSubtasksState={shownSubtasksState}
        showSubtasks={showSubtasks}
        addSubtask={addSubtask}
        changeAndUpdateProgressDropdown={changeAndUpdateProgressDropdown}
        changeAndUpdateTaskTypeDropdown={changeAndUpdateTaskTypeDropdown}
      />
      <AddTask addTask={addTask} />
      <ProgressBar tasks={tasks} />
    </div>
  );
};
