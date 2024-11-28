import { createContext, useState } from "react";

const PopUpContext = createContext();

function PopUpProvider({ children }) {
  const [type, setType] = useState(null);

  const value = {
    setType,
    type,
  };
  return (
    <PopUpContext.Provider value={value}>{children}</PopUpContext.Provider>
  );
}

export { PopUpContext, PopUpProvider };
