import { Collapse } from "antd";
import React, { Fragment } from "react";

const { Panel } = Collapse;

const Philosophy = () => {
  return (
    <Fragment>
      <h2>
        Philosophy is where we share more about the principles that govern
        STRIKER.
      </h2>
      <hr />
      <br />
      <Collapse>
        <Panel header="Motivation" key="1">
          <p>
            STRIKER is a todo list application grounded in the principles of
            simplicity and intentionality. Inspired by the concept of bullet
            journaling by Ryder Carroll, we hope to bring to life a virtual,
            purposeful, analytically-driven task manager. Our hope is to create
            an application that is simple to use, while providing as much useful
            insights and functionality to our users to boost their day-to-day
            productivity.
          </p>
        </Panel>
        <Panel header="Rationale" key="2">
          <p>
            The rationale for wanting to build such an application is the
            surplus of unstructured task manager applications with excessive
            flexibility and superfluous customisations. These are all too
            confusing and intimidating to new users and people who simply wish
            to use an online task manager. As such, we hope STRIKER will bridge
            this gap, by providing the much needed structure and simplicity.
          </p>
        </Panel>
        <Panel header="Summary" key="3">
          <p>
            The structure of STRIKER is simple - tasks are categorised into 3
            levels of priority - high, medium and low. Strike through each task
            once completed. The intentionality lies not only in planning the
            to-dos for the day but also in short bullet points. This allows
            users to pen down only the essentials and strip away the
            unnecessary. When users write excessively, it might seem like there
            is so much to accomplish. They become swamped and are overly busy.
            STRIKER aims to help users become more productive and weed out such
            distractions by being mindful and by prioritising what is important.
          </p>
        </Panel>
      </Collapse>
    </Fragment>
  );
};

export default Philosophy;
