import { BrowserRouter, Route, Routes } from "react-router-dom";
import ExifStoreApp from "./pages/ExifStoreApp/ExifStoreApp";
import Login from "./pages/Login/Login";
import Hero from "./pages/Hero/Hero";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Hero />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/:username" element={<ExifStoreApp />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
