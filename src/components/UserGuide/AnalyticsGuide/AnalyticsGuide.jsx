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
        <Panel header="Weighted Completion Rate" key="1">
          <p>
            This refers to the percentage of effort of completed task against
            effort of all tasks. We like to think of this as the productivity or
            effort rate.
          </p>
        </Panel>
        <Panel header="Completion Rate" key="2">
          <p>
            This refers to the percentage of completed task against all tasks.
          </p>
        </Panel>
        <Panel header="Graphs" key="3">
          <p>
            The graphs at the lower half of the page show the monthly breakdown
            of the weight competion rate and competion rate for the last 6
            months. The absence of a bar would indicate that there was no tasks
            completed during at month. Unfortunately, we are only rendering the
            analytics of the last 6 months. In the future, we will provide more
            flexibility to view productivity across your STRIKER lifetime.
          </p>
        </Panel>
      </Collapse>
    </Fragment>
  );
};

export default AnalyticsGuide;
