import { Collapse } from "antd";
import React, { Fragment } from "react";

const { Panel } = Collapse;

const CalendarGuide = () => {
  return (
    <Fragment>
      <h2>
        Calendar Page is where you can view all your tasks - past, present and
        future.
      </h2>
      <hr />
      <br />
      <h3>Features</h3>
      <Collapse>
        <Panel header="Add Task for the Future" key="1">
          <p>
            Click on the future date that you would like to pen down tasks for.
            You will be redirected to the daily task list page for that specific
            day.
          </p>
        </Panel>
        <Panel header="View Tasks of the Past" key="2">
          <p>
            Click on the past date that you would like to view tasks for. You
            will be redirected to the daily task list page for that specific
            day.
          </p>
        </Panel>
        <Panel
          header="Quick Access to Yesterday and Tomorrow's Task List"
          key="3"
        >
          <p>
            Click on the dates in the menu column on the left. The date at the
            top will bring you to the daily task list page for the next day. The
            second date from the top renders the task list of today and the
            third date renders the task list of yesterday.
          </p>
        </Panel>
        <Panel header="Move Task" key="4">
          <p>
            Click on the task you wish to move from one date to another date.
            Drag and drop it to the date of your choice.
          </p>
        </Panel>
      </Collapse>
    </Fragment>
  );
};

export default CalendarGuide;
