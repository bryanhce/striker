import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
  return <div className="backdrop-general" onClick={props.onClick} />;
};

export default Backdrop;
