import React, { useState } from "react";
import "./TaskList.css";
import { Button, List, Divider, Progress } from "antd";
import StrikerLayout from "../StrikerLayout/StrikerLayout";
import AddTaskModal from "../../components/AddTaskFeatures/AddTaskModal";

const data = [
  "Complete cs2030s lab8.",
  "Wish Bryan happy brithday.",
  "Medical appointment at 530pm.",
  "Read 3 chapters of Data Structures and Alogirthm.",
  "Run 5km.",
];

const TaskList = () => {
  const [isPopUpVisible, setPopUpVisible] = useState(false);

  const onPopUpVisible = () => {
    setPopUpVisible(!isPopUpVisible);
  };

  return (
    <StrikerLayout>
      <div>
        <Button
          type="primary"
          onClick={onPopUpVisible}
          style={{
            marginBottom: 16,
          }}
        >
          Add a task
        </Button>
        <Button
          type="primary"
          style={{
            marginBottom: 16,
            marginLeft: 10,
          }}
        >
          Filter tasks
        </Button>
        {isPopUpVisible && <AddTaskModal onPopUpVisible={onPopUpVisible} />}
        <Divider orientation="left">MONDAY</Divider>
        <List
          size="large"
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        <br />
        <Progress percent={50} status="active" />
      </div>
    </StrikerLayout>
  );
};

export default TaskList;
