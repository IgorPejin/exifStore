import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExifStoreApp from "./pages/ExifStoreApp/ExifStoreApp";
import Login from "./pages/Login/Login";
import Hero from "./pages/Hero/Hero";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { GalleryProvider } from "./context/GalleryContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GalleryProvider>
          <Routes>
            <Route index element={<Hero />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/:username" element={<ExifStoreApp />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </GalleryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
