import { useEffect, useState } from 'react';
import { taskApi, courseApi, type Task, type Course } from '../services/api';
import { Search, Eye, Edit, Trash2, Plus, AlertCircle, X, ChevronDown, BookOpen, ListTodo, Calendar, Flag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const statusColors: Record<Task['status'], string> = {
  'Proses': 'bg-blue-50 text-blue-600',
  'Selesai': 'bg-emerald-50 text-emerald-600',
  'Belum Dikerjakan': 'bg-slate-100 text-slate-600',
};

const priorityColors: Record<Task['priority'], string> = {
  'Tinggi': 'bg-red-50 text-red-500',
  'Sedang': 'bg-amber-50 text-amber-500',
  'Rendah': 'bg-emerald-50 text-emerald-500',
};

const formatDate = (d: string) => new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
const isOverdue = (d: string) => new Date(d) < new Date();

const ITEMS_PER_PAGE = 7;

const Tugas = () => {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [search, setSearch] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [page, setPage] = useState(1);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState<Task | null>(null);
  const [showEditModal, setShowEditModal] = useState<Task | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Task | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({ course_id: 0, title: '', deadline: '', priority: 'Sedang' as Task['priority'] });
  const [editForm, setEditForm] = useState({ title: '', course_id: 0, deadline: '', priority: 'Sedang' as Task['priority'] });
  const [progressEdit, setProgressEdit] = useState({ progress: 0, status: 'Belum Dikerjakan' as Task['status'] });

  const fetchAll = async () => {
    try {
      const [taskRes, courseRes] = await Promise.all([taskApi.getAll(), courseApi.getAll()]);
      setTasks(taskRes.data.data);
      setCourses(courseRes.data.data);
    } catch {
      setError('Gagal memuat data. Pastikan Docker backend berjalan.');
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  // Filter + sort
  let filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchCourse = filterCourse ? String(t.course_id) === filterCourse : true;
    const matchStatus = filterStatus ? t.status === filterStatus : true;
    const matchPriority = filterPriority ? t.priority === filterPriority : true;
    return matchSearch && matchCourse && matchStatus && matchPriority;
  });

  if (sortBy === 'deadline') filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  else if (sortBy === 'priority') {
    const pOrder = { Tinggi: 0, Sedang: 1, Rendah: 2 };
    filtered.sort((a, b) => pOrder[a.priority] - pOrder[b.priority]);
  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.course_id || !form.title || !form.deadline) return;
    setSubmitting(true);
    try {
      await taskApi.create({ course_id: form.course_id, title: form.title, deadline: form.deadline, priority: form.priority });
      setShowAddModal(false);
      setForm({ course_id: 0, title: '', deadline: '', priority: 'Sedang' });
      fetchAll();
    } catch { alert('Gagal menambahkan tugas.'); }
    finally { setSubmitting(false); }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditModal) return;
    setSubmitting(true);
    try {
      await taskApi.update(showEditModal.id, { title: editForm.title, course_id: editForm.course_id, deadline: editForm.deadline, priority: editForm.priority });
      setShowEditModal(null);
      fetchAll();
    } catch { alert('Gagal mengupdate tugas.'); }
    finally { setSubmitting(false); }
  };

  const handleUpdateProgress = async () => {
    if (!showDetailModal) return;
    setSubmitting(true);
    try {
      await taskApi.updateProgress(showDetailModal.id, { progress: progressEdit.progress, status: progressEdit.status });
      setShowDetailModal(null);
      fetchAll();
    } catch { alert('Gagal update progress.'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (task: Task) => {
    try {
      await taskApi.delete(task.id);
      setDeleteConfirm(null);
      fetchAll();
    } catch { alert('Gagal menghapus tugas.'); }
  };

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <div className="space-y-6 animate-in fade-in duration-500 pb-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>Data Tugas</h1>
            <p className={`mt-1 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>Kelola semua tugas kuliah yang kamu miliki.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border ${dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-100 text-slate-500'}`}>
              <span className="text-sm font-medium">{today}</span>
            </div>
            <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg shadow-sm border ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
              <img src="https://ui-avatars.com/api/?name=Surya&background=6366f1&color=fff" alt="Surya" className="w-8 h-8 rounded-full" />
              <span className={`font-medium ${dark ? 'text-slate-200' : 'text-slate-700'}`}>Surya</span>
              <ChevronDown size={16} className={dark ? 'text-slate-500' : 'text-slate-400'} />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-600/20">
            <Plus size={20} /> Tambah Tugas
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <select value={filterCourse} onChange={e => { setFilterCourse(e.target.value); setPage(1); }}
            className={`px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
            <option value="">Semua Mata Kuliah</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1); }}
            className={`px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
            <option value="">Semua Status</option>
            <option>Belum Dikerjakan</option><option>Proses</option><option>Selesai</option>
          </select>
          <select value={filterPriority} onChange={e => { setFilterPriority(e.target.value); setPage(1); }}
            className={`px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
            <option value="">Semua Prioritas</option>
            <option>Tinggi</option><option>Sedang</option><option>Rendah</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            className={`px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
            <option value="deadline">Deadline Terdekat</option>
            <option value="priority">Prioritas</option>
          </select>
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" placeholder="Cari tugas..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
              className={`w-full pl-4 pr-10 py-2 border rounded-xl text-sm focus:outline-none focus:border-indigo-500 ${dark ? 'bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500' : 'bg-white border-slate-200'}`} />
          </div>
        </div>

        {error && <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-xl text-red-600"><AlertCircle size={20} /><p className="text-sm">{error}</p></div>}

        {/* Table */}
        <div className={`rounded-2xl shadow-sm border overflow-hidden transition-colors ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
          {loading ? (
            <div className="space-y-3 p-6">{[1, 2, 3, 4, 5].map(i => <div key={i} className={`h-12 animate-pulse rounded-xl ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>)}</div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-16">
              <p className={`font-medium ${dark ? 'text-slate-500' : 'text-slate-400'}`}>Tidak ada tugas yang ditemukan</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className={`border-b ${dark ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/50'}`}>
                    {['#', 'Tugas', 'Mata Kuliah', 'Deadline', 'Status', 'Progress', 'Prioritas', 'Aksi'].map(h => (
                      <th key={h} className={`py-4 px-4 font-semibold text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((task, i) => (
                    <tr key={task.id} className={`border-b transition-colors ${dark ? 'border-slate-700 hover:bg-slate-700/50' : 'border-slate-50 hover:bg-slate-50'}`}>
                      <td className={`py-4 px-4 text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{(page - 1) * ITEMS_PER_PAGE + i + 1}</td>
                      <td className="py-4 px-4">
                        <p className={`font-bold text-sm ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{task.title}</p>
                        <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{task.course?.name}</p>
                      </td>
                      <td className={`py-4 px-4 text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{task.course?.name}</td>
                      <td className={`py-4 px-4 font-semibold text-sm ${isOverdue(task.deadline) && task.status !== 'Selesai' ? 'text-red-500' : dark ? 'text-slate-300' : 'text-slate-600'}`}>{formatDate(task.deadline)}</td>
                      <td className="py-4 px-4"><span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[task.status]}`}>{task.status}</span></td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium w-8 ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{task.progress}%</span>
                          <div className={`w-20 h-1.5 rounded-full overflow-hidden ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                            <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${task.progress}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4"><span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${priorityColors[task.priority]}`}>{task.priority}</span></td>
                      <td className="py-4 px-4">
                        <div className="flex gap-1">
                          <button onClick={() => { setShowDetailModal(task); setProgressEdit({ progress: task.progress, status: task.status }); }}
                            className={`p-1.5 rounded-lg border transition-colors ${dark ? 'text-slate-400 hover:text-indigo-400 hover:bg-indigo-900/30 border-slate-600' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 border-slate-200'}`}><Eye size={15} /></button>
                          <button onClick={() => { setShowEditModal(task); setEditForm({ title: task.title, course_id: task.course_id, deadline: task.deadline.slice(0, 10), priority: task.priority }); }}
                            className={`p-1.5 rounded-lg border transition-colors ${dark ? 'text-slate-400 hover:text-blue-400 hover:bg-blue-900/30 border-slate-600' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 border-slate-200'}`}><Edit size={15} /></button>
                          <button onClick={() => setDeleteConfirm(task)}
                            className={`p-1.5 rounded-lg border transition-colors ${dark ? 'text-slate-400 hover:text-red-400 hover:bg-red-900/30 border-slate-600' : 'text-slate-400 hover:text-red-600 hover:bg-red-50 border-slate-200'}`}><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <div className={`flex justify-between items-center text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            <p>Menampilkan {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)} - {Math.min(page * ITEMS_PER_PAGE, filtered.length)} dari {filtered.length} tugas</p>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 ${dark ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'}`}>&lt;</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${page === i + 1 ? 'bg-indigo-600 text-white' : dark ? 'border border-slate-600 hover:bg-slate-700 text-slate-300' : 'border border-slate-200 hover:bg-slate-50 text-slate-600'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 ${dark ? 'border-slate-600 hover:bg-slate-700' : 'border-slate-200 hover:bg-slate-50'}`}>&gt;</button>
            </div>
          </div>
        )}
      </div>

      {/* --- SEMUA MODAL DITARUH DI SINI --- */}

      {/* Modal Tambah Tugas */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4 animate-in fade-in duration-300">
          <div className={`rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 ${dark ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center p-8 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Tambah Tugas Baru</h2>
                <p className="text-sm text-slate-500 mt-1">Lengkapi data untuk menambahkan tugas baru.</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-8 space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-500" />
                  Mata Kuliah <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={form.course_id}
                  onChange={e => setForm({ ...form, course_id: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700"
                >
                  <option value={0} disabled>Pilih mata kuliah...</option>
                  {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <ListTodo size={16} className="text-indigo-500" />
                  Judul Tugas <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Contoh: Tugas CRUD Laravel"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-500" />
                    Deadline <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    value={form.deadline}
                    onChange={e => setForm({ ...form, deadline: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Flag size={16} className="text-indigo-500" />
                    Prioritas
                  </label>
                  <select
                    value={form.priority}
                    onChange={e => setForm({ ...form, priority: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700"
                  >
                    <option>Tinggi</option>
                    <option>Sedang</option>
                    <option>Rendah</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Plus size={20} />
                      Simpan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Detail / Update Progress */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div className={`rounded-2xl shadow-2xl w-full max-w-md ${dark ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-800">Detail & Progress Tugas</h2>
              <button onClick={() => setShowDetailModal(null)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <p className="text-lg font-bold text-slate-800">{showDetailModal.title}</p>
                <p className="text-sm text-slate-500">{showDetailModal.course?.name}</p>
                <div className="flex gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[showDetailModal.status]}`}>{showDetailModal.status}</span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${priorityColors[showDetailModal.priority]}`}>{showDetailModal.priority}</span>
                </div>
                <p className="text-xs text-slate-500">Deadline: {formatDate(showDetailModal.deadline)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Progress: <span className="text-indigo-600 font-bold">{progressEdit.progress}%</span></label>
                <input type="range" min={0} max={100} value={progressEdit.progress}
                  onChange={e => setProgressEdit({ ...progressEdit, progress: Number(e.target.value) })}
                  className="w-full accent-indigo-600" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
                <select value={progressEdit.status} onChange={e => setProgressEdit({ ...progressEdit, status: e.target.value as Task['status'] })}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-700">
                  <option>Belum Dikerjakan</option><option>Proses</option><option>Selesai</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowDetailModal(null)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50">Tutup</button>
                <button onClick={handleUpdateProgress} disabled={submitting} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold disabled:opacity-60">
                  {submitting ? 'Menyimpan...' : 'Update Progress'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Tugas */}
      {showEditModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4 animate-in fade-in duration-300">
          <div className={`rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 ${dark ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center p-8 border-b border-slate-100 bg-slate-50/50">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">Edit Tugas</h2>
                <p className="text-sm text-slate-500 mt-1">Perbarui informasi tugas kamu.</p>
              </div>
              <button onClick={() => setShowEditModal(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleEdit} className="p-8 space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-500" />
                  Mata Kuliah
                </label>
                <select
                  value={editForm.course_id}
                  onChange={e => setEditForm({ ...editForm, course_id: Number(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700"
                >
                  {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <ListTodo size={16} className="text-indigo-500" />
                  Judul Tugas
                </label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-500" />
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={editForm.deadline}
                    onChange={e => setEditForm({ ...editForm, deadline: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Flag size={16} className="text-indigo-500" />
                    Prioritas
                  </label>
                  <select
                    value={editForm.priority}
                    onChange={e => setEditForm({ ...editForm, priority: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700"
                  >
                    <option>Tinggi</option>
                    <option>Sedang</option>
                    <option>Rendah</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(null)}
                  className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Edit size={20} />
                      Simpan Perubahan
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4">
          <div className={`rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center ${dark ? 'bg-slate-800' : 'bg-white'}`}>
            <div className="flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mx-auto mb-4"><Trash2 size={28} className="text-red-500" /></div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Hapus Tugas?</h3>
            <p className="text-slate-500 text-sm mb-6">Tugas <strong>{deleteConfirm.title}</strong> akan dihapus permanen.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50">Batal</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-semibold">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Tugas;