import { createContext, useState } from "react";
import { INITIAL_FILTER } from "../utils/properties";

const FilterContext = createContext();

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

  const deleteFilter = (property) => {
    const updatedFilter = { ...filter };
    if (updatedFilter[property]) {
      delete updatedFilter[property];
      setFilter(updatedFilter);
      setRefresh(true);
    }
  };

  const resetFilters = () => {
    //todo: clear filters when gallery switched
    setFilter(INITIAL_FILTER);
  };

  const value = {
    updateFilter,
    filter,
    setRefresh,
    refresh,
    resetFilters,
    deleteFilter,
  };
  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

export { FilterContext, FilterProvider };
