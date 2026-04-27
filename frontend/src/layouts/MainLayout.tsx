import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import QuickAddModal from "../components/QuickAddModal";
import { useTheme } from "../contexts/ThemeContext";

const MainLayout = () => {
  const { theme } = useTheme();
  const [modalState, setModalState] = useState<{ isOpen: boolean; tab: 'task' | 'course' }>({
    isOpen: false,
    tab: 'task'
  });
  
  // State untuk refresh halaman setelah tambah data
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const handleQuickAdd = (tab: 'task' | 'course') => {
    setModalState({ isOpen: true, tab });
  };

  const handleSuccess = () => {
    setRefreshKey(prev => prev + 1);
    // Jika kita di dashboard, mungkin mau redirect ke halaman yang sesuai atau coba refresh data
    // Untuk sekarang kita refresh outletnya saja pakai key
  };

  return (
    <div className={`flex min-h-screen font-sans transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      {/* Sidebar tetap di kiri */}
      <Sidebar onQuickAdd={handleQuickAdd} />

      {/* Area konten utama (bergeser 64 unit ke kanan karena sidebar fixed) */}
      <div className="flex-1 ml-64">
        <main className="p-8 max-w-7xl mx-auto">
          {/* Outlet ini ibarat "lubang" yang bakal diisi konten dari Pages */}
          <Outlet key={refreshKey} />
        </main>
      </div>

      <QuickAddModal 
        isOpen={modalState.isOpen} 
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        initialTab={modalState.tab}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default MainLayout;
