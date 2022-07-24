import React, { Fragment, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";
import CloseModal from "../ModalFeatures/CloseModal/CloseModal";
import PopUpCard from "../ModalFeatures/PopUpCard/PopUpCard";
import Backdrop from "../ModalFeatures/Backdrop/Backdrop";
import "./YesterdayModal.css";
import { List, notification } from "antd";
import { useEffect } from "react";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";

//kept for testing purposes
// const data = [
//   {
//     id: 1,
//     type: 0,
//     description: "Cut hair",
//     isCompleted: false,
//     effort: 10,
//     priority: 1,
//   },
//   {
//     id: 2,
//     type: 2,
//     description: "Read 3 chapters of Sapiens",
//     isCompleted: false,
//     effort: 25,
//     priority: 0,
//   },
//   {
//     id: 3,
//     type: 1,
//     description:
//       "super super super super super super super super super super long task",
//     isCompleted: false,
//     effort: 50,
//     priority: 2,
//   },
// ];

const YesterdayCard = (props) => {
  const [yesterdayTasks, setYesterdayTasks] = useState([]);

  let yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayDateString =
    yesterdayDate.getFullYear() +
    "-" +
    String(yesterdayDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(yesterdayDate.getDate()).padStart(2, "0");

  let realToday = new Date();
  const realTodayString =
    realToday.getFullYear() +
    "-" +
    String(realToday.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(realToday.getDate()).padStart(2, "0");

  const userId = JSON.parse(localStorage.getItem("currentUser")).uid;

  useEffect(() => {
    //sets state for yesterdayTasks and closes modal if no yesterday task
    const checkYesterdayTasks = () => {
      fetch(
        `https://striker-backend.herokuapp.com/task-list/${userId}?date=${yesterdayDateString}`
      )
        .then((response) => response.json())
        .then((data) =>
          data.filter((task) => !task.deadline.Valid && !task.isCompleted.Bool)
        )
        .then((YesterdayData) =>
          YesterdayData.map((task) => {
            return {
              id: task.id,
              type: task.taskType,
              description: task.description,
              priority: task.priority.Int64,
              effort: task.effort.Int64,
              isCompleted: task.isCompleted.Bool,
            };
          })
        )
        .then((filteredData) => setYesterdayTasks(filteredData))
        .then((d) => (d.length === 0 ? props.closeYesterdayModal() : null))
        .catch((err) => {
          console.log(err);
          //not best practice but when error because of null in yesterdayTasks
          //state and cannot use filter method, then close modal
          props.closeYesterdayModal();
        });
    };

    checkYesterdayTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successNotification = (desc) => {
    notification["success"]({
      message: "Transfer Successful!",
      description: desc + " sent to today's daily log",
      duration: 4.0,
    });
  };

  const errorNotification = () => {
    notification["error"]({
      message: "Transfer to daily log failed, please try again",
    });
  };

  //create new task for today from yesterday task
  const transferTaskHandler = (task) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: uuidv4(),
        taskType: task.type,
        description: task.description,
        isCompleted: false,
        effort: task.effort,
        priority: task.priority,
        userId: userId,
        hasChildren: false,
      }),
    };
    fetch(
      `https://striker-backend.herokuapp.com/task-list/single-task?date=${realTodayString}`,
      requestOptions
    )
      .then((response) => {
        console.log(response.json());
        //shows user transfer is successful
        successNotification(task.description);
        //change display on FE for yesterdayTasks
        setYesterdayTasks(yesterdayTasks.filter((t) => t.id !== task.id));
        //reloads the background daily task page
        props.GetDailyTasks();
      })
      .catch((err) => {
        console.log("create today task err " + err);
        errorNotification();
      });
  };

  //runs only after second render
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (yesterdayTasks.length === 0) {
      props.closeYesterdayModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yesterdayTasks]);

  const priorityConverter = (p) => {
    if (p === 0) {
      return "Low";
    } else if (p === 1) {
      return "Medium";
    } else {
      return "High";
    }
  };

  const typeConverter = (t) => {
    if (t === 0) {
      return "Assignment";
    } else if (t === 1) {
      return "Event";
    } else {
      return "Note";
    }
  };

  return (
    <PopUpCard>
      <header style={{ display: "flex", flexDirection: "row" }}>
        <h2 style={{ paddingTop: "3%" }}>
          <strong>Yesterday's Uncompleted Tasks</strong>
        </h2>
        <CloseModal onClick={props.closeYesterdayModal} />
      </header>
      <hr className="popup-hr" />
      <List
        style={{ width: "80%", overflow: "scroll" }}
        dataSource={yesterdayTasks}
        bordered={true}
        renderItem={(task) => (
          <List.Item
            key={task.id}
            className={`yesterday-tasklist ${
              task.priority === 0
                ? "low-green"
                : task.priority === 1
                ? "med-orange"
                : "high-red"
            }`}
          >
            <List.Item.Meta
              title={
                <div style={{ fontSize: "2.2vh" }}>{task.description}</div>
              }
              description={
                <div>
                  Effort - {task.effort} || Priority -{" "}
                  {priorityConverter(task.priority)} || Type -{" "}
                  {typeConverter(task.type)}
                </div>
              }
            />
            <SendOutlined
              style={{ cursor: "pointer" }}
              onClickCapture={() => transferTaskHandler(task)}
            />
          </List.Item>
        )}
      />
      <br />
      <br />
    </PopUpCard>
  );
};

const YesterdayModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.closeYesterdayModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <YesterdayCard
          closeYesterdayModal={props.closeYesterdayModal}
          GetDailyTasks={props.GetDailyTasks}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default YesterdayModal;
