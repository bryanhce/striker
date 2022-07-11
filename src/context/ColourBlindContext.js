import { createContext, useState, useContext } from "react";

const ColourBlindContext = createContext();

export function ColourBlindContextProvider({ children }) {
  const [isColourBlindFilter, setColourBlindFilter] = useState(false);

  const toggleColourBlindFilter = () => {
    setColourBlindFilter(!isColourBlindFilter);
  };

  return (
    <ColourBlindContext.Provider
      value={{
        isColourBlindFilter,
        setColourBlindFilter,
        toggleColourBlindFilter,
      }}
    >
      {children}
    </ColourBlindContext.Provider>
  );
}

export function useColourBlind() {
  return useContext(ColourBlindContext);
}
