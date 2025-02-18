import { createContext, useContext, useEffect, useState } from "react";
import { GalleryContext } from "./GalleryContext";

const HistoryContext = createContext();

function HistoryProvider({ children }) {
  const { totalPages } = useContext(GalleryContext);
  const [history, setHistory] = useState({});

  useEffect(() => {
    async function initializeHistory() {
      const createHistory = (n) =>
        Object.fromEntries(Array.from({ length: n }, (_, i) => [i, []]));
      rewriteHistory(createHistory(totalPages));
    }
    initializeHistory(totalPages);
  }, [totalPages]);

  const rewriteHistory = (newHistory) => {
    console.log("Time to create (new) history!");
    setHistory(newHistory);
  };

  const value = {
    history,
    rewriteHistory,
  };
  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}

export { HistoryContext, HistoryProvider };
