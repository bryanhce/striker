import React from 'react';
import { useState } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

export const SideMenu = ({ monthlyTasks, transferTask }) => {

    const taskTypes = [
        <img className="sideMenuTaskType" src={require("../../../images/event.png")} />,
        <img className="sideMenuTaskType" src={require("../../../images/assignment.png")} />,
        <img className="sideMenuTaskType" src={require("../../../images/note.png")} />
    ]

    const taskProgresses = [
        "Haven't Started",
        "In Progress",
        "Completed"
    ]

    const taskProgressClassNames = ["red", "yellow", "green"];

    //Side Menu Button Event:
    const sideMenuButtonEvent = () => {
        const sideMenuElement = document.getElementsByClassName("sideMenuBodyContainer")[0];
        if (sideMenu) {
            sideMenuElement.classList.remove("sideMenuShown");
            sideMenuElement.classList.add("sideMenuHidden");
        } else {
            sideMenuElement.classList.remove("sideMenuHidden");
            sideMenuElement.classList.add("sideMenuShown")
        }
        setSideMenu(!sideMenu);
    }

    //State for Side Menu:
    const [sideMenu, setSideMenu] = useState([false]);

    console.log("SIDE MENU TASKS:");
    console.log(monthlyTasks);

    return (
        <div className="sideMenuContainer">
            <button type="button" className="sideMenuButton" onClick={sideMenuButtonEvent}>
                {!sideMenu ? <LeftOutlined className="sideMenuButtonIcon" /> : <RightOutlined className="sideMenuButtonIcon" />}
            </button>
            <div className="sideMenuBodyContainer sideMenuShown">
                <h1 className="sideMenuBodyHeader">JULY</h1>
                <div className="sideMenuBodyTasksContainer">
                    {monthlyTasks.map((task) => {
                        if (task.progress !== 2) {
                            return <div className="sideMenuTaskContainer" id={task.id + "SideMenuTask"} onDoubleClick={() => transferTask(task.id, task.text, task.type)}>
                                <div className="sideMenuTaskTopContainer">
                                    {taskTypes[task.type]}
                                    <h2 className="sideMenuTaskText">{task.text}</h2>
                                </div>
                                <div className="sideMenuTaskBottomContainer">
                                    <h2 className="sideMenuTaskDeadline">{task.deadline}</h2>
                                    <h2 className={"sideMenuTaskProgress " + taskProgressClassNames[task.progress]}>{taskProgresses[task.progress]}</h2>
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
