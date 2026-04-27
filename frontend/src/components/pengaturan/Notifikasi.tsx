import { useState, useEffect, useCallback } from "react";
import { Bell, CheckCircle, BellRing } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { taskApi, type Task } from "../../services/api";

interface NotifState {
  deadline: boolean;
  tugasBaru: boolean;
  penyelesaian: boolean;
}

const Notifikasi = () => {
  const { theme, t, lang } = useTheme();
  const dark = theme === "dark";

  const [notif, setNotif] = useState<NotifState>(() => {
    const saved = localStorage.getItem("todoo_notif_settings");
    if (saved) return JSON.parse(saved);
    return { deadline: true, tugasBaru: true, penyelesaian: true };
  });

  const [toast, setToast] = useState<string | null>(null);
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "default"
  );

  useEffect(() => { localStorage.setItem("todoo_notif_settings", JSON.stringify(notif)); }, [notif]);
  useEffect(() => { if (toast) { const ti = setTimeout(() => setToast(null), 3000); return () => clearTimeout(ti); } }, [toast]);

  // Check deadlines and send browser notifications
  const checkDeadlines = useCallback(async () => {
    if (!notif.deadline || browserPermission !== "granted") return;
    
    try {
      const res = await taskApi.getAll();
      const tasks: Task[] = res.data.data;
      const now = new Date();
      
      // Find tasks with deadlines within the next 2 days that aren't done
      const urgentTasks = tasks.filter(task => {
        if (task.status === "Selesai") return false;
        const deadline = new Date(task.deadline);
        const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return daysLeft >= 0 && daysLeft <= 2;
      });

      // Check which notifications we've already sent (stored in sessionStorage)
      const sentKey = "todoo_sent_notifs_" + now.toDateString();
      const sentIds: number[] = JSON.parse(sessionStorage.getItem(sentKey) || "[]");

      urgentTasks.forEach(task => {
        if (sentIds.includes(task.id)) return;
        
        const deadline = new Date(task.deadline);
        const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        new Notification(t("deadlineNotifTitle"), {
          body: `"${task.title}" ${t("deadlineNotifBody")} ${daysLeft} ${t("hari")}!`,
          icon: "/vite.svg",
          tag: `deadline-${task.id}`,
        });

        sentIds.push(task.id);
      });

      sessionStorage.setItem(sentKey, JSON.stringify(sentIds));
    } catch {
      // Silently fail - API might not be available
    }
  }, [notif.deadline, browserPermission, t]);

  // Check deadlines on mount and every 5 minutes
  useEffect(() => {
    if (notif.deadline && browserPermission === "granted") {
      checkDeadlines();
      const interval = setInterval(checkDeadlines, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [notif.deadline, browserPermission, checkDeadlines]);

  const handleToggle = (key: keyof NotifState, label: string) => {
    setNotif((prev) => {
      const newVal = !prev[key];
      setToast(`${label} ${newVal ? t("diaktifkan") : t("dinonaktifkan")}`);
      return { ...prev, [key]: newVal };
    });
  };

  const handleRequestPermission = async () => {
    if (typeof Notification === "undefined") {
      setToast("Browser tidak mendukung notifikasi");
      return;
    }
    
    try {
      const permission = await Notification.requestPermission();
      setBrowserPermission(permission);
      
      if (permission === "granted") {
        setToast(t("notifDeadline") + " " + t("diaktifkan") + "! ✅");
        // Send a test notification
        new Notification(t("deadlineNotifTitle"), {
          body: "Notifikasi browser berhasil diaktifkan! Kamu akan menerima peringatan deadline.",
          icon: "/vite.svg",
        });
        // Immediately check for deadlines
        checkDeadlines();
      } else {
        setToast("Izin notifikasi ditolak oleh browser");
      }
    } catch {
      setToast("Gagal meminta izin notifikasi");
    }
  };

  const ToggleSwitch = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <button onClick={onClick} className={`w-11 h-6 rounded-full relative transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${active ? "bg-indigo-600" : dark ? "bg-slate-600" : "bg-slate-300"}`} role="switch" aria-checked={active}>
      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-sm ${active ? "right-1" : "left-1"}`} />
    </button>
  );

  return (
    <div className={`rounded-2xl shadow-sm border p-6 relative overflow-hidden transition-colors duration-300 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
      {/* Toast */}
      <div className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium shadow-lg transition-all duration-300 z-10 ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <CheckCircle size={16} />{toast}
      </div>

      <h2 className={`text-lg font-bold mb-1 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("notifikasi")}</h2>
      <p className={`text-sm mb-6 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("aturNotifikasi")}</p>
      
      <div className="space-y-4">
        {/* Notifikasi Deadline */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-50 text-indigo-500'}`}>
              <Bell size={18} />
            </div>
            <div>
              <h4 className={`font-medium ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("notifDeadline")}</h4>
              <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("notifDeadlineDesc")}</p>
            </div>
          </div>
          <ToggleSwitch active={notif.deadline} onClick={() => handleToggle("deadline", t("notifDeadline"))} />
        </div>

        {/* Notifikasi Tugas Baru */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-amber-900/50 text-amber-400' : 'bg-amber-50 text-amber-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div>
              <h4 className={`font-medium ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("notifTugasBaru")}</h4>
              <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("notifTugasBaruDesc")}</p>
            </div>
          </div>
          <ToggleSwitch active={notif.tugasBaru} onClick={() => handleToggle("tugasBaru", t("notifTugasBaru"))} />
        </div>

        {/* Notifikasi Penyelesaian */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-50 text-emerald-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            </div>
            <div>
              <h4 className={`font-medium ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("notifPenyelesaian")}</h4>
              <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("notifPenyelesaianDesc")}</p>
            </div>
          </div>
          <ToggleSwitch active={notif.penyelesaian} onClick={() => handleToggle("penyelesaian", t("notifPenyelesaian"))} />
        </div>
      </div>

      {/* Browser Notification Permission Button */}
      <div className={`mt-4 pt-4 border-t ${dark ? 'border-slate-700' : 'border-slate-100'}`}>
        <button
          onClick={handleRequestPermission}
          className={`flex items-center gap-2 text-sm font-medium transition-all px-4 py-2.5 rounded-xl w-full justify-center ${
            browserPermission === "granted"
              ? dark ? "bg-emerald-900/30 text-emerald-400 border border-emerald-800" : "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
          }`}
        >
          <BellRing size={16} />
          {browserPermission === "granted" 
            ? "✅ Notifikasi Browser Aktif" 
            : t("kelolaNotifEmail")}
        </button>
        {browserPermission === "granted" && (
          <p className={`text-xs mt-2 text-center ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
            {lang === "en" ? "You will receive browser alerts when task deadlines are near (≤ 2 days)" : "Kamu akan menerima peringatan browser saat deadline tugas mendekat (≤ 2 hari)"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Notifikasi;
