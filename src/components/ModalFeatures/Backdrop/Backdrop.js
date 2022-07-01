import React from "react";
import "./Backdrop.css";

const Backdrop = (props) => {
  return <div className="modal-backdrop" onClick={props.onClick} />;
};

export default Backdrop;
