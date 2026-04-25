import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  ListTodo,
  CalendarDays,
  Flag,
  BarChart3,
  Settings,
  LogOut,
  Layers,
  ClipboardList,
  Clock,
  Plus
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Mata Kuliah", path: "/matkul", icon: <BookOpen size={20} /> },
    { name: "Data Tugas", path: "/tugas", icon: <ListTodo size={20} /> },
    { name: "Kalender", path: "/kalender", icon: <CalendarDays size={20} /> },
    { name: "Prioritas", path: "/prioritas", icon: <Flag size={20} /> },
    { name: "Statistik", path: "/statistik", icon: <BarChart3 size={20} /> },
  ];

  // Helper function to render different bottom card based on route
  const renderBottomCard = () => {
    if (location.pathname === "/") {
      return (
        <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
          <h4 className="flex items-center gap-2 text-indigo-800 font-bold mb-3 text-sm">
            <span className="text-indigo-600">⚡</span> Quick Action
          </h4>
          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white text-indigo-600 font-medium rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-shadow text-sm">
              <Plus size={16} /> Tambah Tugas
            </button>
            <button className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-white text-emerald-600 font-medium rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow text-sm">
              <Plus size={16} /> Tambah Mata Kuliah
            </button>
          </div>
        </div>
      );
    }
    
    let icon = <ClipboardList size={32} className="text-indigo-400 mb-2 opacity-50" />;
    let text = "Kelola mata kuliah dan tugasmu dengan lebih terstruktur!";
    
    if (location.pathname === "/tugas") {
      text = "Kelola tugas kuliahmu dengan teratur dan selesaikan tepat waktu!";
      icon = <Clock size={32} className="text-indigo-400 mb-2 opacity-50" />;
    } else if (location.pathname === "/kalender") {
      text = "Atur jadwal, pantau deadline, dan selesaikan tugas tepat waktu!";
      icon = <CalendarDays size={32} className="text-indigo-400 mb-2 opacity-50" />;
    } else if (location.pathname === "/pengaturan") {
      text = "Atur preferensi aplikasi sesuai kebutuhanmu untuk pengalaman terbaik.";
      icon = <Settings size={32} className="text-indigo-400 mb-2 opacity-50" />;
    } else if (location.pathname === "/prioritas") {
      text = "Fokus pada tugas prioritas terlebih dahulu untuk hasil lebih maksimal!";
      icon = <Flag size={32} className="text-indigo-400 mb-2 opacity-50" />;
    } else if (location.pathname === "/statistik") {
      text = "Pantau produktivitas dan perkembangan tugasmu di sini.";
      icon = <BarChart3 size={32} className="text-indigo-400 mb-2 opacity-50" />;
    }
    
    return (
      <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-indigo-100/50 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
          {icon}
        </div>
        <p className="text-xs font-medium text-slate-600 leading-relaxed">
          {text}
        </p>
      </div>
    );
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col fixed left-0 top-0">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-3 font-bold text-xl text-slate-800">
        <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <Layers size={18} />
        </div>
        TaskKuliah
      </div>

      {/* Menu Links */}
      <div className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

        <div className="my-4 border-t border-slate-100"></div>

        <NavLink
          to="/pengaturan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive
                ? "bg-indigo-50 text-indigo-600"
                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
            }`
          }
        >
          <Settings size={20} />
          Pengaturan
        </NavLink>
      </div>

      {/* Bottom Area: Promo Card / Quick Action & Logout */}
      <div className="p-4 space-y-4">
        {renderBottomCard()}
        
        <button className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 w-full rounded-xl transition-colors">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
