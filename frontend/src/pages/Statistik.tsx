import { useEffect, useState } from 'react';
import { taskApi, courseApi, type Task, type Course } from '../services/api';
import { ClipboardList, Clock, RefreshCw, CheckCircle2, Calendar as CalendarIcon, CheckCircle, Target, ArrowUp, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

const Statistik = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [tRes, cRes] = await Promise.all([taskApi.getAll(), courseApi.getAll()]);
        setTasks(tRes.data.data);
        setCourses(cRes.data.data);
      } catch { setError('Gagal memuat data. Pastikan Docker backend berjalan.'); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, []);

  const total = tasks.length;
  const belum = tasks.filter(t => t.status === 'Belum Dikerjakan').length;
  const proses = tasks.filter(t => t.status === 'Proses').length;
  const selesai = tasks.filter(t => t.status === 'Selesai').length;
  const overallProgress = total > 0 ? Math.round(tasks.reduce((s, t) => s + t.progress, 0) / total) : 0;

  const tinggi = tasks.filter(t => t.priority === 'Tinggi').length;
  const sedang = tasks.filter(t => t.priority === 'Sedang').length;
  const rendah = tasks.filter(t => t.priority === 'Rendah').length;

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const LoadingSkeletons = () => (
    <div className="space-y-4">
      {[1,2,3].map(i => <div key={i} className={`h-24 animate-pulse rounded-2xl ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>)}
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Statistik</h1>
          <p className={`mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Lihat ringkasan dan perkembangan tugas kuliahmu.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border ${dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-100 text-slate-500'}`}>
            <CalendarIcon size={18} />
            <span className="text-sm font-medium">{today}</span>
          </div>
          <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <img src="https://ui-avatars.com/api/?name=Surya&background=6366f1&color=fff" alt="Surya" className="w-8 h-8 rounded-full" />
            <span className={`font-medium ${dark ? 'text-slate-200' : 'text-slate-700'}`}>Surya</span>
          </div>
        </div>
      </div>

      {error && <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-xl text-red-600"><AlertCircle size={20}/><p className="text-sm">{error}</p></div>}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label:'Total Tugas', value: total, sub:'Semua tugas', icon:<ClipboardList size={22}/>, color:'bg-indigo-50 text-indigo-500' },
          { label:'Belum Dikerjakan', value: belum, sub:`${total?Math.round(belum/total*100):0}% dari total`, icon:<Clock size={22}/>, color:'bg-amber-50 text-amber-500' },
          { label:'Sedang Dikerjakan', value: proses, sub:`${total?Math.round(proses/total*100):0}% dari total`, icon:<RefreshCw size={22}/>, color:'bg-blue-50 text-blue-500' },
          { label:'Selesai', value: selesai, sub:`${total?Math.round(selesai/total*100):0}% dari total`, icon:<CheckCircle2 size={22}/>, color:'bg-emerald-50 text-emerald-500' },
          { label:'Total Mata Kuliah', value: courses.length, sub:'Matkul aktif', icon:<CalendarIcon size={22}/>, color:'bg-purple-50 text-purple-500' },
        ].map(c => (
          <div key={c.label} className={`p-5 rounded-2xl shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2.5 ${c.color} rounded-xl shrink-0`}>{c.icon}</div>
              <p className={`text-xs font-semibold ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{c.label}</p>
            </div>
            <h3 className={`text-3xl font-bold mb-1 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{loading ? '—' : c.value}</h3>
            <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribusi Status */}
        <div className={`p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          <h2 className={`text-sm font-bold mb-6 w-full ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Distribusi Status Tugas</h2>
          {loading ? <LoadingSkeletons /> : (
            <>
              <div className="relative flex items-center justify-center w-36 h-36 mb-6">
                <svg className="w-36 h-36" viewBox="0 0 144 144">
                  {total > 0 ? (() => {
                    const r = 58; const circ = 2 * Math.PI * r;
                    const s1 = circ * (selesai / total);
                    const s2 = circ * (proses / total);
                    const s3 = circ - s1 - s2;
                    return (<>
                      <circle cx="72" cy="72" r={r} fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray={`${s1} ${circ}`} strokeDashoffset="0" transform="rotate(-90 72 72)"/>
                      <circle cx="72" cy="72" r={r} fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray={`${s2} ${circ}`} strokeDashoffset={`-${s1}`} transform="rotate(-90 72 72)"/>
                      <circle cx="72" cy="72" r={r} fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray={`${s3} ${circ}`} strokeDashoffset={`-${s1+s2}`} transform="rotate(-90 72 72)"/>
                    </>);
                  })() : <circle cx="72" cy="72" r="58" fill="none" stroke="#e2e8f0" strokeWidth="20"/>}
                  <text x="72" y="77" textAnchor="middle" fill={dark ? '#f1f5f9' : '#1e293b'} fontSize="22" fontWeight="800">{total}</text>
                </svg>
              </div>
              <div className="w-full space-y-2 text-sm">
                {[{color:'bg-emerald-500',label:'Selesai',val:selesai},{color:'bg-blue-500',label:'Proses',val:proses},{color:'bg-amber-500',label:'Belum Dikerjakan',val:belum}].map(item => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><span className={`w-3 h-3 rounded-full ${item.color}`}></span>{item.label}</span>
                    <span className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{item.val} tugas ({total?Math.round(item.val/total*100):0}%)</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Distribusi Prioritas */}
        <div className={`p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          <h2 className={`text-sm font-bold mb-6 w-full ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Tugas Berdasarkan Prioritas</h2>
          {loading ? <LoadingSkeletons /> : (
            <>
              <div className="relative flex items-center justify-center w-36 h-36 mb-6">
                <svg className="w-36 h-36" viewBox="0 0 144 144">
                  {total > 0 ? (() => {
                    const r = 58; const circ = 2 * Math.PI * r;
                    const s1 = circ * (tinggi / total);
                    const s2 = circ * (sedang / total);
                    const s3 = circ - s1 - s2;
                    return (<>
                      <circle cx="72" cy="72" r={r} fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray={`${s1} ${circ}`} strokeDashoffset="0" transform="rotate(-90 72 72)"/>
                      <circle cx="72" cy="72" r={r} fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray={`${s2} ${circ}`} strokeDashoffset={`-${s1}`} transform="rotate(-90 72 72)"/>
                      <circle cx="72" cy="72" r={r} fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray={`${s3} ${circ}`} strokeDashoffset={`-${s1+s2}`} transform="rotate(-90 72 72)"/>
                    </>);
                  })() : <circle cx="72" cy="72" r="58" fill="none" stroke="#e2e8f0" strokeWidth="20"/>}
                  <text x="72" y="77" textAnchor="middle" fill={dark ? '#f1f5f9' : '#1e293b'} fontSize="22" fontWeight="800">{total}</text>
                </svg>
              </div>
              <div className="w-full space-y-2 text-sm">
                {[{color:'bg-red-500',label:'Tinggi',val:tinggi},{color:'bg-amber-500',label:'Sedang',val:sedang},{color:'bg-emerald-500',label:'Rendah',val:rendah}].map(item => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="flex items-center gap-2"><span className={`w-3 h-3 rounded-full ${item.color}`}></span>{item.label}</span>
                    <span className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{item.val} tugas ({total?Math.round(item.val/total*100):0}%)</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Rata-rata Progress */}
        <div className={`p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          <h2 className={`text-sm font-bold w-full mb-6 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Rata-rata Progress Tugas</h2>
          {loading ? <LoadingSkeletons /> : (
            <>
              <div className="relative w-48 h-28 mb-4 overflow-hidden">
                <svg viewBox="0 0 200 110" className="w-full h-full">
                  <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e2e8f0" strokeWidth="20" strokeLinecap="round"/>
                  {overallProgress > 0 && (
                    <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#6366f1" strokeWidth="20" strokeLinecap="round"
                      strokeDasharray={`${2.83 * overallProgress} 283`} />
                  )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
                  <span className={`text-4xl font-black ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{overallProgress}%</span>
                  <span className={`text-xs font-medium ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Rata-rata Progress</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold">
                <ArrowUp size={14}/> Progress keseluruhan saat ini
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tugas per Matkul */}
      <div className={`p-6 rounded-2xl shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
        <h2 className={`text-sm font-bold mb-5 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Tugas per Mata Kuliah</h2>
        {loading ? <div className={`h-32 animate-pulse rounded-xl ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}></div> : courses.length === 0 ? (
          <p className={`text-sm text-center py-6 ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Belum ada mata kuliah</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className={`border-b ${dark ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                <th className="pb-3 font-medium">Mata Kuliah</th>
                <th className="pb-3 font-medium text-center">Total</th>
                <th className="pb-3 font-medium text-center">Selesai</th>
                <th className="pb-3 font-medium text-center">Proses</th>
                <th className="pb-3 font-medium text-right w-48">Progress</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id} className={`border-b transition-colors ${dark ? 'border-slate-700 hover:bg-slate-700/50' : 'border-slate-50 hover:bg-slate-50'}`}>
                  <td className={`py-3 font-medium ${dark ? 'text-slate-200' : 'text-slate-700'}`}>{c.name}</td>
                  <td className={`py-3 text-center ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{c.total_tasks}</td>
                  <td className="py-3 text-center text-emerald-600 font-semibold">{c.completed_tasks}</td>
                  <td className="py-3 text-center text-blue-600 font-semibold">{c.in_progress_tasks}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2 justify-end">
                      <div className={`w-24 h-2 rounded-full overflow-hidden ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}><div className="h-full bg-indigo-600 rounded-full" style={{width:`${c.progress_percentage}%`}}></div></div>
                      <span className={`text-xs w-8 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{c.progress_percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Insight */}
      {!loading && (
        <div className={`p-6 rounded-2xl shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          <h2 className={`text-lg font-bold mb-4 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Insight</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-500 shrink-0 shadow-sm"><CheckCircle size={16}/></div>
              <p className="text-xs text-emerald-800 font-medium leading-relaxed mt-1">
                {selesai > 0 ? `Kamu sudah menyelesaikan ${selesai} tugas. Pertahankan!` : 'Belum ada tugas yang selesai. Yuk mulai!'}
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-500 shrink-0 shadow-sm"><Clock size={16}/></div>
              <p className="text-xs text-amber-800 font-medium leading-relaxed mt-1">
                {belum > 0 ? `${belum} tugas belum dikerjakan. Atur waktumu agar deadline tidak terlewat.` : 'Semua tugas sudah mulai dikerjakan. '}
              </p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-500 shrink-0 shadow-sm"><Target size={16}/></div>
              <p className="text-xs text-indigo-800 font-medium leading-relaxed mt-1">
                {tinggi > 0 ? `Fokus pada ${tinggi} tugas prioritas tinggi agar produktivitasmu lebih maksimal!` : 'Tidak ada tugas prioritas tinggi saat ini. Bagus!'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistik;
