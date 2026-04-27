import { useEffect, useState } from 'react';
import { taskApi, courseApi, type Task, type Course } from '../services/api';
import { CalendarIcon, Plus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import QuickAddModal from '../components/QuickAddModal';
import { useTheme } from '../contexts/ThemeContext';

const getDaysLeft = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
const getDaysLeftColor = (days: number) => days <= 2 ? 'text-red-500' : days <= 7 ? 'text-amber-500' : 'text-emerald-500';
const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const DAYS_SHORT = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

interface CalendarEvent { task: Task; date: number }

const priorityColor = (p: Task['priority'], isDark = false) =>
  p === 'Tinggi' ? { dot: 'bg-red-500', bg: isDark ? 'bg-red-900/30 border-red-800 text-red-400' : 'bg-red-50 border-red-100 text-red-700' } :
    p === 'Sedang' ? { dot: 'bg-amber-500', bg: isDark ? 'bg-amber-900/30 border-amber-800 text-amber-400' : 'bg-amber-50 border-amber-100 text-amber-700' } :
      { dot: 'bg-emerald-500', bg: isDark ? 'bg-emerald-900/30 border-emerald-800 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-700' };

const Kalender = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'Bulan' | 'Minggu' | 'Hari'>('Bulan');

  // State buat buka/tutup modal Quick Add
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);

  // Pisahin fetchAll biar bisa dipanggil ulang pas modal ditutup
  const fetchAll = async () => {
    try {
      const [tRes, cRes] = await Promise.all([taskApi.getAll(), courseApi.getAll()]);
      setTasks(tRes.data.data);
      setCourses(cRes.data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const isToday = (d: number) => today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

  // First day of month (0=Sun, adjust to Mon-first)
  const firstDow = new Date(year, month, 1).getDay(); // 0=Sun
  const offset = firstDow === 0 ? 6 : firstDow - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;

  // Build grid cells
  const cells: { day: number; isCurrentMonth: boolean }[] = [];
  for (let i = 0; i < totalCells; i++) {
    if (i < offset) {
      cells.push({ day: daysInPrevMonth - offset + i + 1, isCurrentMonth: false });
    } else if (i < offset + daysInMonth) {
      cells.push({ day: i - offset + 1, isCurrentMonth: true });
    } else {
      cells.push({ day: i - offset - daysInMonth + 1, isCurrentMonth: false });
    }
  }

  // Map tasks to calendar cells
  const getTasksForDay = (day: number): Task[] => {
    return tasks.filter(t => {
      const d = new Date(t.deadline);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });
  };

  // Upcoming deadlines
  const upcoming = [...tasks]
    .filter(t => t.status !== 'Selesai')
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const todayStr = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500 pb-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Kalender</h1>
            <p className={`mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Lihat dan kelola jadwal deadline tugas kuliahmu.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border ${dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-100 text-slate-500'}`}>
              <CalendarIcon size={18} />
              <span className="text-sm font-medium">{todayStr}</span>
            </div>
            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
              <img src="https://ui-avatars.com/api/?name=Surya&background=6366f1&color=fff" alt="Surya" className="w-8 h-8 rounded-full" />
              <span className={`font-medium ${dark ? 'text-slate-200' : 'text-slate-700'}`}>Surya</span>
              <ChevronDown size={16} className={dark ? 'text-slate-500' : 'text-slate-400'} />
            </div>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          {/* Main Calendar */}
          <div className={`flex-1 rounded-2xl shadow-sm border p-6 transition-colors ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            {/* Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <button onClick={goToday} className={`px-4 py-2 border rounded-lg text-sm font-medium ${dark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>Hari Ini</button>
                <button onClick={prevMonth} className={`p-2 hover:bg-slate-100 rounded-lg ${dark ? 'text-slate-400 hover:bg-slate-700 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'}`}><ChevronLeft size={18} /></button>
                <h2 className={`text-lg font-bold w-36 text-center ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{MONTHS[month]} {year}</h2>
                <button onClick={nextMonth} className={`p-2 hover:bg-slate-100 rounded-lg ${dark ? 'text-slate-400 hover:bg-slate-700 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'}`}><ChevronRight size={18} /></button>
              </div>
              <div className={`flex p-1 rounded-xl ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                {(['Bulan', 'Minggu', 'Hari'] as const).map(v => (
                  <button key={v} onClick={() => setView(v)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === v ? 'bg-indigo-600 text-white shadow-sm' : dark ? 'text-slate-300 hover:bg-slate-600' : 'text-slate-600 hover:bg-white'}`}>{v}</button>
                ))}
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS_SHORT.map(d => <div key={d} className={`text-center font-semibold text-sm py-2 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{d}</div>)}
            </div>

            {/* Calendar Grid */}
            <div className={`grid grid-cols-7 border-t border-l ${dark ? 'border-slate-700' : 'border-slate-100'}`}>
              {loading ? Array(35).fill(0).map((_, i) => (
                <div key={i} className={`h-28 border-r border-b p-2 ${dark ? 'border-slate-700' : 'border-slate-100'}`}>
                  <div className={`w-6 h-6 animate-pulse rounded-full mb-2 ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                </div>
              )) : cells.map((cell, i) => {
                const dayTasks = cell.isCurrentMonth ? getTasksForDay(cell.day) : [];
                const isCurrentDay = cell.isCurrentMonth && isToday(cell.day);
                return (
                  <div key={i} className={`h-28 border-r border-b p-1.5 overflow-hidden ${dark ? 'border-slate-700' : 'border-slate-100'} ${!cell.isCurrentMonth ? dark ? 'bg-slate-900/30' : 'bg-slate-50/40' : ''}`}>
                    <div className={`w-6 h-6 flex items-center justify-center text-xs font-medium mb-1 rounded-full ${isCurrentDay ? 'bg-indigo-600 text-white' : cell.isCurrentMonth ? dark ? 'text-slate-200' : 'text-slate-700' : dark ? 'text-slate-600' : 'text-slate-400'}`}>
                      {cell.day}
                    </div>
                    <div className="space-y-0.5">
                      {dayTasks.slice(0, 2).map(t => {
                        const col = priorityColor(t.priority, dark);
                        return (
                          <div key={t.id} className={`text-[10px] p-1 rounded border ${col.bg} truncate`}>
                            <span className={`inline-block w-1.5 h-1.5 rounded-full ${col.dot} mr-1`}></span>
                            {t.title}
                          </div>
                        );
                      })}
                      {dayTasks.length > 2 && <p className="text-[10px] text-slate-400 pl-1">+{dayTasks.length - 2} lagi</p>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className={`flex items-center gap-6 mt-5 pt-4 border-t text-xs flex-wrap ${dark ? 'border-slate-700' : 'border-slate-100'}`}>
              {[{ color: 'bg-red-500', label: 'Tinggi' }, { color: 'bg-amber-500', label: 'Sedang' }, { color: 'bg-emerald-500', label: 'Rendah' }].map(l => (
                <div key={l.label} className="flex items-center gap-2"><span className={`w-3 h-3 rounded-full ${l.color}`}></span><span className={dark ? 'text-slate-400' : 'text-slate-600'}>Prioritas {l.label}</span></div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-5 shrink-0">
            {/* Tombol yang udah dipasangin trigger modal */}
            <button
              onClick={() => setIsQuickAddOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white w-full justify-center py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-600/20"
            >
              <Plus size={20} /> Tambah Tugas
            </button>

            {/* Deadline Terdekat */}
            <div className={`p-5 rounded-2xl shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
              <h3 className={`font-bold mb-4 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Deadline Terdekat</h3>
              {loading ? <div className="space-y-3">{[1, 2, 3].map(i => <div key={i} className={`h-14 animate-pulse rounded-xl ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>)}</div>
                : upcoming.length === 0 ? <p className={`text-sm text-center py-4 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Tidak ada deadline 🎉</p>
                  : (
                    <div className="space-y-3">
                      {upcoming.map(t => {
                        const days = getDaysLeft(t.deadline);
                        return (
                          <div key={t.id} className="flex gap-3 items-center">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${days <= 2 ? (dark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-500') : days <= 7 ? (dark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-500') : (dark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-500')}`}>
                              <CalendarIcon size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-bold text-sm truncate ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t.title}</h4>
                              <p className={`text-xs truncate ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t.course?.name}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className={`text-xs font-semibold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{formatDate(t.deadline)}</p>
                              <p className={`text-xs font-bold ${getDaysLeftColor(days)}`}>{days} hari</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
            </div>

            {/* Ringkasan Bulan Ini */}
            <div className={`p-5 rounded-2xl shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
              <h3 className={`font-bold mb-4 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Ringkasan Bulan Ini</h3>
              {(() => {
                const monthTasks = tasks.filter(t => {
                  const d = new Date(t.deadline);
                  return d.getFullYear() === year && d.getMonth() === month;
                });
                const selesai = monthTasks.filter(t => t.status === 'Selesai').length;
                const proses = monthTasks.filter(t => t.status === 'Proses').length;
                const belum = monthTasks.filter(t => t.status === 'Belum Dikerjakan').length;
                return (
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-xl border text-center ${dark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-100'}`}>
                      <p className={`text-2xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{monthTasks.length}</p>
                      <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Total Tugas</p>
                    </div>
                    <div className={`p-3 rounded-xl border text-center ${dark ? 'bg-emerald-900/30 border-emerald-800' : 'bg-emerald-50 border-emerald-100'}`}>
                      <p className="text-2xl font-bold text-emerald-600">{selesai}</p>
                      <p className="text-xs text-emerald-600">Selesai</p>
                    </div>
                    <div className={`p-3 rounded-xl border text-center ${dark ? 'bg-amber-900/30 border-amber-800' : 'bg-amber-50 border-amber-100'}`}>
                      <p className="text-2xl font-bold text-amber-600">{proses}</p>
                      <p className="text-xs text-amber-600">Proses</p>
                    </div>
                    <div className={`p-3 rounded-xl border text-center ${dark ? 'bg-slate-700 border-slate-600' : 'bg-slate-50 border-slate-200'}`}>
                      <p className={`text-2xl font-bold ${dark ? 'text-slate-200' : 'text-slate-600'}`}>{belum}</p>
                      <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Belum</p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Panggil Modal Quick Add di luar div animate-in */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onSuccess={() => {
          fetchAll(); // Refresh data kalender biar tugas baru langsung muncul
        }}
        initialTab="task"
      />

    </>
  );
};

export default Kalender;