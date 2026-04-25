import { useEffect, useState } from "react";
import { dashboardApi, courseApi, type DashboardData, type Course } from "../services/api";
import { ClipboardList, Clock, RefreshCw, CheckCircle2, Calendar as CalendarIcon, BookOpen, Wifi, Database, Users, FileText, CheckCircle, Plus, AlertCircle } from "lucide-react";

const getCourseIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('web') || lower.includes('program')) return <BookOpen size={14} />;
  if (lower.includes('iot') || lower.includes('internet')) return <Wifi size={14} />;
  if (lower.includes('data') || lower.includes('basis')) return <Database size={14} />;
  if (lower.includes('manusia') || lower.includes('komputer')) return <Users size={14} />;
  return <FileText size={14} />;
};

const iconColors = ['bg-indigo-50 text-indigo-600','bg-red-50 text-red-500','bg-emerald-50 text-emerald-600','bg-amber-50 text-amber-600','bg-blue-50 text-blue-600'];

const getDaysLeft = (deadline: string) => Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
const getDaysLeftColor = (days: number) => days <= 2 ? 'text-red-500' : days <= 7 ? 'text-amber-500' : 'text-emerald-500';
const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const Dashboard = () => {
  const [dashData, setDashData] = useState<DashboardData | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dashRes, courseRes] = await Promise.all([dashboardApi.get(), courseApi.getAll()]);
        setDashData(dashRes.data.data);
        setCourses(courseRes.data.data);
      } catch {
        setError('Gagal memuat data. Pastikan backend Docker sudah berjalan.');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const stats = dashData?.statistics;
  const deadlines = dashData?.upcoming_deadlines || [];
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-500 font-medium">Memuat Dashboard...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
      <AlertCircle size={48} className="text-red-400" />
      <p className="text-slate-700 font-semibold">{error}</p>
      <button onClick={() => window.location.reload()} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium">Coba Lagi</button>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">Selamat datang, Surya <span className="animate-bounce">👋</span></h1>
          <p className="text-slate-500 mt-1">Kelola tugas kuliahmu dengan lebih terstruktur dan produktif.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
            <CalendarIcon size={18} />
            <span className="text-sm font-medium">{today}</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
            <img src="https://ui-avatars.com/api/?name=Surya&background=6366f1&color=fff" alt="Surya" className="w-8 h-8 rounded-full" />
            <span className="font-medium text-slate-700">Surya</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total Tugas', value: stats?.total ?? 0, sub: 'Semua tugas kamu', icon: <ClipboardList size={24} />, color: 'bg-indigo-50 text-indigo-500' },
          { label: 'Belum Dikerjakan', value: stats?.belum_dikerjakan ?? 0, sub: 'Tugas belum dimulai', icon: <Clock size={24} />, color: 'bg-amber-50 text-amber-500' },
          { label: 'Sedang Dikerjakan', value: stats?.proses ?? 0, sub: 'Tugas dalam proses', icon: <RefreshCw size={24} />, color: 'bg-blue-50 text-blue-500' },
          { label: 'Selesai', value: stats?.selesai ?? 0, sub: 'Tugas selesai', icon: <CheckCircle2 size={24} />, color: 'bg-emerald-50 text-emerald-500' },
        ].map(c => (
          <div key={c.label} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2.5 ${c.color} rounded-xl shrink-0`}>{c.icon}</div>
              <p className="text-xs font-semibold text-slate-500 pt-1">{c.label}</p>
            </div>
            <h3 className="text-3xl font-bold text-slate-800 mb-1">{c.value}</h3>
            <p className="text-xs text-slate-500">{c.sub}</p>
          </div>
        ))}
        {/* Deadline card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2.5 bg-red-50 text-red-500 rounded-xl shrink-0"><CalendarIcon size={24} /></div>
            <p className="text-xs font-semibold text-slate-500 pt-1">Deadline Terdekat</p>
          </div>
          {deadlines.length > 0 ? (
            <>
              <h3 className="text-xl font-bold text-red-500 mb-1">{getDaysLeft(deadlines[0].deadline)} Hari Lagi</h3>
              <p className="text-xs text-slate-800 font-medium mb-1 truncate">{deadlines[0].title}</p>
              <p className="text-xs font-bold text-red-400">{formatDate(deadlines[0].deadline)}</p>
            </>
          ) : (
            <p className="text-sm text-slate-500 mt-2">Tidak ada deadline 🎉</p>
          )}
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Keseluruhan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Progress Keseluruhan</h2>
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center w-36 h-36 shrink-0">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 144 144">
                <circle cx="72" cy="72" r="60" stroke="#e2e8f0" strokeWidth="12" fill="transparent" />
                <circle cx="72" cy="72" r="60" stroke="#6366f1" strokeWidth="12" fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - (stats?.overall_progress ?? 0) / 100)}`}
                  strokeLinecap="round" />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-800">{stats?.overall_progress ?? 0}%</span>
                <span className="text-xs text-slate-500 mt-0.5">Total Progres</span>
              </div>
            </div>
            <div className="space-y-4 flex-1">
              {[
                { label: 'Selesai', color: 'bg-emerald-500', count: stats?.selesai ?? 0 },
                { label: 'Proses', color: 'bg-blue-500', count: stats?.proses ?? 0 },
                { label: 'Belum', color: 'bg-amber-500', count: stats?.belum_dikerjakan ?? 0 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${item.color}`}></span>{item.label}</span>
                    <span className="font-medium">{stats?.total ? Math.round((item.count / stats.total) * 100) : 0}%</span>
                  </div>
                  <p className="text-xs text-slate-500 ml-3.5">{item.count} tugas</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-600 font-medium">Terus semangat! 💪</p>
        </div>

        {/* Tugas Deadline Terdekat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Tugas Deadline Terdekat</h2>
          </div>
          <div className="space-y-4">
            {deadlines.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle size={40} className="mx-auto text-emerald-300 mb-3" />
                <p className="text-slate-500 text-sm">Tidak ada deadline mepet! 🎉</p>
              </div>
            ) : deadlines.map(task => {
              const days = getDaysLeft(task.deadline);
              return (
                <div key={task.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${days <= 2 ? 'bg-red-50 text-red-500' : days <= 7 ? 'bg-amber-50 text-amber-500' : 'bg-blue-50 text-blue-500'}`}>
                      <CalendarIcon size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm truncate max-w-[140px]">{task.title}</h4>
                      <p className="text-xs text-slate-500">{task.course?.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-slate-800">{formatDate(task.deadline)}</p>
                    <p className={`text-xs font-bold mt-0.5 ${getDaysLeftColor(days)}`}>{days} hari lagi</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tugas per Mata Kuliah */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Tugas per Mata Kuliah</h2>
          </div>
          {courses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen size={40} className="mx-auto text-slate-200 mb-3" />
              <p className="text-slate-500 text-sm">Belum ada mata kuliah</p>
            </div>
          ) : (
            <div className="space-y-5">
              {courses.slice(0, 5).map((course, idx) => (
                <div key={course.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColors[idx % iconColors.length]}`}>{getCourseIcon(course.name)}</div>
                      <span className="text-sm font-semibold text-slate-800 truncate">{course.name}</span>
                    </div>
                    <span className="text-xs font-medium text-slate-500 shrink-0 ml-2">{course.completed_tasks}/{course.total_tasks}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${course.progress_percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {stats?.total === 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center">
          <Plus size={40} className="mx-auto text-indigo-400 mb-3" />
          <h3 className="text-lg font-bold text-indigo-800 mb-2">Mulai dari sini!</h3>
          <p className="text-indigo-600 text-sm">Tambahkan mata kuliah dan tugas pertama kamu untuk melihat dashboard yang aktif.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
