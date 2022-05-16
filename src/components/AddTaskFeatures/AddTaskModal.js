import React, { Fragment } from "react";
import "./AddTaskModal.css";
import ReactDOM from "react-dom";
import PopUpCard from "../AssistantFeatures/PopUpCard/PopUpCard";
import Backdrop from "../AssistantFeatures/Backdrop/Backdrop";
import { CloseOutlined } from "@ant-design/icons";

const AddTaskCard = (props) => {
  return (
    <PopUpCard className="addTask-popup">
      <header className="addTask-header">
        <h2>Bullet Your Goals</h2>
        <CloseOutlined
          onClick={props.onCloseAddTaskPopUp}
          className="closemodal"
        />
      </header>
      <hr />
    </PopUpCard>
  );
};

const AddTaskModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onPopUpVisible} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <AddTaskCard onCloseAddTaskPopUp={props.onPopUpVisible} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default AddTaskModal;
