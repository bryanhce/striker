import { createContext, useState, useContext } from "react";

const OneThreeFiveContext = createContext();

export function OneThreeFiveContextProvider({ children }) {
  const [is135Active, set135Active] = useState(false);

  const toggle135Button = () => {
    set135Active(!is135Active);
  };

  return (
    <OneThreeFiveContext.Provider
      value={{
        is135Active,
        set135Active,
        toggle135Button,
      }}
    >
      {children}
    </OneThreeFiveContext.Provider>
  );
}

export function use135() {
  return useContext(OneThreeFiveContext);
}
