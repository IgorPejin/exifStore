import { createContext, useContext, useEffect } from "react";
import { GalleryContext } from "./GalleryContext";
import { INITAL_HISTORY } from "../utils/properties";

const HistoryContext = createContext();

function HistoryProvider({ children }) {
  const { optionsContext, totalPages, history } = useContext(GalleryContext);

  useEffect(() => {
    async function initializeHistory(optionsContext) {
      const defaultHistory = INITAL_HISTORY;
      const createDefaultHistoryPages = (totalPages) =>
        Object.fromEntries(
          Array.from({ length: totalPages }, (_, i) => [i, []])
        );

      defaultHistory.default = createDefaultHistoryPages(totalPages);

      const createHistoryForOptions = (optionsContext) =>
        Object.fromEntries(
          Array.from(optionsContext, (option) => [option.name, {}])
        );

      const newHistory = {
        ...defaultHistory,
        ...createHistoryForOptions(optionsContext),
      };
      history.current = newHistory;
    }
    initializeHistory(optionsContext);
  }, [optionsContext, totalPages, history]);

  return <HistoryContext.Provider>{children}</HistoryContext.Provider>;
}

export { HistoryContext, HistoryProvider };
