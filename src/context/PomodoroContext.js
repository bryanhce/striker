import { createContext, useState, useContext } from "react";

const PomodoroContext = createContext();

export function PomodoroContextProvider({ children }) {
  const [isPomoButtonVisible, setPomoButtonVisible] = useState(false);

  const togglePomoButton = () => {
    setPomoButtonVisible(!isPomoButtonVisible);
  };

  return (
    <PomodoroContext.Provider
      value={{
        isPomoButtonVisible,
        setPomoButtonVisible,
        togglePomoButton,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  return useContext(PomodoroContext);
}
