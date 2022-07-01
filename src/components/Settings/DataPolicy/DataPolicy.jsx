import { Fragment } from "react";

const DataPolicy = () => {
  return (
    <Fragment>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ paddingRight: "1%" }}>
          <strong>Data Policy</strong>
        </h3>
        <span>
          We at Head in the Clouds take your data privacy very seriously. Here
          are some of the measures we have taken to ensure your data protection.
        </span>
        <ul>
          <li>
            All data is kept exclusively with Head in the Clouds. No user data
            is shared with advertising companies.
          </li>
          <li>
            Head in the Clouds only store data that is necessary to deliver the
            best experience on Striker.
          </li>
          <li>
            Head in the Clouds disposes of any data that is no longer needed.
          </li>
          <li>
            Head in the Clouds is transparent with the data we collect and their
            usages.
          </li>
          <li>Email data is collected for to send reminder emails.</li>
          <li>Task data is collected to render task on task list.</li>
          <li>
            Last login data is collected to render notifications upon first
            login for the day.
          </li>
          <li>
            Moving forward, we intend to abide by all Personal Data Protect Act
            (PDPA) laws.
          </li>
        </ul>
      </div>
      <hr />
      <br />
    </Fragment>
  );
};

export default DataPolicy;
