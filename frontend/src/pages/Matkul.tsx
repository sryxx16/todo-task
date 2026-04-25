import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    BookOpen,
    Plus,
    User,
    GraduationCap,
    MoreVertical,
    Search
} from 'lucide-react';

const Matkul = () => {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Tarik data dari API Course yang udah kita bikin di Laravel
        axios.get('http://localhost/api/courses')
            .then((res) => {
                setCourses(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal ambil data matkul:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header & Action */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Mata Kuliah</h1>
                    <p className="text-slate-500 mt-1">Kelola semua mata kuliah yang sedang kamu ambil.</p>
                </div>

                {/* Tanggal & Profil */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        <span className="text-sm font-medium">Rabu, 21 Mei 2026</span>
                    </div>
                    <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 cursor-pointer">
                        <img src="https://ui-avatars.com/api/?name=Surya&background=0D8ABC&color=fff" alt="Surya" className="w-8 h-8 rounded-full" />
                        <span className="font-medium text-slate-700">Surya</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <div className="relative flex-1 w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari mata kuliah..."
                        className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                    <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20 w-full sm:w-auto">
                        <Plus size={20} />
                        <span className="inline">Tambah Mata Kuliah</span>
                    </button>
                    <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 text-sm hidden sm:block">
                        <option>Urutkan Terbaru</option>
                    </select>
                </div>
            </div>

            {/* Grid List Mata Kuliah */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-2xl"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            {/* Dekorasi Background */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>

                            <div className="relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-600/30">
                                        <BookOpen size={24} />
                                    </div>
                                    <button className="text-slate-400 hover:text-slate-600 p-1">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                                    {course.name}
                                </h3>

                                <div className="space-y-2 mb-6">
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <User size={14} />
                                        <span>{course.lecturer_name || 'Dosen Belum Diatur'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <GraduationCap size={14} />
                                        <span>Semester {course.semester}</span>
                                    </div>
                                </div>

                                {/* Progress Section */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-slate-600">Progress Tugas</span>
                                        <span className="font-bold text-blue-600">{course.progress_percentage}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${course.progress_percentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-xs text-slate-400 mt-1">
                                        {course.completed_tasks} dari {course.total_tasks} tugas selesai
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && courses.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                    <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-lg font-bold text-slate-800">Belum ada mata kuliah</h3>
                    <p className="text-slate-500">Klik tombol "Tambah Matkul" untuk memulai.</p>
                </div>
            )}
        </div>
    );
};

export default Matkul;