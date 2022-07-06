import { Collapse } from "antd";
import React, { Fragment } from "react";

const { Panel } = Collapse;

const HomeGuide = () => {
  return (
    <Fragment>
      <h2>Home Page is where your daily tasks are presented.</h2>
      <hr />
      <br />
      <h3>Features</h3>
      <Collapse>
        <Panel header="Add Task" key="1">
          <p>
            Click on the plus icon that is encapsulated in the circle above the
            progress bar. An empty task should appear with no text, green
            priority and 0 effort.
          </p>
        </Panel>
        <Panel header="Edit Task" key="2">
          <ul>
            <li>
              <strong>Edit Task Type</strong> - Click on the icon on the most
              left of the task (task type icon) and use up/ down arrow keys to
              cycle through the different task types. Circle represents
              assignment, square for event and dash for note.
            </li>
            <li>
              <strong>Edit Description</strong> - Click on the white space under
              the Task column and type in the task description.
            </li>
            <li>
              <strong>Edit Priority</strong> - Click on the coloured bar under
              the priority column and use the up/down arrow keys to cycle
              through the different priorities. Green represents low priority,
              orange for medium priority and red for high priority.
            </li>
            <li>
              <strong>Edit Effort</strong> - Click on the number 0 under the
              effort column and type in the effort value for that task. Note
              that you will not be able to type letters in this field.
            </li>
          </ul>
        </Panel>
        <Panel header="Strike Off Task" key="3">
          <p>
            Double click on the icon on the most left of the task (task type
            icon) to mark the task as completed.
          </p>
        </Panel>
        <Panel header="Delete Task" key="4">
          <p>
            Click on the dustbin icon on the most right of the task to delete
            the task. This action is irreversible. Do use with caution.{" "}
          </p>
        </Panel>
        <Panel header="Transfer Monthly Task to Today" key="5">
          <p>
            Click on the slider arrow on the most right of the home page to view
            your Monthly tasks. Double click on the task you wish to add it to
            the daily task list.
          </p>
        </Panel>
        <Panel header="Transfer Yesterday's Task to Today" key="6">
          <p>
            This popup shows the uncompleted task from yesterday. This pop up
            only renders the first time you login for the day and if you have
            existing uncompleted tasks from the previous day. Click on the send
            button on the right most of the task to transfer yesterday's task to
            today's task list.
          </p>
        </Panel>
      </Collapse>
    </Fragment>
  );
};

export default HomeGuide;
