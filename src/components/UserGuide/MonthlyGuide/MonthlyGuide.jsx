import { Collapse } from "antd";
import React, { Fragment } from "react";

const { Panel } = Collapse;

const MonthlyGuide = () => {
  return (
    <Fragment>
      <h2>Monthly Page is where your tasks for the month are presented.</h2>
      <hr />
      <br />
      <h3>Features</h3>
      <Collapse>
        <Panel header="Add Task" key="1">
          <p>
            Click on the plus icon that is encapsulated in the circle above the
            progress bar. An empty task should appear with no text, no deadline
            priority and Haven't Started progress status.
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
              <strong>Edit Deadline</strong> - Click on the date under the
              deadline column and click on the date via the popup that
              corresponds to the deadline for the task.
            </li>
            <li>
              <strong>Edit Progress</strong> - Click on the coloured text under
              the progress column and use the up/down arrow keys to cycle
              through the different progress statuses.
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
        <Panel header="Add Subtask" key="5">
          <p>
            Click on the plus icon encapsulated within a sqaure. An empty
            indented task should appear with no text, no deadline priority and
            Haven't Started progress status.
          </p>
        </Panel>
        <Panel header="View Subtask" key="6">
          <p>
            Click on the right-pointing arrow which reveal the subtask of that
            parent task in a dropdown. To hide the subtasks, click on that same
            arrow.
          </p>
        </Panel>
      </Collapse>
    </Fragment>
  );
};

export default MonthlyGuide;
