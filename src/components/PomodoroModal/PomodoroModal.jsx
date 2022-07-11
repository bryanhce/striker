import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import CloseModal from "../ModalFeatures/CloseModal/CloseModal";
import PopUpCard from "../ModalFeatures/PopUpCard/PopUpCard";
import Backdrop from "../ModalFeatures/Backdrop/Backdrop";
import Timer from "./Timer/Timer";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const PomodoroCard = (props) => {
  return (
    <PopUpCard>
      <header style={{ display: "flex", flexDirection: "row" }}>
        <h2 style={{ paddingTop: "3%" }}>
          <strong>Pomodoro Timer</strong>
        </h2>
        <CloseModal
          className="yesterday-close-modal"
          onClick={props.togglePomo}
        />
      </header>
      <hr style={{ width: "60%", marginTop: "0" }} />
      <div>
        <Tabs tabPosition="bottom" defaultActiveKey="1">
          <TabPane tab="Pomodoro" key="1">
            <Timer time={1500000} desc={"Pomodoro"} />
            {/* <Timer time={5000} desc={"Pomodoro"} /> */}
          </TabPane>
          <TabPane tab="Short Break" key="2">
            <Timer time={300000} desc={"Pomodoro"} />
          </TabPane>
          <TabPane tab="Long Break" key="3">
            <Timer time={900000} desc={"Pomodoro"} />
          </TabPane>
        </Tabs>
      </div>
    </PopUpCard>
  );
};

const PomodoroModal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.togglePomo} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <PomodoroCard togglePomo={props.togglePomo} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default PomodoroModal;
