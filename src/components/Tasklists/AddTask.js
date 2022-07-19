import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

function AddTask({ addTask }) {
  let width = window.innerWidth;

  return (
    <div className="addTaskContainer">
      <PlusCircleOutlined
        className="addTask"
        onClick={addTask}
        style={{ fontSize: width <= 1024 && "5vh" }}
      />
    </div>
  );
}

export default AddTask;
