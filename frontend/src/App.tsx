import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Matkul from "./pages/Matkul";
import Tugas from "./pages/Tugas";
import Kalender from "./pages/Kalender";
import Pengaturan from "./pages/Pengaturan";
import Prioritas from "./pages/Prioritas";
import Statistik from "./pages/Statistik";

// Import halaman auth & proteksi
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute Privat yang terproteksi */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/matkul" element={<Matkul />} />
            <Route path="/tugas" element={<Tugas />} />
            <Route path="/kalender" element={<Kalender />} />
            <Route path="/prioritas" element={<Prioritas />} />
            <Route path="/statistik" element={<Statistik />} />
            <Route path="/pengaturan" element={<Pengaturan />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
