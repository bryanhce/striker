import { Switch, Space, Button, notification } from "antd";
import { Fragment, useState } from "react";
import { usePomodoro } from "../../../context/PomodoroContext";
import { use135 } from "../../../context/OneThreeFiveContext";

const Pluggin = () => {
  const { togglePomoButton, setPomoTime, pomoTime } = usePomodoro();
  const { toggle135Button } = use135();

  const [tempTime, setTempTime] = useState(pomoTime);
  const handleChange = (e) => {
    setTempTime(e.target.value);
  };

  const changePomoTime = () => {
    if (tempTime < 1 || tempTime > 60) {
      errorNotification();
    } else {
      setPomoTime(tempTime);
      successNotification();
    }
  };

  const errorNotification = () => {
    notification["error"]({
      message: "Pomodoro Time error",
      description:
        "Please ensure that the value inputted is between 1 and 60 minutes.",
    });
  };

  const successNotification = () => {
    notification["success"]({
      message: "Pomodoro Time change successful",
      description: "Pomodoro time has been set to your new preference.",
    });
  };

  return (
    <Fragment>
      <div style={{ fontSize: "20px" }}>
        Striker provides productivity frameworks for users like yourself to toy
        around with and see which works best you for!
      </div>
      <hr />
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3 style={{ paddingRight: "1%" }}>
          <strong>1-3-5 Framework</strong>
        </h3>
        <Switch
          defaultChecked={false}
          autoFocus={true}
          onChange={toggle135Button}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ textDecoration: "underline" }}>Philosophy</h3>
        <span>
          1-3-5 is a productivity framework provides a guideline to allocate
          tasks for the day.
        </span>
        <span>
          This entails 1 high effort task, 3 moderate effort tasks and 5 low
          effort tasks.
        </span>
        <span>
          This framework ensures that you energy is spread out evenly throughout
          the day and that heavy deliverables are done while simple everyday
          tasks are not forgotten.
        </span>
        <span>
          Once this framework is enabled, return to the home page and the 1-3-5
          rule will be imposed.
        </span>
      </div>
      <br />
      <hr />
      <br />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h3 style={{ paddingRight: "1%" }}>
          <strong>Pomodoro Technique</strong>
        </h3>
        <Switch
          defaultChecked={false}
          autoFocus={true}
          onChange={togglePomoButton}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ textDecoration: "underline" }}>Philosophy</h3>
        <span>
          Pomodoro Technique is a time management framework where you split your
          work into intervals.
        </span>
        <span>This technique consist of six steps:</span>
        <ol>
          <li>
            Decide which task you want to complete and click the associated
            timer icon of the task on the daily task page.
          </li>
          <li>Click start and the timer will run for 25 minutes.</li>
          <li>
            Accomplish as much as you can, without distractions, until the timer
            is up.
          </li>
          <li>Click on the Short Break tab and enjoy a 5 minute break.</li>
          <li>
            Repeat steps 2 and 3 until you have completed the cycle four times.
          </li>
          <li>
            After the fourth pomodoro, click on the Long Break tab and enjoy
            your well-deserved 15 minute break. Then repeat from step 2.
          </li>
        </ol>
        <span>
          Once the technique is enabled, return to the home page and a timer
          icon will appear next to the trash bin icon. Click on it to activate
          the timer.
        </span>
        <span>
          Do be warned, a pleasant ringing tone will emanate from your computer
          when the time is up.
        </span>
      </div>
      <br />
      <h3 style={{ textDecoration: "underline" }}>Customisation</h3>
      <span>
        Fine tune the duration of the pomodoro timer in minutes. The maximum
        duration is 60 minutes.
      </span>
      <br />
      <br />
      <Space
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <form>
          <input
            type="number"
            value={tempTime}
            onChange={handleChange}
            min="0"
          />
        </form>
        <Button
          type="primary"
          onClick={changePomoTime}
          shape="round"
          size="medium"
          style={{ width: "150%" }}
        >
          Set
        </Button>
      </Space>
      <br />
      <hr />
    </Fragment>
  );
};

export default Pluggin;
