import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home/HomePage";
import TichCheoPage from "./pages/TichCheo/TichCheoPage";
import VaiMauPage from "./pages/VaiMau/VaiMauPage";
import LanDieuPage from "./pages/LanDieu/LanDieuPage";
import ChieuCheoPage from "./pages/ChieuCheo/ChieuCheoPage";
import GeminiChatPage from "./pages/GeminiChat/GeminiChatPage";
import NguonTuLieuPage from "./pages/NguonTuLieu/NguonTuLieuPage";
import GioiThieuPage from "./pages/GioiThieu/GioiThieuPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tich-cheo" element={<TichCheoPage />} />
          <Route path="vai-mau" element={<VaiMauPage />} />
          <Route path="lan-dieu" element={<LanDieuPage />} />
          <Route path="chieu-cheo" element={<ChieuCheoPage />} />
          <Route path="hoi-dap-ai" element={<GeminiChatPage />} />
          <Route path="nguon-tu-lieu" element={<NguonTuLieuPage />} />
          <Route path="gioi-thieu" element={<GioiThieuPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
