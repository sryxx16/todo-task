import { useEffect, useState } from 'react';
import { courseApi, type Course } from '../services/api';
import { BookOpen, Plus, User, GraduationCap, MoreVertical, Search, AlertCircle, Trash2, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import ProfileBadge from '../components/ProfileBadge';

const courseColors = [
    { bg: 'bg-indigo-50', icon: 'bg-indigo-600 text-white', bar: 'bg-indigo-600', badge: 'text-indigo-600' },
    { bg: 'bg-red-50', icon: 'bg-red-500 text-white', bar: 'bg-red-500', badge: 'text-red-600' },
    { bg: 'bg-emerald-50', icon: 'bg-emerald-600 text-white', bar: 'bg-emerald-600', badge: 'text-emerald-600' },
    { bg: 'bg-amber-50', icon: 'bg-amber-500 text-white', bar: 'bg-amber-500', badge: 'text-amber-600' },
    { bg: 'bg-blue-50', icon: 'bg-blue-600 text-white', bar: 'bg-blue-600', badge: 'text-blue-600' },
    { bg: 'bg-purple-50', icon: 'bg-purple-600 text-white', bar: 'bg-purple-600', badge: 'text-purple-600' },
];

const Matkul = () => {
    const { theme } = useTheme();
    const dark = theme === 'dark';
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [form, setForm] = useState({ name: '', lecturer_name: '', semester: 6 });
    const [submitting, setSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<Course | null>(null);

    const fetchCourses = async () => {
        try {
            const res = await courseApi.getAll();
            setCourses(res.data.data);
        } catch {
            setError('Gagal memuat mata kuliah. Pastikan backend Docker berjalan.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchCourses(); }, []);

    const filtered = courses.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.lecturer_name || '').toLowerCase().includes(search.toLowerCase())
    );

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name.trim()) return;
        setSubmitting(true);
        try {
            await courseApi.create({ name: form.name, lecturer_name: form.lecturer_name || undefined, semester: form.semester });
            setShowModal(false);
            setForm({ name: '', lecturer_name: '', semester: 6 });
            fetchCourses();
        } catch {
            alert('Gagal menambahkan mata kuliah.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (course: Course) => {
        try {
            await courseApi.delete(course.id);
            setDeleteConfirm(null);
            fetchCourses();
        } catch {
            alert('Gagal menghapus mata kuliah.');
        }
    };

    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    // Dark mode helpers
    const cardCls = dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100';
    const headingCls = dark ? 'text-slate-100' : 'text-slate-800';
    const subCls = dark ? 'text-slate-400' : 'text-slate-500';
    const headerBarCls = dark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-100 text-slate-500';
    const inputCls = dark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-white border-slate-200';

    return (
        <>
            <div className="space-y-6 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className={`text-3xl font-bold ${headingCls}`}>Mata Kuliah</h1>
                        <p className={`mt-1 ${subCls}`}>Kelola semua mata kuliah yang sedang kamu ambil.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border ${headerBarCls}`}>
                            <span className="text-sm font-medium">{today}</span>
                        </div>
                        <ProfileBadge dark={dark} />
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Cari mata kuliah..." value={search} onChange={e => setSearch(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 ${inputCls}`} />
                    </div>
                    <button onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20 whitespace-nowrap">
                        <Plus size={20} /> Tambah Mata Kuliah
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-xl text-red-600">
                        <AlertCircle size={20} /> <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Loading */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className={`h-56 animate-pulse rounded-2xl ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}></div>)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className={`text-center py-20 rounded-2xl border border-dashed ${dark ? 'bg-slate-800 border-slate-600' : 'bg-white border-slate-300'}`}>
                        <BookOpen size={48} className={`mx-auto mb-4 ${dark ? 'text-slate-600' : 'text-slate-300'}`} />
                        <h3 className={`text-lg font-bold ${headingCls}`}>{search ? 'Mata kuliah tidak ditemukan' : 'Belum ada mata kuliah'}</h3>
                        <p className={subCls}>{search ? 'Coba kata kunci lain.' : 'Klik "Tambah Mata Kuliah" untuk memulai.'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((course, idx) => {
                            const color = courseColors[idx % courseColors.length];
                            return (
                                <div key={course.id} className={`group rounded-2xl border p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${cardCls}`}>
                                    <div className={`absolute -right-4 -top-4 w-24 h-24 ${dark ? 'opacity-20' : 'opacity-50'} ${color.bg} rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                                    <div className="relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 ${color.icon} rounded-xl shadow-lg`}><BookOpen size={24} /></div>
                                            <div className="relative">
                                                <button onClick={() => setOpenMenuId(openMenuId === course.id ? null : course.id)} className={`p-1 ${dark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}>
                                                    <MoreVertical size={20} />
                                                </button>
                                                {openMenuId === course.id && (
                                                    <div className={`absolute right-0 top-8 rounded-xl border shadow-xl z-10 min-w-[140px] ${dark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-100'}`}>
                                                        <button onClick={() => { setDeleteConfirm(course); setOpenMenuId(null); }}
                                                            className="flex items-center gap-2 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 text-sm font-medium rounded-xl">
                                                            <Trash2 size={15} /> Hapus Matkul
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <h3 className={`text-xl font-bold mb-1 group-hover:text-indigo-600 transition-colors ${headingCls}`}>{course.name}</h3>
                                        <div className="space-y-1.5 mb-5">
                                            <div className={`flex items-center gap-2 text-sm ${subCls}`}><User size={14} /><span>{course.lecturer_name || 'Dosen belum diatur'}</span></div>
                                            <div className={`flex items-center gap-2 text-sm ${subCls}`}><GraduationCap size={14} /><span className={`${color.badge} font-semibold`}>Semester {course.semester}</span></div>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-sm">
                                                <span className={`font-medium ${dark ? 'text-slate-300' : 'text-slate-600'}`}>Progress Mata Kuliah</span>
                                                <span className={`font-bold ${color.badge}`}>{course.progress_percentage}%</span>
                                            </div>
                                            <div className={`w-full h-2 rounded-full overflow-hidden ${dark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                                                <div className={`h-full ${color.bar} rounded-full transition-all duration-1000`} style={{ width: `${course.progress_percentage}%` }}></div>
                                            </div>
                                        </div>
                                        <div className={`flex justify-between text-sm text-center border-t pt-4 ${dark ? 'border-slate-700' : 'border-slate-100'}`}>
                                            <div><p className={`text-xl font-bold ${headingCls}`}>{course.total_tasks}</p><p className={`text-xs ${subCls}`}>Total Tugas</p></div>
                                            <div><p className="text-xl font-bold text-amber-500">{course.in_progress_tasks}</p><p className={`text-xs ${subCls}`}>Proses</p></div>
                                            <div><p className="text-xl font-bold text-emerald-500">{course.completed_tasks}</p><p className={`text-xs ${subCls}`}>Selesai</p></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Modal Tambah Matkul */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4 animate-in fade-in duration-300">
                    <div className={`rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300 ${dark ? 'bg-slate-800' : 'bg-white'}`}>
                        <div className={`flex justify-between items-center p-8 border-b ${dark ? 'border-slate-700 bg-slate-800' : 'border-slate-100 bg-slate-50/50'}`}>
                            <div>
                                <h2 className={`text-2xl font-bold ${headingCls}`}>Tambah Mata Kuliah</h2>
                                <p className={`text-sm mt-1 ${subCls}`}>Lengkapi data untuk menambahkan matkul baru.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className={`p-2 rounded-xl transition-colors ${dark ? 'text-slate-400 hover:bg-slate-700' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="p-8 space-y-6">
                            <div className="space-y-1.5">
                                <label className={`text-sm font-bold flex items-center gap-2 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    <BookOpen size={16} className="text-indigo-500" />
                                    Nama Mata Kuliah <span className="text-red-500">*</span>
                                </label>
                                <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="Contoh: Web Programming 2"
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm ${dark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-slate-50 border-slate-200'}`} />
                            </div>
                            <div className="space-y-1.5">
                                <label className={`text-sm font-bold flex items-center gap-2 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    <User size={16} className="text-indigo-500" />
                                    Nama Dosen
                                </label>
                                <input type="text" value={form.lecturer_name} onChange={e => setForm({ ...form, lecturer_name: e.target.value })}
                                    placeholder="Contoh: Pak Budi Santoso"
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm ${dark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-slate-50 border-slate-200'}`} />
                            </div>
                            <div className="space-y-1.5">
                                <label className={`text-sm font-bold flex items-center gap-2 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                                    <GraduationCap size={16} className="text-indigo-500" />
                                    Semester <span className="text-red-500">*</span>
                                </label>
                                <input type="number" required min={1} max={14} value={form.semester} onChange={e => setForm({ ...form, semester: Number(e.target.value) })}
                                    className={`w-full px-4 py-3 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm ${dark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-slate-50 border-slate-200'}`} />
                            </div>
                            <div className="flex gap-4 pt-2">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className={`flex-1 py-4 border rounded-2xl font-bold transition-all active:scale-[0.98] ${dark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                    Batal
                                </button>
                                <button type="submit" disabled={submitting}
                                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2">
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

            {/* Modal Konfirmasi Hapus */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4 animate-in fade-in duration-300">
                    <div className={`rounded-2xl shadow-2xl w-full max-w-sm p-6 ${dark ? 'bg-slate-800' : 'bg-white'}`}>
                        <div className="flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mx-auto mb-4"><Trash2 size={28} className="text-red-500" /></div>
                        <h3 className={`text-xl font-bold text-center mb-2 ${headingCls}`}>Hapus Mata Kuliah?</h3>
                        <p className={`text-center text-sm mb-6 ${subCls}`}>Mata kuliah <strong>{deleteConfirm.name}</strong> dan semua tugasnya akan dihapus permanen.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className={`flex-1 py-2.5 border rounded-xl font-medium ${dark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>Batal</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold">Ya, Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Matkul;
