import React from "react";
import { useState } from "react";
import { Dropdown, notification, Menu } from "antd";
import { usePomodoro } from "../../../context/PomodoroContext";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useColourBlind } from "../../../context/ColourBlindContext";

function TableDaily({
  tasks,
  strikeTask,
  deleteTask,
  filterPriority,
  filterEffort,
  filters,
  updateTaskEffortState,
  updateTaskTextState,
  changeTaskType,
  changeTaskPriority,
  updateTaskTypeEvent,
  updateTaskTextEvent,
  updateTaskPriorityEvent,
  updateTaskEffortEvent,
  togglePomo,
  changeAndUpdateTaskTypeDropdown,
  changeAndUpdateTaskPriorityDropdown,
}) {
  //State for shown and hidden tasks (0 is show all, 1 is uncompleted tasks, 2 is completed tasks)
  const [filtered, setFiltered] = useState([0]);

  //Sends Error
  const error = (message) => {
    notification["error"]({
      message: message,
    });
  };

  const onlyNumbers = (e) => {
    if (!(e.keyCode === 8 ||
        e.keyCode === 46 ||
        e.keyCode === 37 ||
        e.keyCode === 39 ||
        (e.keyCode >= 48 && e.keyCode <= 57) ||
        e.keyCode === 9 ||
        e.key === "Shift")) {
      error("Only input numbers into the Effort field!");
      e.preventDefault();
    } else {
      return true;
    }
  };

  const priorities = ["green", "yellow", "red"];
  const colourBlindPriorities = ["cb-green", "cb-yellow", "cb-red"];

  //colourblindness check
  const { isColourBlindFilter } = useColourBlind();

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

  //for ipad usage
  let widthBool = window.innerWidth <= 1366;

  //for ipad dropdown menu
  const MenuTaskDropdown = ({ id }) => (
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
          overlay={<MenuTaskDropdown id={id} />}
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
          overlay={<MenuTaskDropdown id={id} />}
          trigger={["click"]}
          autoFocus={true}
        >
          <input
            type="image"
            className="strikeBtn"
            alt="event"
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
          overlay={<MenuTaskDropdown id={id} />}
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
            updateTaskTypeEvent(0, id);
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

  //dropdown for priority
  const MenuPriorityDropdown = ({ id }) => (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <div
              className={`row_info priority ${
                isColourBlindFilter ? colourBlindPriorities[0] : priorities[0]
              }`}
            ></div>
          ),
          onClick: () => changeAndUpdateTaskPriorityDropdown(0, id),
        },
        {
          key: "2",
          label: (
            <div
              className={`row_info priority ${
                isColourBlindFilter ? colourBlindPriorities[1] : priorities[1]
              }`}
            ></div>
          ),
          onClick: () => changeAndUpdateTaskPriorityDropdown(1, id),
        },
        {
          key: "3",
          label: (
            <div
              className={`row_info priority ${
                isColourBlindFilter ? colourBlindPriorities[2] : priorities[2]
              }`}
            ></div>
          ),
          onClick: () => changeAndUpdateTaskPriorityDropdown(2, id),
        },
      ]}
    />
  );

  //useContext for rendering pomdoro
  const { isPomoButtonVisible } = usePomodoro();

  return (
    <div className="tableContainer">
      <table>
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
              <div>Task</div>
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
            className="priorityHeader filterableHeader"
            onClick={filterPriority}
          >
            <div className="headerContainer">
              <div className="priorityHeaderText">Priority</div>
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
          <th className="effortHeader filterableHeader" onClick={filterEffort}>
            <div className="headerContainer">
              <div className="effortHeaderText">Effort</div>
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
          {isPomoButtonVisible && <th className="clockHeader"></th>}
          <th className="deleteBtnHeader"></th>
        </tr>
        {tasks.map((task) => {
          return (
            <tr
              key={tasks.indexOf(task)}
              className={task.striked ? "task striked" : "task"}
              id={task.id + "ID"}
            >
              <td className="btnContainer">{taskType(task.type, task.id)}</td>
              <td>
                <div
                  className={"taskText " + task.id + "text"}
                  contentEditable="true"
                  onBlur={() => updateTaskTextState(task.id)}
                  onKeyDown={(e) => e.key === "Enter" ? e.preventDefault : e}
                >
                  {task.text}
                </div>
              </td>
              <td className="priorityContainer">
                {widthBool ? (
                  <Dropdown
                    overlay={<MenuPriorityDropdown id={task.id} />}
                    trigger={["click"]}
                    autoFocus={true}
                  >
                    <div
                      tabIndex="0"
                      className={`row_info priority ${
                        isColourBlindFilter
                          ? colourBlindPriorities[task.priority]
                          : priorities[task.priority]
                      }`}
                    ></div>
                  </Dropdown>
                ) : (
                  <div
                    tabIndex="0"
                    className={`row_info priority ${
                      isColourBlindFilter
                        ? colourBlindPriorities[task.priority]
                        : priorities[task.priority]
                    }`}
                    onKeyDown={(e) => changeTaskPriority(task.id, e)}
                    onBlur={() => {
                      updateTaskPriorityEvent(task.priority, task.id);
                      onUnselect("priority", task.id);
                    }}
                    onFocus={() => onSelect("priority", task.id)}
                  ></div>
                )}
              </td>
              <td>
                <div
                  className={"taskEffort " + task.id + "effort"}
                  contentEditable="true"
                  onKeyDown={onlyNumbers}
                  onFocus={() => onSelect("taskEffort", task.id)}
                  onBlur={() => {
                    updateTaskEffortState(task.id);
                    onUnselect("taskEffort", task.id);
                  }}
                >
                  {task.effort}
                </div>
              </td>
              {isPomoButtonVisible && (
                <td>
                  <ClockCircleOutlined onClick={() => togglePomo()} />
                </td>
              )}
              <td className="btnContainer">
                <DeleteOutlined
                  className="deleteTask"
                  onClick={() => deleteTask(task.id)}
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default TableDaily;
