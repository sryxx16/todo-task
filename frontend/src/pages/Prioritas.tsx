import { useEffect, useState } from 'react';
import { taskApi, type Task } from '../services/api';
import { Flag, Eye, Edit, Trash2, ChevronDown, ChevronUp, Calendar as CalendarIcon, Clock, CheckCircle2, Target, AlertCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ProfileBadge from '../components/ProfileBadge';

const getDaysLeft = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
const getDaysColor = (d: number) => d <= 2 ? 'text-red-500' : d <= 7 ? 'text-amber-500' : 'text-emerald-500';
const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const statusColors: Record<Task['status'], string> = {
  'Proses': 'bg-blue-50 text-blue-600',
  'Selesai': 'bg-emerald-50 text-emerald-600',
  'Belum Dikerjakan': 'bg-slate-100 text-slate-600',
};

const PrioritasTable = ({ tasks, onView, onEdit, onDelete, dark }: { tasks: Task[]; onView: (t:Task)=>void; onEdit: (t:Task)=>void; onDelete: (t:Task)=>void; dark: boolean }) => (
  tasks.length === 0 ? <p className={`text-sm py-4 text-center ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Tidak ada tugas</p> : (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className={`border-b ${dark ? 'border-slate-700 text-slate-400' : 'border-slate-100 text-slate-500'}`}>
          <th className="pb-3 font-medium w-8"></th>
          <th className="pb-3 font-medium">Tugas</th>
          <th className="pb-3 font-medium">Mata Kuliah</th>
          <th className="pb-3 font-medium">Deadline</th>
          <th className="pb-3 font-medium">Status</th>
          <th className="pb-3 font-medium">Progress</th>
          <th className="pb-3 font-medium text-center">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map(t => (
          <tr key={t.id} className={`border-b transition-colors ${dark ? 'border-slate-700 hover:bg-slate-700/50' : 'border-slate-50 hover:bg-slate-50/50'}`}>
            <td className="py-3"><input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" /></td>
            <td className="py-3">
              <p className={`font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t.title}</p>
              <p className={`text-xs truncate max-w-[160px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t.course?.name}</p>
            </td>
            <td className={`py-3 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{t.course?.name}</td>
            <td className={`py-3 font-semibold ${new Date(t.deadline) < new Date() && t.status !== 'Selesai' ? 'text-red-500' : dark ? 'text-slate-300' : 'text-slate-600'}`}>{formatDate(t.deadline)}</td>
            <td className="py-3"><span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${statusColors[t.status]}`}>{t.status}</span></td>
            <td className="py-3 w-32">
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-medium w-8 ${dark ? 'text-slate-300' : ''}`}>{t.progress}%</span>
                <div className={`flex-1 h-1.5 rounded-full ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}><div className="h-full bg-indigo-600 rounded-full" style={{width:`${t.progress}%`}}></div></div>
              </div>
            </td>
            <td className="py-3">
              <div className="flex justify-center gap-1">
                <button onClick={()=>onView(t)} className={`p-1.5 rounded-lg ${dark ? 'text-slate-400 hover:text-indigo-400' : 'text-slate-400 hover:text-indigo-600'}`}><Eye size={15}/></button>
                <button onClick={()=>onEdit(t)} className={`p-1.5 rounded-lg ${dark ? 'text-slate-400 hover:text-blue-400' : 'text-slate-400 hover:text-blue-600'}`}><Edit size={15}/></button>
                <button onClick={()=>onDelete(t)} className={`p-1.5 rounded-lg ${dark ? 'text-slate-400 hover:text-red-400' : 'text-slate-400 hover:text-red-600'}`}><Trash2 size={15}/></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
);

const Prioritas = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState({ tinggi: true, sedang: true, rendah: true });
  const [searchFilter, setSearchFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchAll = async () => {
    try {
      const tRes = await taskApi.getAll();
      setTasks(tRes.data.data);
    } catch { setError('Gagal memuat data. Pastikan Docker backend berjalan.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(searchFilter.toLowerCase());
    const matchStatus = statusFilter ? t.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  const tinggi = filtered.filter(t => t.priority === 'Tinggi');
  const sedang = filtered.filter(t => t.priority === 'Sedang');
  const rendah = filtered.filter(t => t.priority === 'Rendah');
  const total = tasks.length;

  const upcoming = [...tasks].filter(t => t.status !== 'Selesai').sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()).slice(0, 3);

  const handleView = () => {};
  const handleEdit = () => {};
  const handleDelete = async (task: Task) => {
    if (!confirm(`Hapus tugas "${task.title}"?`)) return;
    try { await taskApi.delete(task.id); fetchAll(); } catch { alert('Gagal menghapus tugas.'); }
  };

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Prioritas</h1>
            <p className={`mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Kelola dan lihat tugas berdasarkan tingkat prioritasnya.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border ${dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-100 text-slate-500'}`}>
              <span className="text-sm font-medium">{today}</span>
            </div>
            <ProfileBadge dark={dark} showChevron={false} />
          </div>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Prioritas Tinggi', value: tasks.filter(t=>t.priority==='Tinggi').length, pct: total ? Math.round(tasks.filter(t=>t.priority==='Tinggi').length/total*100) : 0, color: 'bg-red-50 text-red-500', bar: 'bg-red-500' },
          { label: 'Prioritas Sedang', value: tasks.filter(t=>t.priority==='Sedang').length, pct: total ? Math.round(tasks.filter(t=>t.priority==='Sedang').length/total*100) : 0, color: 'bg-amber-50 text-amber-500', bar: 'bg-amber-500' },
          { label: 'Prioritas Rendah', value: tasks.filter(t=>t.priority==='Rendah').length, pct: total ? Math.round(tasks.filter(t=>t.priority==='Rendah').length/total*100) : 0, color: 'bg-emerald-50 text-emerald-500', bar: 'bg-emerald-500' },
          { label: 'Total Tugas', value: total, pct: 100, color: 'bg-indigo-50 text-indigo-500', bar: 'bg-indigo-500' },
        ].map(c => (
          <div key={c.label} className={`p-5 rounded-2xl shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2.5 ${c.color} rounded-xl`}><Flag size={22} /></div>
              <p className={`text-xs font-semibold ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{c.label}</p>
            </div>
            <h3 className={`text-3xl font-bold mb-1 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{c.value}</h3>
            <p className={`text-xs mb-3 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{c.pct}% dari total tugas</p>
            <div className={`w-full h-1 rounded-full ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}><div className={`h-full ${c.bar} rounded-full`} style={{width:`${c.pct}%`}}></div></div>
          </div>
        ))}
      </div>

      {error && <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-xl text-red-600"><AlertCircle size={20}/><p className="text-sm">{error}</p></div>}

      <div className="flex gap-6 items-start">
        {/* Main */}
        <div className="flex-1 space-y-5">
          {/* Controls */}
          <div className={`flex justify-between items-center p-3 rounded-2xl shadow-sm border gap-3 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="relative flex-1 max-w-xs">
              <input type="text" placeholder="Cari tugas..." value={searchFilter} onChange={e => setSearchFilter(e.target.value)}
                className={`w-full pl-4 pr-4 py-2 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${dark ? 'bg-slate-700 text-slate-200 placeholder-slate-500' : 'bg-slate-50'}`} />
            </div>
            <div className="flex gap-3">
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className={`px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${dark ? 'bg-slate-700 border-slate-600 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
                <option value="">Semua Status</option>
                <option>Belum Dikerjakan</option><option>Proses</option><option>Selesai</option>
              </select>
            </div>
          </div>

          {/* Tinggi */}
          <div className={`rounded-2xl shadow-sm border p-6 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => setExpanded(e => ({...e, tinggi: !e.tinggi}))}>
              {expanded.tinggi ? <ChevronDown size={20} className={dark ? 'text-slate-500' : 'text-slate-400'}/> : <ChevronUp size={20} className={dark ? 'text-slate-500' : 'text-slate-400'}/>}
              <h2 className={`text-lg font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Prioritas Tinggi</h2>
              <span className="px-2 py-0.5 bg-red-50 text-red-500 text-xs font-bold rounded-md">{tinggi.length} tugas</span>
            </div>
            {expanded.tinggi && !loading && <PrioritasTable tasks={tinggi} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} dark={dark} />}
            {loading && <div className={`h-24 animate-pulse rounded-xl ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>}
          </div>

          {/* Sedang */}
          <div className={`rounded-2xl shadow-sm border p-6 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => setExpanded(e => ({...e, sedang: !e.sedang}))}>
              {expanded.sedang ? <ChevronDown size={20} className={dark ? 'text-slate-500' : 'text-slate-400'}/> : <ChevronUp size={20} className={dark ? 'text-slate-500' : 'text-slate-400'}/>}
              <h2 className={`text-lg font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Prioritas Sedang</h2>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-500 text-xs font-bold rounded-md">{sedang.length} tugas</span>
            </div>
            {expanded.sedang && !loading && <PrioritasTable tasks={sedang} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} dark={dark} />}
            {loading && <div className={`h-24 animate-pulse rounded-xl ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>}
          </div>

          {/* Rendah */}
          <div className={`rounded-2xl shadow-sm border p-6 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={() => setExpanded(e => ({...e, rendah: !e.rendah}))}>
              {expanded.rendah ? <ChevronDown size={20} className={dark ? 'text-slate-500' : 'text-slate-400'}/> : <ChevronUp size={20} className={dark ? 'text-slate-500' : 'text-slate-400'}/>}
              <h2 className={`text-lg font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Prioritas Rendah</h2>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-500 text-xs font-bold rounded-md">{rendah.length} tugas</span>
            </div>
            {expanded.rendah && !loading && <PrioritasTable tasks={rendah} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} dark={dark} />}
            {loading && <div className={`h-24 animate-pulse rounded-xl ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 space-y-5 shrink-0">
          {/* Distribusi */}
          <div className={`p-5 rounded-2xl shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <h3 className={`text-sm font-bold mb-4 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Distribusi Prioritas</h3>
            <div className="flex items-center gap-4">
              <div className="relative flex items-center justify-center w-24 h-24 shrink-0">
                <svg className="w-24 h-24" viewBox="0 0 96 96">
                  {total > 0 ? (() => {
                    const r = 38; const circ = 2 * Math.PI * r;
                    const tinggiPct = tasks.filter(t=>t.priority==='Tinggi').length / total;
                    const sedangPct = tasks.filter(t=>t.priority==='Sedang').length / total;
                    const t1 = circ * tinggiPct;
                    const t2 = circ * sedangPct;
                    const t3 = circ - t1 - t2;
                    return (<>
                      <circle cx="48" cy="48" r={r} fill="none" stroke="#ef4444" strokeWidth="18" strokeDasharray={`${t1} ${circ}`} strokeDashoffset="0" transform="rotate(-90 48 48)" />
                      <circle cx="48" cy="48" r={r} fill="none" stroke="#f59e0b" strokeWidth="18" strokeDasharray={`${t2} ${circ}`} strokeDashoffset={`-${t1}`} transform="rotate(-90 48 48)" />
                      <circle cx="48" cy="48" r={r} fill="none" stroke="#10b981" strokeWidth="18" strokeDasharray={`${t3} ${circ}`} strokeDashoffset={`-${t1+t2}`} transform="rotate(-90 48 48)" />
                    </>);
                  })() : <circle cx="48" cy="48" r="38" fill="none" stroke={dark ? '#334155' : '#e2e8f0'} strokeWidth="18" />}
                  <text x="48" y="53" textAnchor="middle" className="text-lg font-black" fill={dark ? '#f1f5f9' : '#1e293b'} fontSize="16" fontWeight="800">{total}</text>
                </svg>
              </div>
              <div className="space-y-2.5 flex-1 text-xs">
                <div className="flex justify-between items-center"><span className={`flex items-center gap-1.5 ${dark ? 'text-slate-300' : ''}`}><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>Tinggi</span><span className={dark ? 'text-slate-400' : 'text-slate-500'}>{tasks.filter(t=>t.priority==='Tinggi').length} ({total?Math.round(tasks.filter(t=>t.priority==='Tinggi').length/total*100):0}%)</span></div>
                <div className="flex justify-between items-center"><span className={`flex items-center gap-1.5 ${dark ? 'text-slate-300' : ''}`}><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>Sedang</span><span className={dark ? 'text-slate-400' : 'text-slate-500'}>{tasks.filter(t=>t.priority==='Sedang').length} ({total?Math.round(tasks.filter(t=>t.priority==='Sedang').length/total*100):0}%)</span></div>
                <div className="flex justify-between items-center"><span className={`flex items-center gap-1.5 ${dark ? 'text-slate-300' : ''}`}><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Rendah</span><span className={dark ? 'text-slate-400' : 'text-slate-500'}>{tasks.filter(t=>t.priority==='Rendah').length} ({total?Math.round(tasks.filter(t=>t.priority==='Rendah').length/total*100):0}%)</span></div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className={`p-5 rounded-2xl shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <h3 className={`text-sm font-bold mb-4 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Tips Prioritas</h3>
            <div className="space-y-3">
              {[
                { icon: <Flag size={14}/>, color: dark ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-500', text: 'Kerjakan tugas prioritas tinggi terlebih dahulu' },
                { icon: <Clock size={14}/>, color: dark ? 'bg-amber-900/30 text-amber-400' : 'bg-amber-50 text-amber-500', text: 'Pastikan tugas dengan deadline dekat tidak terlewat' },
                { icon: <CheckCircle2 size={14}/>, color: dark ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-500', text: 'Selesaikan tugas sedang sebelum menambah tugas baru' },
                { icon: <Target size={14}/>, color: dark ? 'bg-indigo-900/30 text-indigo-400' : 'bg-indigo-50 text-indigo-500', text: 'Prioritas bisa diubah sesuai dengan kebutuhanmu' },
              ].map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tip.color}`}>{tip.icon}</div>
                  <p className={`text-xs leading-relaxed mt-1 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{tip.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deadline Terdekat */}
          <div className={`p-5 rounded-2xl shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <h3 className={`text-sm font-bold mb-4 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Deadline Terdekat</h3>
            <div className="space-y-3">
              {upcoming.map(t => {
                const days = getDaysLeft(t.deadline);
                return (
                  <div key={t.id} className="flex gap-3 items-center">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${days<=2?(dark?'bg-red-900/30 text-red-400':'bg-red-50 text-red-500'):days<=7?(dark?'bg-amber-900/30 text-amber-400':'bg-amber-50 text-amber-500'):(dark?'bg-emerald-900/30 text-emerald-400':'bg-emerald-50 text-emerald-500')}`}><CalendarIcon size={16}/></div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-xs truncate ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t.title}</h4>
                      <p className={`text-[11px] truncate ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t.course?.name}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-[11px] font-semibold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{formatDate(t.deadline)}</p>
                      <p className={`text-[11px] font-bold ${getDaysColor(days)}`}>{days} hari</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prioritas;
