import { Modal, Button } from "antd";

const OneThreeFiveModal = (props) => {
  return (
    <Modal
      title="1-3-5 Condition Violated"
      visible={props.is135ErrorVisible}
      centered={true}
      closable={false}
      footer={
        <Button onClick={() => props.set135ErrorVisible(false)} type="primary">
          Ok
        </Button>
      }
    >
      <p>Please ensure that the following conditions are met:</p>
      <ul>
        <li>
          There are only <strong>9 tasks</strong> in today's task list.
        </li>
        <li>
          There is only <strong>1 high/ red</strong> priority task.
        </li>
        <li>
          There are only <strong>3 medium/ orange</strong> priority tasks.
        </li>
        <li>
          There are only <strong>5 low/ green</strong> priority tasks.
        </li>
      </ul>
    </Modal>
  );
};

export default OneThreeFiveModal;
