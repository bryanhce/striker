import { createContext, useState, useContext, useEffect } from "react";

const OneThreeFiveContext = createContext();

export function OneThreeFiveContextProvider({ children }) {
  const [is135Active, set135Active] = useState(false);

  let user = JSON.parse(localStorage.getItem("currentUser"));
  let userId = 0;
  if (user !== null) {
    userId = user.uid;
  }

  //Get API for 135
  useEffect(() => {
    fetch(`https://striker-backend.herokuapp.com/dependencies/135/${userId}`)
      .then((response) => response.json())
      .then((is135) => set135Active(is135.dependency))
      .catch((err) => console.log("1-3-5 api error " + err));
  }, []);

  const toggle135Button = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        is135: !is135Active,
      }),
    };

    fetch(
      `https://striker-backend.herokuapp.com/dependencies/135/${userId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => console.log("1-3-5 active is set as " + !is135Active))
      .then(() => set135Active(!is135Active))
      .catch((err) => console.log("update 1-3-5 api error " + err));
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
