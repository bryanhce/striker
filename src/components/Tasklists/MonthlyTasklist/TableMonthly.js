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
import { Menu, Dropdown } from "antd";
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
  changeAndUpdateProgressDropdown,
  changeAndUpdateTaskTypeDropdown,
}) {
  const progress = ["Haven't Started", "In Progress", "Completed"];
  const progressColours = ["redMonth", "yellowMonth", "greenMonth"];
  const colourBlindProgressColours = [
    "cb-redMonth",
    "cb-yellowMonth",
    "cb-greenMonth",
  ];

  const { isColourBlindFilter } = useColourBlind();

  //State for shown and hidden tasks (0 is show all, 1 is uncompleted tasks, 2 is completed tasks)
  const [filtered, setFiltered] = useState([0]);

  //for ipad usage
  let widthBool = window.innerWidth <= 1024;

  //for ipad dropdown menu
  const MenuTaskTypeDropdown = ({ id }) => (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <img
              src={require("../../../images/event.png")}
              alt="event"
              className="dropdown-icon"
            />
          ),
          onClick: () => changeAndUpdateTaskTypeDropdown(id, 0),
        },
        {
          key: "2",
          label: (
            <img
              src={require("../../../images/assignment.png")}
              alt="assignment"
              className="dropdown-icon"
            />
          ),
          onClick: () => changeAndUpdateTaskTypeDropdown(id, 1),
        },
        {
          key: "3",
          label: (
            <img
              src={require("../../../images/note.png")}
              alt="note"
              className="dropdown-icon"
            />
          ),
          onClick: () => changeAndUpdateTaskTypeDropdown(id, 2),
        },
        {
          key: "4",
          label: <span>Strike</span>,
          onClick: () => strikeTask(id),
        },
      ]}
    />
  );

  //Task type buttons
  const taskType = (type, id) => {
    if (type === 0) {
      return widthBool ? (
        <Dropdown
          overlay={<MenuTaskTypeDropdown id={id} />}
          trigger={["click"]}
          autoFocus={true}
        >
          <input
            type="image"
            className="strikeBtn"
            alt="event"
            src={require("../../../images/event.png")}
          />
        </Dropdown>
      ) : (
        <input
          type="image"
          className="strikeBtn"
          alt="event"
          onDoubleClick={() => strikeTask(id)}
          src={require("../../../images/event.png")}
          onKeyDown={(e) => changeTaskType(id, e)}
          onBlur={() => {
            updateTaskTypeEvent(type, id);
            onUnselect("strikeBtn", id);
          }}
          onClick={() => onSelect("strikeBtn", id)}
        />
      );
    } else if (type === 1) {
      return widthBool ? (
        <Dropdown
          overlay={<MenuTaskTypeDropdown id={id} />}
          trigger={["click"]}
          autoFocus={true}
        >
          <input
            type="image"
            className="strikeBtn"
            alt="assignments"
            src={require("../../../images/assignment.png")}
          />
        </Dropdown>
      ) : (
        <input
          type="image"
          className="strikeBtn"
          alt="assignments"
          onDoubleClick={() => strikeTask(id)}
          src={require("../../../images/assignment.png")}
          onKeyDown={(e) => changeTaskType(id, e)}
          onBlur={() => {
            updateTaskTypeEvent(type, id);
            onUnselect("strikeBtn", id);
          }}
          onClick={() => onSelect("strikeBtn", id)}
        />
      );
    } else if (type === 2) {
      return widthBool ? (
        <Dropdown
          overlay={<MenuTaskTypeDropdown id={id} />}
          trigger={["click"]}
          autoFocus={true}
        >
          <input
            type="image"
            className="strikeBtn"
            alt="note"
            src={require("../../../images/note.png")}
          />
        </Dropdown>
      ) : (
        <input
          type="image"
          className="strikeBtn"
          alt="note"
          onDoubleClick={() => strikeTask(id)}
          src={require("../../../images/note.png")}
          onKeyDown={(e) => changeTaskType(id, e)}
          onBlur={() => {
            updateTaskTypeEvent(type, id);
            onUnselect("strikeBtn", id);
          }}
          onClick={() => onSelect("strikeBtn", id)}
        />
      );
    }
  };

  //Filter Tasks Show All
  const filterTasksAll = () => {
    var taskRows = document.querySelectorAll(".task");
    for (let i = 0; i < taskRows.length; i++) {
      if (taskRows[i]) {
        taskRows[i].classList.remove("hidden");
      }
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
    const task = tasks.filter((task) => task.id === id)[0];
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
        // eslint-disable-next-line
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
    console.log(taskDeadlineRaw);
    updateTaskDeadlineEvent(taskDeadlineRaw, id);
  };

  //Select field Event:
  const onSelect = (className, id) => {
    const task = document.getElementById(id + "ID");
    const element = task.getElementsByClassName(className)[0];
    element.classList.add("bordered");
  };

  //Unselect field Event:
  const onUnselect = (className, id) => {
    const task = document.getElementById(id + "ID");
    const element = task.getElementsByClassName(className)[0];
    element.classList.remove("bordered");
  };

  //for ipad dropdown menu
  const MenuProgressDropdown = ({ id }) => (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              className={`taskProgress ${
                isColourBlindFilter
                  ? colourBlindProgressColours[0]
                  : progressColours[0]
              }`}
            >
              {progress[0]}
            </div>
          ),
          onClick: () => changeAndUpdateProgressDropdown(0, id),
        },
        {
          key: "2",
          label: (
            <div
              className={`taskProgress ${
                isColourBlindFilter
                  ? colourBlindProgressColours[1]
                  : progressColours[1]
              }`}
            >
              {progress[1]}
            </div>
          ),
          onClick: () => changeAndUpdateProgressDropdown(1, id),
        },
        {
          key: "3",
          label: (
            <div
              className={`taskProgress ${
                isColourBlindFilter
                  ? colourBlindProgressColours[2]
                  : progressColours[2]
              }`}
            >
              {progress[2]}
            </div>
          ),
          onClick: () => changeAndUpdateProgressDropdown(2, id),
        },
      ]}
    />
  );

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr className="tableHeader">
            <th className="strikeBtnHeader"></th>
            <th
              className="taskHeader filterableHeader"
              onClick={
                // eslint-disable-next-line
                filtered == 0
                  ? filterTasksUncompleted
                  : // eslint-disable-next-line
                  filtered == 1
                  ? filterTasksCompleted
                  : filterTasksAll
              }
            >
              <div className="headerContainer">
                <div className="taskHeaderText">Task</div>
                {
                  // eslint-disable-next-line
                  filtered == 1 ? (
                    <EyeOutlined className="filterIcon" />
                  ) : // eslint-disable-next-line
                  filtered == 2 ? (
                    <EyeInvisibleOutlined className="filterIcon" />
                  ) : (
                    <EyeOutlined className="hidden" />
                  )
                }
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
            if (task.parent !== "") {
              if (shownSubtasksState[tasks.indexOf(task)] &&
                !(filtered === 1 && task.striked)) {
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
                  {widthBool ? (
                    <Dropdown
                      overlay={<MenuProgressDropdown id={task.id} />}
                      trigger={["click"]}
                      autoFocus={true}
                    >
                      <div
                        tabIndex="0"
                        className={`taskProgress ${
                          isColourBlindFilter
                            ? colourBlindProgressColours[task.progress]
                            : progressColours[task.progress]
                        }`}
                      >
                        {progress[task.progress]}
                      </div>
                    </Dropdown>
                  ) : (
                    <div
                      tabIndex="0"
                      className={`taskProgress ${
                        isColourBlindFilter
                          ? colourBlindProgressColours[task.progress]
                          : progressColours[task.progress]
                      }`}
                      onFocus={() => onSelect("taskProgress", task.id)}
                      onKeyDown={(e) => changeTaskProgress(task.id, e)}
                      onBlur={() => {
                        updateTaskProgressEvent(task.progress, task.id);
                        onUnselect("taskProgress", task.id);
                      }}
                    >
                      {progress[task.progress]}
                    </div>
                  )}
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
