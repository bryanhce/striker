import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import "./CloseModal.css";

const CloseModal = (props) => {
  return (
    <div className={`modal-close ${props.className}`} onClick={props.onClick}>
      <CloseOutlined />
    </div>
  );
};

export default CloseModal;
