import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Matkul from './pages/Matkul';
import Tugas from './pages/Tugas';
import Kalender from './pages/Kalender';
import Pengaturan from './pages/Pengaturan';

// Placeholder halaman lain
const Prioritas = () => <div className="space-y-6 animate-in fade-in duration-500"><h1 className="text-3xl font-bold text-slate-800">Prioritas</h1><p className="text-slate-500 mt-1">Halaman ini masih dalam pengembangan (Next Step!)</p></div>;
const Statistik = () => <div className="space-y-6 animate-in fade-in duration-500"><h1 className="text-3xl font-bold text-slate-800">Statistik</h1><p className="text-slate-500 mt-1">Halaman ini masih dalam pengembangan (Next Step!)</p></div>;

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