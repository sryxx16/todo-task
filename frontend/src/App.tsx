import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Matkul from './pages/Matkul';
import Tugas from './pages/Tugas';
import Kalender from './pages/Kalender';
import Pengaturan from './pages/Pengaturan';
import Prioritas from './pages/Prioritas';
import Statistik from './pages/Statistik';



function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/matkul" element={<Matkul />} />
          <Route path="/tugas" element={<Tugas />} />
          <Route path="/kalender" element={<Kalender />} />
          <Route path="/prioritas" element={<Prioritas />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/pengaturan" element={<Pengaturan />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;