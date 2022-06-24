import React from 'react';
import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined, DeleteOutlined, CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

function TableDaily({ tasks, strikeTask, deleteTask, filterPriority, filterEffort, filters, updateTaskText, updateTaskEffort, changeTaskType, changeTaskPriority }) {
    //State for shown and hidden tasks (0 is show all, 1 is uncompleted tasks, 2 is completed tasks)
    const [filtered, setFiltered] = useState([
        0
    ])
    
    const onlyNumbers = (e) => {
        if (e.shiftKey) {
            e.preventDefault();
        }
        if (e.keyCode === 8 || e.keyCode === 46
            || e.keyCode === 37 || e.keyCode === 39) {
            return true;
        } else if ( e.keyCode < 48 || e.keyCode > 57 ) {
            e.preventDefault();
        }
    }

    const priorities = ["green", "yellow", "red"];

    //Task type buttons
    const taskType = (type, id) => {
        if (type == 0) {
            return <input type="image" className="strikeBtn" onDoubleClick={() => strikeTask(id)} src={require("../../../images/event.png")} onKeyDown={(e) => changeTaskType(id, e)} />
        } else if (type == 1) {
            return <input type="image" className="strikeBtn" onDoubleClick={() => strikeTask(id)} src={require("../../../images/assignment.png")} onKeyDown={(e) => changeTaskType(id, e)} />
        } else if (type == 2) {
            return <input type="image" className="strikeBtn" onDoubleClick={() => strikeTask(id)} src={require("../../../images/note.png")} onKeyDown={(e) => changeTaskType(id, e)} />
        }
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
    }

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
    }

    return (
        <div className="tableContainer">
            <table>
                <tr className="tableHeader">
                    <th className="strikeBtnHeader"></th>
                    <th className="taskHeader filterableHeader" onClick={filtered == 0 ? filterTasksUncompleted : (filtered == 1 ? filterTasksCompleted : filterTasksAll)}>
                        <div className="headerContainer">
                            <div>Task</div>
                            {filtered == 1 ? <EyeOutlined className="filterIcon" /> : (filtered == 2 ? <EyeInvisibleOutlined className="filterIcon" /> : <EyeOutlined className="hidden" />)}
                        </div>
                    </th>
                    <th className="priorityHeader filterableHeader" onClick={filterPriority}>
                        <div className="headerContainer">
                            <div className="priorityHeaderText">Priority</div>
                            {filters[0][1] > 0
                                    ? <CaretDownOutlined className={filters[0][0] !== 0 ? "filterIcon" : "filterIcon hidden"} />
                                    : <CaretUpOutlined className={filters[0][0] !== 0 ? "filterIcon" : "filterIcon hidden"}/>}
                        </div>
                    </th>
                    <th className="effortHeader filterableHeader" onClick={filterEffort}>
                        <div className="headerContainer">
                            <div className="effortHeaderText">Effort</div>
                            {filters[1][1] > 0
                                    ? <CaretDownOutlined className={filters[1][0] !== 0 ? "filterIcon" : "filterIcon hidden"} />
                                    : <CaretUpOutlined className={filters[1][0] !== 0 ? "filterIcon" : "filterIcon hidden"}/>}
                        </div>
                    </th>
                    <th className="deleteBtnHeader"></th>
                </tr>
                {tasks.map((task) => {
                    return <tr key={task.id} className={task.striked ? "task striked" : "task"} id={task.id + "ID"}>
                        <td className="btnContainer">
                            {taskType(task.type, task.id)}
                        </td>
                        <td>
                            <div className={"taskText " + task.id + "text"} contentEditable="true" onBlur={() => updateTaskText(task.id)}>{task.text}</div>
                        </td>
                        <td className="priorityContainer">
                            <div tabindex="0" className={"row_info priority " + priorities[task.priority]} onKeyDown={(e) => changeTaskPriority(task.id, e)}></div>
                        </td>
                        <td>
                            <div className={"taskEffort " + task.id + "effort"} contentEditable="true" onKeyDown={onlyNumbers} onBlur={() => updateTaskEffort(task.id)}>{task.effort}</div>
                        </td>
                        <td className="btnContainer">
                            <DeleteOutlined className="deleteTask" onClick={() => deleteTask(task.id)} />
                        </td>
                    </tr>
                })}
            </table>
        </div>
    )
}

export default TableDaily
