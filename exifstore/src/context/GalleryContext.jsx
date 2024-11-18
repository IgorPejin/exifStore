import { createContext, useState } from "react";

const GalleryContext = createContext();

function GalleryProvider({ children }) {
  const [selectedGallery, setSelectedGallery] = useState("");

  const setGalleryContext = (gallery) => {
    setSelectedGallery(gallery);
  };

  const value = {
    setGalleryContext,
    selectedGallery,
  };
  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}

export { GalleryContext, GalleryProvider };
