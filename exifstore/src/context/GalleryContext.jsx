import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axiosCall from "../utils/axiosCall";

const GalleryContext = createContext();

function GalleryProvider({ children }) {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [loading, setLoading] = useState(false);
  //todo: learn the basics of useMemo so that u can save a request if the selected gallery is the same.
  const [imagesForGallery, setImagesForGallery] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function getImagesForGallery() {
      setLoading(true);
      const response = await axiosCall(
        "get",
        `http://localhost:7000/exifstore/imagesForGallery?id=${selectedGallery.id}`,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      const images = response.data.map((image) => {
        return { ...image, base64_image: image.image_buffer };
      });
      setImagesForGallery(images);
      setLoading(false);
    }
    if (selectedGallery) getImagesForGallery();
  }, [selectedGallery, token]);

  const setGalleryContext = (gallery) => {
    if (!gallery) {
      setImagesForGallery([]);
    } //again, memoized value would be key here
    setSelectedGallery(gallery);
  };

  const value = {
    setGalleryContext,
    selectedGallery,
    imagesForGallery,
    loading,
  };
  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}

export { GalleryContext, GalleryProvider };
