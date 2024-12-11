import { createContext, useState } from "react";
import dayjs from "dayjs";

const FilterContext = createContext();

const INITIAL_FILTER = {
  date_time: dayjs(null),
};

function FilterProvider({ children }) {
  const [filter, setFilter] = useState(INITIAL_FILTER);

  const updateFilter = (property, value) => {
    const updatedFilter = { ...filter };
    updatedFilter[property] = value;
    setFilter(updatedFilter);
  };

  const value = {
    updateFilter,
    filter,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
