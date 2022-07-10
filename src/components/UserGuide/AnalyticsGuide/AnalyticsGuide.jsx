import { Collapse } from "antd";
import React, { Fragment } from "react";

const { Panel } = Collapse;

const AnalyticsGuide = () => {
  return (
    <Fragment>
      <h2>Analytics Page is a dashboard to review your productivity.</h2>
      <hr />
      <br />
      <h3>Features</h3>
      <Collapse>
        <Panel header="Productivity/ Effort Rate" key="1">
          <p>
            This refers to the percentage of effort of completed task against
            effort of all tasks.
          </p>
        </Panel>
        <Panel header="Completion Rate" key="2">
          <p>
            This refers to the percentage of completed task against all tasks.
          </p>
        </Panel>
      </Collapse>
    </Fragment>
  );
};

export default AnalyticsGuide;
