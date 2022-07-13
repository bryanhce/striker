import { createContext, useState, useContext } from "react";

const ColourBlindContext = createContext();

export function ColourBlindContextProvider({ children }) {
  const [isColourBlindFilter, setColourBlindFilter] = useState(false);

  let user = JSON.parse(localStorage.getItem("currentUser"));
  let userId = 0
  if (user !== null) {
    userId = user.uid;
  }


  // fetch(
  //   `https://striker-backend.herokuapp.com/dependencies/colourBlind/${userId}`
  // )
  //   .then((response) => response.json())
  //   .then((isCB) => setColourBlindFilter(isCB))
  //   .catch((err) => console.log("colour blind api error " + err));

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
