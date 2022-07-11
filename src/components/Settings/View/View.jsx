import { Switch } from "antd";
import { Fragment } from "react";
import { useColourBlind } from "../../../context/ColourBlindContext";

const View = () => {
  const { toggleColourBlindFilter } = useColourBlind();

  return (
    <Fragment>
      <div style={{ fontSize: "20px" }}>
        Change the colour scheme to best suit your needs!
      </div>
      <hr />
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3 style={{ paddingRight: "1%" }}>
          <strong>Dark Mode</strong>
        </h3>
        <Switch defaultChecked={false} autoFocus={true} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>
          Dark mode to minimise blue light exposure and is easy on the eyes.
        </span>
      </div>
      <br />
      <hr />
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3 style={{ paddingRight: "1%" }}>
          <strong>Colour-blindness Filter</strong>
        </h3>
        <Switch
          defaultChecked={false}
          autoFocus={true}
          onChange={toggleColourBlindFilter}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Make the colours more friendly for our colour-blind users.</span>
        <span>
          View the changes in colours on the Home page with the priority bars
          and on the Monthly page with the progress
        </span>
      </div>
      <br />
      <hr />
    </Fragment>
  );
};

export default View;
