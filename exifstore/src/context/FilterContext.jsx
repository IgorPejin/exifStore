import { createContext, useState } from "react";

const FilterContext = createContext();

const INITIAL_FILTER = {
  filterActivated: false,
};

function FilterProvider({ children }) {
  const [filter, setFilter] = useState(INITIAL_FILTER);

  const [refresh, setRefresh] = useState(false);

  const updateFilter = (property, value) => {
    const updatedFilter = { ...filter };
    updatedFilter[property] = value;
    updatedFilter.filterActivated = true;
    setFilter(updatedFilter);
    setRefresh(true);
  };

  const resetFilters = () => {
    setFilter(INITIAL_FILTER);
  };

  const value = {
    updateFilter,
    filter,
    setRefresh,
    refresh,
    resetFilters,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
