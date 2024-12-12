import { createContext, useState } from "react";

const FilterContext = createContext();

const INITIAL_FILTER = {
  date_time: "",
};

function FilterProvider({ children }) {
  const [filter, setFilter] = useState(INITIAL_FILTER);

  const [refresh, setRefresh] = useState(false);

  const updateFilter = (property, value) => {
    const updatedFilter = { ...filter };
    updatedFilter[property] = value;
    setFilter(updatedFilter);
    setRefresh(true);
  };

  const value = {
    updateFilter,
    filter,
    setRefresh,
    refresh,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
