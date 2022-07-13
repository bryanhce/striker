import { createContext, useState, useContext } from "react";

const PomodoroContext = createContext();

export function PomodoroContextProvider({ children }) {
  const [isPomoButtonVisible, setPomoButtonVisible] = useState(false);
  const [pomoTime, setPomoTime] = useState(25);

  const togglePomoButton = () => {
    setPomoButtonVisible(!isPomoButtonVisible);
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
