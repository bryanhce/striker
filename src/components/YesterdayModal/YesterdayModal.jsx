import React, { Fragment, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";
import CloseModal from "../ModalFeatures/CloseModal/CloseModal";
import PopUpCard from "../ModalFeatures/PopUpCard/PopUpCard";
import Backdrop from "../ModalFeatures/Backdrop/Backdrop";
import "./YesterdayModal.css";
import { List, notification } from "antd";
import { useEffect } from "react";
import DailyTasklist from "../../pages/DailyTasklist/DailyTasklist";

//replace this with get api
const data = [
  {
    id: 1,
    type: 0,
    description: "Cut hair",
    isCompleted: false,
    effort: 10,
    priority: 1,
  },
  {
    id: 2,
    type: 2,
    description: "Read 3 chapters of Sapiens",
    isCompleted: false,
    effort: 25,
    priority: 0,
  },
  {
    id: 3,
    type: 1,
    description:
      "super super super super super super super super super super long task",
    isCompleted: false,
    effort: 50,
    priority: 2,
  },
  {
    id: 4,
    type: 1,
    description: "Should not be rendered",
    isCompleted: true,
    effort: 0,
    priority: 0,
  },
];

const YesterdayCard = (props) => {
  const [yesterdayTasks, setYesterdayTasks] = useState(
    data.filter((x) => !x.isCompleted)
  );

  const successNotification = () => {
    notification["success"]({
      message: "Transfer Successful!",
      description: "Task sent to today's daily log",
      duration: 4.0,
    });
  };

  const transferTaskHandler = (id) => {
    //do a put api here
    setYesterdayTasks(yesterdayTasks.filter((t) => t.id !== id));
    successNotification();
  };

  //does not only run when state changes but on mount as well
  useEffect(() => {
    if (yesterdayTasks.length === 0) {
      props.closeYesterdayModal();
    }
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
    <PopUpCard className="yesterday-popup">
      <header style={{ display: "flex", flexDirection: "row" }}>
        <h2 style={{ paddingTop: "3%" }}>
          <strong>Yesterday's Uncompleted Tasks</strong>
        </h2>
        <CloseModal
          className="yesterday-close-modal"
          onClick={props.closeYesterdayModal}
        />
      </header>
      <hr />
      <List
        style={{ width: "80%" }}
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
              onClickCapture={() => transferTaskHandler(task.id)}
            />
          </List.Item>
        )}
      />
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
        <YesterdayCard closeYesterdayModal={props.closeYesterdayModal} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default YesterdayModal;
