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
import { useTheme } from "../contexts/ThemeContext";

interface SidebarProps {
  onQuickAdd: (tab: 'task' | 'course') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onQuickAdd }) => {
  const location = useLocation();
  const { theme, t } = useTheme();
  const dark = theme === "dark";
  
  const menuItems = [
    { name: t("dashboard"), path: "/", icon: <LayoutDashboard size={20} /> },
    { name: t("mataKuliah"), path: "/matkul", icon: <BookOpen size={20} /> },
    { name: t("dataTugas"), path: "/tugas", icon: <ListTodo size={20} /> },
    { name: t("kalender"), path: "/kalender", icon: <CalendarDays size={20} /> },
    { name: t("prioritas"), path: "/prioritas", icon: <Flag size={20} /> },
    { name: t("statistik"), path: "/statistik", icon: <BarChart3 size={20} /> },
  ];

  // Helper function to render different bottom card based on route
  const renderBottomCard = () => {
    if (location.pathname === "/") {
      return (
        <div className={`p-4 rounded-2xl border ${dark ? 'bg-indigo-950/50 border-indigo-900' : 'bg-indigo-50/50 border-indigo-100'}`}>
          <h4 className={`flex items-center gap-2 font-bold mb-3 text-sm ${dark ? 'text-indigo-300' : 'text-indigo-800'}`}>
            <span className="text-indigo-600">⚡</span> {t("quickAction")}
          </h4>
          <div className="space-y-2">
            <button 
              onClick={() => onQuickAdd('task')}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 font-medium rounded-xl border shadow-sm hover:shadow-md transition-shadow text-sm ${dark ? 'bg-slate-800 text-indigo-400 border-indigo-900' : 'bg-white text-indigo-600 border-indigo-100'}`}
            >
              <Plus size={16} /> {t("tambahTugas")}
            </button>
            <button 
              onClick={() => onQuickAdd('course')}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 font-medium rounded-xl border shadow-sm hover:shadow-md transition-shadow text-sm ${dark ? 'bg-slate-800 text-emerald-400 border-emerald-900' : 'bg-white text-emerald-600 border-emerald-100'}`}
            >
              <Plus size={16} /> {t("tambahMatkul")}
            </button>
          </div>
        </div>
      );
    }
    
    let icon = <ClipboardList size={32} className={`mb-2 opacity-50 ${dark ? 'text-indigo-400' : 'text-indigo-400'}`} />;
    let text = t("tipMatkul");
    
    if (location.pathname === "/tugas") {
      text = t("tipTugas");
      icon = <Clock size={32} className={`mb-2 opacity-50 ${dark ? 'text-indigo-400' : 'text-indigo-400'}`} />;
    } else if (location.pathname === "/kalender") {
      text = t("tipKalender");
      icon = <CalendarDays size={32} className={`mb-2 opacity-50 ${dark ? 'text-indigo-400' : 'text-indigo-400'}`} />;
    } else if (location.pathname === "/pengaturan") {
      text = t("tipPengaturan");
      icon = <Settings size={32} className={`mb-2 opacity-50 ${dark ? 'text-indigo-400' : 'text-indigo-400'}`} />;
    } else if (location.pathname === "/prioritas") {
      text = t("tipPrioritas");
      icon = <Flag size={32} className={`mb-2 opacity-50 ${dark ? 'text-indigo-400' : 'text-indigo-400'}`} />;
    } else if (location.pathname === "/statistik") {
      text = t("tipStatistik");
      icon = <BarChart3 size={32} className={`mb-2 opacity-50 ${dark ? 'text-indigo-400' : 'text-indigo-400'}`} />;
    }
    
    return (
      <div className={`p-6 rounded-2xl border flex flex-col items-center text-center ${dark ? 'bg-indigo-950/50 border-indigo-900' : 'bg-indigo-50/50 border-indigo-100'}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border ${dark ? 'bg-indigo-900/50 border-indigo-800' : 'bg-indigo-100/50 border-indigo-100'}`}>
          {icon}
        </div>
        <p className={`text-xs font-medium leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
          {text}
        </p>
      </div>
    );
  };

  return (
    <div className={`w-64 h-screen border-r flex flex-col fixed left-0 top-0 transition-colors duration-300 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
      {/* Logo Area */}
      <div className={`p-6 flex items-center gap-3 font-bold text-xl ${dark ? 'text-slate-100' : 'text-slate-800'}`}>
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
                  ? dark ? "bg-indigo-600/20 text-indigo-400" : "bg-indigo-50 text-indigo-600"
                  : dark ? "text-slate-400 hover:bg-slate-700 hover:text-indigo-400" : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}

        <div className={`my-4 border-t ${dark ? 'border-slate-700' : 'border-slate-100'}`}></div>

        <NavLink
          to="/pengaturan"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              isActive
                ? dark ? "bg-indigo-600/20 text-indigo-400" : "bg-indigo-50 text-indigo-600"
                : dark ? "text-slate-400 hover:bg-slate-700 hover:text-indigo-400" : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
            }`
          }
        >
          <Settings size={20} />
          {t("pengaturan")}
        </NavLink>
      </div>

      {/* Bottom Area: Promo Card / Quick Action & Logout */}
      <div className="p-4 space-y-4">
        {renderBottomCard()}
        
        <button className="flex items-center gap-3 px-4 py-3 text-red-500 font-bold hover:bg-red-50 w-full rounded-xl transition-colors dark:hover:bg-red-950/30">
          <LogOut size={20} />
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
