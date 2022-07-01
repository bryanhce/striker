import { Switch } from "antd";
import { Fragment } from "react";

const Pluggin = () => {
  return (
    <Fragment>
      <div style={{ fontSize: "20px" }}>
        Striker provides productivity frameworks for users like yourself to toy
        around with and see which works best you for!
      </div>
      <hr />
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3 style={{ paddingRight: "1%" }}>
          <strong>1-3-5</strong>
        </h3>
        <Switch defaultChecked={false} autoFocus={true} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ textDecoration: "underline" }}>Philosophy</h3>
        <span>
          1-3-5 is a productivity framework provides a guideline to allocate
          tasks for the day.
        </span>
        <span>
          This entails 1 high effort task, 3 moderate effort tasks and 5 low
          effort tasks.
        </span>
        <span>
          This framework ensures that you energy is spread out evenly throughout
          the day and that heavy deliverables are done while simple everyday
          tasks are not forgotten.
        </span>
      </div>
      <br />
      <hr />
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3 style={{ paddingRight: "1%" }}>
          <strong>Eisenhower Matrix</strong>
        </h3>
        <Switch defaultChecked={false} autoFocus={true} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ textDecoration: "underline" }}>Philosophy</h3>
        <span>
          Eisenhower Matrix is a productivity framework that focuses on
          prioritisation to improve time management.
        </span>
        <span>
          Tasks are prioritised by urgency and importance. Organise a task into
          1 of these 4 categories:
        </span>
        <ul>
          <li>Urgent and important</li>
          <li>Important but not urgent</li>
          <li>Urgent but not important</li>
          <li>Neither urgent nor important</li>
        </ul>
        <span>
          Through this type of filtering and funneling process, you are
          intentionally allocating time to things that are pressing and crucial
          while staving off procrastination of these tasks.
        </span>
      </div>
      <br />
      <hr />
    </Fragment>
  );
};

export default Pluggin;
