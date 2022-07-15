import { createContext, useState, useContext, useEffect } from "react";

const ColourBlindContext = createContext();

export function ColourBlindContextProvider({ children }) {
  const [isColourBlindFilter, setColourBlindFilter] = useState(false);

  let user = JSON.parse(localStorage.getItem("currentUser"));
  let userId = 0;
  if (user !== null) {
    userId = user.uid;
  }

  useEffect(() => {
    fetch(
      `https://striker-backend.herokuapp.com/dependencies/colourBlind/${userId}`
    )
      .then((response) => response.json())
      .then((isCB) => setColourBlindFilter(isCB.dependency))
      .catch((err) => console.log("colour blind api error " + err));
  }, []);

  //updates backend and sets the new state
  const toggleColourBlindFilter = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isColourBlind: !isColourBlindFilter,
      }),
    };

    fetch(
      `https://striker-backend.herokuapp.com/dependencies/colourBlind/${userId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => console.log("colour blind is set as " + !isColourBlindFilter))
      .then(() => setColourBlindFilter(!isColourBlindFilter))
      .catch((err) => console.log("update colour blind api error " + err));
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
