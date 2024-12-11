import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axiosCall from "../utils/axiosCall";
import { FilterContext } from "./FilterContext";

const GalleryContext = createContext();
const PAGE_LIMIT = 10; // 50 would be ideal

function GalleryProvider({ children }) {
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [optionsContext, setOptionsContext] = useState([]);

  const [loading, setLoading] = useState(false);

  //todo: learn the basics of useMemo so that u can save a request if the selected gallery is the same.
  const [imagesForGallery, setImagesForGallery] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const { token } = useContext(AuthContext);
  const { updateFilter } = useContext(FilterContext);

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getImagesForGallery() {
      setLoading(true);
      const id = selectedGallery ? selectedGallery.id : 0;
      const response = await axiosCall(
        "get",
        `http://localhost:7000/exifstore/imagesForGallery?id=${id}&plimit=${PAGE_LIMIT}&currentPage=${currentPage}`,
        undefined,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );
      const images = response.data.images;
      const totalPages = response.data.count;
      setTotalPages(totalPages);
      setImagesForGallery(images);
      setRefresh(false);
      setLoading(false);
    }
    if (imagesForGallery.length == 0 || refresh) {
      console.log("refreshing images");
      getImagesForGallery();
    }
  }, [selectedGallery, token, currentPage, imagesForGallery.length, refresh]);

  const setGalleryContext = (gallery) => {
    setRefresh(true);
    setCurrentPage(1);
    if (!gallery) {
      setImagesForGallery([]);
    } //again, memoized value would be key here
    updateFilter("date_time", null); // date set to null when switch gallery context, u need to test this
    setSelectedGallery(gallery);
  };

  const addOption = (newGallery) => {
    const newOptions = [...optionsContext, newGallery];
    setOptionsContext(newOptions);
  };

  const addImage = (newImage) => {
    const newImages = [...imagesForGallery, newImage];
    setRefresh(true);
    setImagesForGallery(newImages);
  };

  const updateOption = (updatedName) => {
    const newOptions = optionsContext.map((gallery) => {
      if (gallery.id === selectedGallery.id) {
        const newSelectedGallery = { ...gallery, name: updatedName };
        setSelectedGallery(newSelectedGallery);
        return newSelectedGallery;
      }
    });
    setOptionsContext(newOptions);
  };

  const deleteOption = (galleryToDelete) => {
    console.log(galleryToDelete.id, optionsContext);
    const newOptions = optionsContext.filter(
      (gallery) => gallery.id !== galleryToDelete.id
    );
    setOptionsContext(newOptions);
  };

  const resetImageList = () => {
    setImagesForGallery([]);
    setCurrentPage(1);
    setTotalPages(null);
  };

  const value = {
    setGalleryContext,
    setSelectedGallery,
    selectedGallery,
    imagesForGallery,
    setImagesForGallery,
    loading,
    currentPage,
    setCurrentPage,
    PAGE_LIMIT,
    totalPages,
    addOption,
    addImage,
    deleteOption,
    updateOption,
    setOptionsContext,
    optionsContext,
    resetImageList,
    setRefresh,
  };
  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
}

export { GalleryContext, GalleryProvider };
