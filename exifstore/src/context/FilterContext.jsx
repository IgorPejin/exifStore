import { createContext, useState } from "react";
import dayjs from "dayjs";

const FilterContext = createContext();

function FilterProvider({ children }) {
  const [date, setDate] = useState(dayjs(null));

  const value = {
    setDate,
    date,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
