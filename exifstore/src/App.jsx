import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExifStoreApp from "./pages/ExifStoreApp/ExifStoreApp";
import Login from "./pages/Login/Login";
import Hero from "./pages/Hero/Hero";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { GalleryProvider } from "./context/GalleryContext";
import { FilterProvider } from "./context/FilterContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <FilterProvider>
          <GalleryProvider>
            <Routes>
              <Route index element={<Hero />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/:username" element={<ExifStoreApp />} />
              </Route>
              <Route path="/login" element={<Login />} />
            </Routes>
          </GalleryProvider>
        </FilterProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
