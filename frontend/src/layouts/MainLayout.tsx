import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Area konten utama (bergeser 64 unit ke kanan karena sidebar fixed) */}
      <div className="flex-1 ml-64">
        <main className="p-8 max-w-7xl mx-auto">
          {/* Outlet ini ibarat "lubang" yang bakal diisi konten dari Pages */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
