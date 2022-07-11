import React from "react";
import { useState } from "react";
import {
  PlusSquareOutlined,
  RightOutlined,
  DownOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import AddTask from "../AddTask";
import { useColourBlind } from "../../../context/ColourBlindContext";

function TableMonthly({
  tasks,
  setTasks,
  strikeTask,
  deleteTask,
  filterPriority,
  filterEffort,
  filters,
  updateTaskText,
  changeTaskType,
  updateTaskTypeEvent,
  changeTaskProgress,
  updateTaskProgressEvent,
  updateTaskDeadlineEvent,
  subtasksBtnState,
  shownSubtasksState,
  showSubtasks,
  addSubtask,
}) {
  const progress = ["Haven't Started", "In Progress", "Completed"];
  const progressColours = ["redMonth", "yellowMonth", "greenMonth"];
  const colourBlindProgressColours = [
    "cb-redMonth",
    "cb-yellowMonth",
    "cb-greenMonth",
  ];

  const { isColourBlindFilter } = useColourBlind();
  //Task type buttons
  const taskType = (type, id) => {
      if (type == 0) {
          return <input type="image" className="strikeBtn" onDoubleClick={() => strikeTask(id)} src={require("../../../images/event.png")} onKeyDown={(e) => changeTaskType(id, e)} onBlur={() => {
              updateTaskTypeEvent(0, id);
              onUnselect("strikeBtn", id);
          }} onClick={() => onSelect("strikeBtn", id)} />
      } else if (type == 1) {
          return <input type="image" className="strikeBtn" onDoubleClick={() => strikeTask(id)} src={require("../../../images/assignment.png")} onKeyDown={(e) => changeTaskType(id, e)} onBlur={() => {
              updateTaskTypeEvent(0, id);
              onUnselect("strikeBtn", id);
          }} onClick={() => onSelect("strikeBtn", id)} />        
      } else if (type == 2) {
          return <input type="image" className="strikeBtn" onDoubleClick={() => strikeTask(id)} src={require("../../../images/note.png")} onKeyDown={(e) => changeTaskType(id, e)} onBlur={() => {
              updateTaskTypeEvent(0, id);
              onUnselect("strikeBtn", id);
          }} onClick={() => onSelect("strikeBtn", id)} />        
      }
  }

  //Select field Event:
  const onSelect = (className, id) => {
      const task = document.getElementById(id +"ID");
      const element = task.getElementsByClassName(className)[0];
      element.classList.add("bordered");
  }

  //Unselect field Event:
  const onUnselect = (className, id) => {
      const task = document.getElementById(id +"ID");
      const element = task.getElementsByClassName(className)[0];
      element.classList.remove("bordered");    
  }

  //Filter Tasks Show All
  const filterTasksAll = () => {
      var taskRows = document.querySelectorAll(".task");
      for (let i = 0; i < taskRows.length; i++) {
          if (taskRows[i]) {
              taskRows[i].classList.remove("hidden");
          }
      }
      setFiltered([0]);
    }
    setFiltered([0]);
  };

  //Filter Tasks Uncompleted
  const filterTasksUncompleted = () => {
    filterTasksAll();

    var taskRows = document.querySelectorAll(".task");
    for (let i = 0; i < taskRows.length; i++) {
      if (taskRows[i].classList.contains("striked")) {
        taskRows[i].classList.add("hidden");
      }
    }
    setFiltered([1]);
  };

  //Filter Tasks Completed
  const filterTasksCompleted = () => {
    filterTasksAll();

    var taskRows = document.querySelectorAll(".task");
    for (let i = 0; i < taskRows.length; i++) {
      if (!taskRows[i].classList.contains("striked")) {
        taskRows[i].classList.add("hidden");
      }
    }
    setFiltered([2]);
  };

  //Deadline onFocus (Date)
  const deadlineOnFocus = (id) => {
    const taskDeadline = document.getElementsByClassName(id + "deadline")[0];
    const task = tasks.filter((task) => task.id == id)[0];
    taskDeadline.value =
      task.deadline.substring(6) +
      "-" +
      task.deadline.substring(3, 5) +
      "-" +
      task.deadline.substring(0, 2);
    taskDeadline.type = "date";
  };

  //Deadline onBlur (Text)
  const deadlineOnBlur = (id) => {
    const taskDeadline = document.getElementsByClassName(id + "deadline")[0];
    const taskDeadlineRaw = taskDeadline.value;
    const dateString = taskDeadline.value.substring(8);
    const monthString = taskDeadline.value.substring(5, 7);
    const yearString = taskDeadline.value.substring(0, 4);
    const finalString = dateString + "-" + monthString + "-" + yearString;
    taskDeadline.placeholder = finalString;
    taskDeadline.value = finalString;
    taskDeadline.type = "text";
    setTasks(
      tasks.map((task) =>
        task.id == id
          ? {
              id: task.id,
              type: task.type,
              text: task.text,
              deadline: taskDeadlineRaw,
              progress: task.progress,
              striked: task.striked,
              parent: task.parent,
              hasChildren: task.hasChildren,
            }
          : task
      )
    );
    console.log("HELLO!");
    console.log(taskDeadlineRaw);
    updateTaskDeadlineEvent(taskDeadlineRaw, id);
  };

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr className="tableHeader">
            <th className="strikeBtnHeader"></th>
            <th
              className="taskHeader filterableHeader"
              onClick={
                filtered == 0
                  ? filterTasksUncompleted
                  : filtered == 1
                  ? filterTasksCompleted
                  : filterTasksAll
              }
            >
              <div className="headerContainer">
                <div className="taskHeaderText">Task</div>
                {filtered == 1 ? (
                  <EyeOutlined className="filterIcon" />
                ) : filtered == 2 ? (
                  <EyeInvisibleOutlined className="filterIcon" />
                ) : (
                  <EyeOutlined className="hidden" />
                )}
              </div>
            </th>
            <th
              className="deadlineHeader filterableHeader"
              onClick={filterPriority}
            >
              <div className="headerContainer">
                <div className="deadlineHeaderText">Deadline</div>
                {filters[0][1] > 0 ? (
                  <CaretDownOutlined
                    className={
                      filters[0][0] !== 0 ? "filterIcon" : "filterIcon hidden"
                    }
                  />
                ) : (
                  <CaretUpOutlined
                    className={
                      filters[0][0] !== 0 ? "filterIcon" : "filterIcon hidden"
                    }
                  />
                )}
              </div>
            </th>
            <th
              className="progressHeader filterableHeader"
              onClick={filterEffort}
            >
              <div className="headerContainer">
                <div className="progressHeaderText">Progress</div>
                {filters[1][1] > 0 ? (
                  <CaretDownOutlined
                    className={
                      filters[1][0] !== 0 ? "filterIcon" : "filterIcon hidden"
                    }
                  />
                ) : (
                  <CaretUpOutlined
                    className={
                      filters[1][0] !== 0 ? "filterIcon" : "filterIcon hidden"
                    }
                  />
                )}
              </div>
            </th>
            <th className="deleteBtnHeader"></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            let rowClass;
            if (task.parent != "") {
              if (
                shownSubtasksState[tasks.indexOf(task)] &&
                !(filtered == 1 && task.striked)
              ) {
                rowClass = "subtask";
              } else {
                rowClass = "subtask hidden";
              }
            } else {
              rowClass = "task";
            }

            return (
              <tr
                key={task.id}
                className={task.striked ? rowClass + " striked" : rowClass}
                id={task.id + "ID"}
              >
                <td
                  className={
                    task.parent !== ""
                      ? "subtaskTypeBtnContainer"
                      : "btnContainer"
                  }
                >
                  {taskType(task.type, task.id)}
                </td>
                <td>
                  <div className="taskTextContainer">
                    <div
                      className={
                        task.parent !== ""
                          ? "subtaskText " + task.id + "text"
                          : "taskText " + task.id + "text"
                      }
                      contentEditable="true"
                      onBlur={() => updateTaskText(task.id)}
                    >
                      {task.text}
                    </div>
                    <div className="subtaskBtnContainers">
                      <div className="addSubtaskBtnContainer">
                        <PlusSquareOutlined
                          className={
                            task.parent !== ""
                              ? "addSubtaskBtn hidden"
                              : "addSubtaskBtn"
                          }
                          onClick={() => addSubtask(task.id)}
                        />
                      </div>
                      {subtasksBtnState[tasks.indexOf(task)] ? (
                        <DownOutlined
                          className={
                            task.hasChildren
                              ? "subtaskBtn"
                              : "subtaskBtn hidden"
                          }
                          onClick={() => showSubtasks(task.id)}
                        />
                      ) : (
                        <RightOutlined
                          className={
                            task.hasChildren
                              ? "subtaskBtn"
                              : "subtaskBtn hidden"
                          }
                          onClick={() => showSubtasks(task.id)}
                        />
                      )}
                    </div>
                  </div>
                </td>
                <td className="deadlineContainer">
                  <input
                    className={"row_info deadline " + task.id + "deadline"}
                    onFocus={() => deadlineOnFocus(task.id)}
                    onBlur={() => deadlineOnBlur(task.id)}
                    placeholder={
                      task.deadline.substring(8) +
                      "-" +
                      task.deadline.substring(5, 7) +
                      "-" +
                      task.deadline.substring(0, 4)
                    }
                  />
                </td>
                <td>
                  <div
                    tabIndex="0"
                    className={`taskProgress ${
                      isColourBlindFilter
                        ? colourBlindProgressColours[task.progress]
                        : progressColours[task.progress]
                    }`}
                    onKeyDown={(e) => changeTaskProgress(task.id, e)}
                    onBlur={updateTaskProgressEvent(task.progress, task.id)}
                  >
                    {progress[task.progress]}
                  </div>
                </td>
                <td className="btnContainer">
                  <DeleteOutlined
                    className="deleteTask"
                    onClick={() => deleteTask(task.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableMonthly;
