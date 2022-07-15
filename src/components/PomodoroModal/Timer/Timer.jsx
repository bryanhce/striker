import { Button, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import ringtone from "../../../images/ringtone.wav";

const audio = new Audio(ringtone);

const playAudio = () => {
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 4500);
};

const Timer = (props) => {
  const successNotification = () => {
    notification["success"]({
      message: "Success",
      description: props.desc + " session completed!",
      duration: 20.0,
    });
  };

  const [countDown, setCountDown] = useState(props.time);
  const originalTime = props.time;

  const [isStartButton, setStartButton] = useState(true);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (countDown <= 0) {
        isInitialMount.current = true;
        successNotification();
        setCountDown(props.time);
        setStartButton(true);
        playAudio();
      } else {
        const interval = setInterval(() => {
          setCountDown(countDown - 1000);
        }, 1000);

        return () => clearInterval(interval);
      }
    }
    // eslint-disable-next-line
  }, [countDown]);

  var minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  var timerSeconds =
    seconds <= 9 ? "0" + seconds.toString() : seconds.toString();
  var timerMinutes =
    minutes <= 9 ? "0" + minutes.toString() : minutes.toString();

  const startTimer = () => {
    setCountDown(countDown + 1);
    setStartButton(false);
  };

  const stopTimer = () => {
    isInitialMount.current = true;
    setStartButton(true);
  };

  const restartTimer = () => {
    isInitialMount.current = true;
    setStartButton(true);
    setCountDown(originalTime);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <span
        style={{ fontSize: "10vh", paddingTop: "10%", paddingBottom: "10%" }}
      >
        {timerMinutes} : {timerSeconds}
      </span>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {isStartButton ? (
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={startTimer}
            style={{ width: "35%" }}
          >
            Start
          </Button>
        ) : (
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={stopTimer}
            style={{
              backgroundColor: "#f5222d",
              borderColor: "#f5222d",
              width: "35%",
            }}
          >
            Stop
          </Button>
        )}
        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ backgroundColor: "#fa8c16", borderColor: "#fa8c16" }}
          onClick={restartTimer}
        >
          Restart
        </Button>
      </div>
      <br />
    </div>
  );
};

export default Timer;
