import { useEffect, useState } from 'react';
import { courseApi, type Course } from '../services/api';
import { BookOpen, Plus, User, GraduationCap, MoreVertical, Search, AlertCircle, Trash2, X, ChevronDown } from 'lucide-react';

const courseColors = [
    { bg: 'bg-indigo-50', icon: 'bg-indigo-600 text-white', bar: 'bg-indigo-600', badge: 'text-indigo-600' },
    { bg: 'bg-red-50', icon: 'bg-red-500 text-white', bar: 'bg-red-500', badge: 'text-red-600' },
    { bg: 'bg-emerald-50', icon: 'bg-emerald-600 text-white', bar: 'bg-emerald-600', badge: 'text-emerald-600' },
    { bg: 'bg-amber-50', icon: 'bg-amber-500 text-white', bar: 'bg-amber-500', badge: 'text-amber-600' },
    { bg: 'bg-blue-50', icon: 'bg-blue-600 text-white', bar: 'bg-blue-600', badge: 'text-blue-600' },
    { bg: 'bg-purple-50', icon: 'bg-purple-600 text-white', bar: 'bg-purple-600', badge: 'text-purple-600' },
];

const Matkul = () => {
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

    return (
        <>
            <div className="space-y-6 animate-in fade-in duration-500 pb-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">Mata Kuliah</h1>
                        <p className="text-slate-500 mt-1">Kelola semua mata kuliah yang sedang kamu ambil.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
                            <span className="text-sm font-medium">{today}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                            <img src="https://ui-avatars.com/api/?name=Surya&background=6366f1&color=fff" alt="Surya" className="w-8 h-8 rounded-full" />
                            <span className="font-medium text-slate-700">Surya</span>
                            <ChevronDown size={16} className="text-slate-400" />
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Cari mata kuliah..." value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
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
                        {[1, 2, 3].map(i => <div key={i} className="h-56 bg-slate-100 animate-pulse rounded-2xl"></div>)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                        <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-800">{search ? 'Mata kuliah tidak ditemukan' : 'Belum ada mata kuliah'}</h3>
                        <p className="text-slate-500">{search ? 'Coba kata kunci lain.' : 'Klik "Tambah Mata Kuliah" untuk memulai.'}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((course, idx) => {
                            const color = courseColors[idx % courseColors.length];
                            return (
                                <div key={course.id} className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                    <div className={`absolute -right-4 -top-4 w-24 h-24 ${color.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
                                    <div className="relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`p-3 ${color.icon} rounded-xl shadow-lg`}><BookOpen size={24} /></div>
                                            <div className="relative">
                                                <button onClick={() => setOpenMenuId(openMenuId === course.id ? null : course.id)} className="text-slate-400 hover:text-slate-600 p-1">
                                                    <MoreVertical size={20} />
                                                </button>
                                                {openMenuId === course.id && (
                                                    <div className="absolute right-0 top-8 bg-white rounded-xl border border-slate-100 shadow-xl z-10 min-w-[140px]">
                                                        <button onClick={() => { setDeleteConfirm(course); setOpenMenuId(null); }}
                                                            className="flex items-center gap-2 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 text-sm font-medium rounded-xl">
                                                            <Trash2 size={15} /> Hapus Matkul
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{course.name}</h3>
                                        <div className="space-y-1.5 mb-5">
                                            <div className="flex items-center gap-2 text-slate-500 text-sm"><User size={14} /><span>{course.lecturer_name || 'Dosen belum diatur'}</span></div>
                                            <div className="flex items-center gap-2 text-slate-500 text-sm"><GraduationCap size={14} /><span className={`${color.badge} font-semibold`}>Semester {course.semester}</span></div>
                                        </div>
                                        <div className="space-y-2 mb-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="font-medium text-slate-600">Progress Mata Kuliah</span>
                                                <span className={`font-bold ${color.badge}`}>{course.progress_percentage}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${color.bar} rounded-full transition-all duration-1000`} style={{ width: `${course.progress_percentage}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between text-sm text-center border-t border-slate-100 pt-4">
                                            <div><p className="text-xl font-bold text-slate-800">{course.total_tasks}</p><p className="text-xs text-slate-500">Total Tugas</p></div>
                                            <div><p className="text-xl font-bold text-amber-500">{course.in_progress_tasks}</p><p className="text-xs text-slate-500">Proses</p></div>
                                            <div><p className="text-xl font-bold text-emerald-500">{course.completed_tasks}</p><p className="text-xs text-slate-500">Selesai</p></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* --- SEMUA MODAL DILETAKKAN DI LUAR DIV ANIMASI --- */}

            {/* Modal Tambah Matkul */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center p-8 border-b border-slate-100 bg-slate-50/50">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Tambah Mata Kuliah</h2>
                                <p className="text-sm text-slate-500 mt-1">Lengkapi data untuk menambahkan matkul baru.</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleCreate} className="p-8 space-y-6">
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <BookOpen size={16} className="text-indigo-500" />
                                    Nama Mata Kuliah <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    placeholder="Contoh: Web Programming 2"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <User size={16} className="text-indigo-500" />
                                    Nama Dosen
                                </label>
                                <input
                                    type="text"
                                    value={form.lecturer_name}
                                    onChange={e => setForm({ ...form, lecturer_name: e.target.value })}
                                    placeholder="Contoh: Pak Budi Santoso"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <GraduationCap size={16} className="text-indigo-500" />
                                    Semester <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    min={1}
                                    max={14}
                                    value={form.semester}
                                    onChange={e => setForm({ ...form, semester: Number(e.target.value) })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                                />
                            </div>
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-4 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
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

            {/* Modal Konfirmasi Hapus */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999] p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
                        <div className="flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mx-auto mb-4"><Trash2 size={28} className="text-red-500" /></div>
                        <h3 className="text-xl font-bold text-slate-800 text-center mb-2">Hapus Mata Kuliah?</h3>
                        <p className="text-slate-500 text-center text-sm mb-6">Mata kuliah <strong>{deleteConfirm.name}</strong> dan semua tugasnya akan dihapus permanen.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50">Batal</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold">Ya, Hapus</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Matkul;