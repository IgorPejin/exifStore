import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axiosCall from "../utils/axiosCall";

const GalleryContext = createContext();

function GalleryProvider({ children }) {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getImagesForGallery() {
      const response = await axiosCall(
        "get",
        `http://localhost:7000/exifstore/imagesForGallery?id=${selectedGallery.id}`,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      const galleryNames = response.data;
      console.log(galleryNames);
    }
    if (selectedGallery) getImagesForGallery();
  }, [selectedGallery, token]);

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
