import React from 'react';
import { PlusCircleOutlined } from "@ant-design/icons";

function AddTask({ addTask }) {
    return (
        <div className="addTaskContainer">
            <PlusCircleOutlined className="addTask" onClick={addTask}/>
        </div>
    )
}

export default AddTask
