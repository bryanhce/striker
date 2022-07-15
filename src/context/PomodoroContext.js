import { createContext, useState, useContext, useEffect } from "react";

const PomodoroContext = createContext();

export function PomodoroContextProvider({ children }) {
  const [isPomoButtonVisible, setPomoButtonVisible] = useState(false);
  const [pomoTime, setPomoTime] = useState(25);

  let user = JSON.parse(localStorage.getItem("currentUser"));
  let userId = 0;
  if (user !== null) {
    userId = user.uid;
  }

  //Get API
  useEffect(() => {
    fetch(
      `https://striker-backend.herokuapp.com/dependencies/pomodoro/${userId}`
    )
      .then((response) => response.json())
      .then((isPomo) => setPomoButtonVisible(isPomo.dependency))
      .catch((err) => console.log("get pomodoro api error " + err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePomoButton = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isPomodoro: !isPomoButtonVisible,
      }),
    };

    fetch(
      `https://striker-backend.herokuapp.com/dependencies/135/${userId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => console.log("pomodoro is set as " + !isPomoButtonVisible))
      .then(() => setPomoButtonVisible(!isPomoButtonVisible))
      .catch((err) => console.log("update pomdoro api error " + err));
  };

  return (
    <PomodoroContext.Provider
      value={{
        isPomoButtonVisible,
        setPomoButtonVisible,
        togglePomoButton,
        pomoTime,
        setPomoTime,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  return useContext(PomodoroContext);
}
