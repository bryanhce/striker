import React from "react";
import { Progress } from "antd";

function ProgressBar({ tasks }) {
  let completedTask = tasks.reduce((x, y) => (y.striked ? x + 1 : x), 0);
  let totalTask = tasks.reduce((x, y) => x + 1, 0);

  return (
    <div className="progressContainer">
      <Progress
        id="tasksCompletionBar"
        percent={(completedTask / totalTask) * 100}
        status={completedTask === totalTask ? "success" : "active"}
        showInfo={false}
        strokeWidth={12}
      />
      <div className="progressTextContainer">
        <div className="progressRate">
          {completedTask} / {totalTask}
        </div>
        <div className="progressText">Completed</div>
      </div>
    </div>
  );
}

export default ProgressBar;
