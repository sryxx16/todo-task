import React, { useState, useEffect } from 'react';
import { X, BookOpen, ListTodo, Calendar, Flag, User, GraduationCap, Plus, CheckCircle2 } from 'lucide-react';
import { courseApi, taskApi, type Course } from '../services/api';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'task' | 'course';
  onSuccess?: () => void;
}

const QuickAddModal: React.FC<QuickAddModalProps> = ({ isOpen, onClose, initialTab = 'task', onSuccess }) => {
  const [activeTab, setActiveTab] = useState<'task' | 'course'>(initialTab);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  
  // Task Form State
  const [taskForm, setTaskForm] = useState({
    course_id: 0,
    title: '',
    deadline: '',
    priority: 'Sedang' as 'Rendah' | 'Sedang' | 'Tinggi'
  });

  // Course Form State
  const [courseForm, setCourseForm] = useState({
    name: '',
    lecturer_name: '',
    semester: 6
  });

  useEffect(() => {
    if (isOpen) {
      fetchCourses();
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const fetchCourses = async () => {
    try {
      const res = await courseApi.getAll();
      setCourses(res.data.data);
    } catch (err) {
      console.error('Failed to fetch courses', err);
    }
  };

  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskForm.course_id || !taskForm.title || !taskForm.deadline) return;
    
    setLoading(true);
    try {
      await taskApi.create({
        course_id: taskForm.course_id,
        title: taskForm.title,
        deadline: taskForm.deadline,
        priority: taskForm.priority
      });
      setTaskForm({ course_id: 0, title: '', deadline: '', priority: 'Sedang' });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      alert('Gagal menambahkan tugas');
    } finally {
      setLoading(false);
    }
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.name.trim()) return;

    setLoading(true);
    try {
      await courseApi.create({
        name: courseForm.name,
        lecturer_name: courseForm.lecturer_name || undefined,
        semester: courseForm.semester
      });
      setCourseForm({ name: '', lecturer_name: '', semester: 6 });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      alert('Gagal menambahkan mata kuliah');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header with Tabs */}
        <div className="relative border-b border-slate-100">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>
          
          <div className="flex p-2">
            <button
              onClick={() => setActiveTab('task')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                activeTab === 'task' 
                ? 'bg-indigo-50 text-indigo-600' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <ListTodo size={20} />
              Tambah Tugas
            </button>
            <button
              onClick={() => setActiveTab('course')}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all ${
                activeTab === 'course' 
                ? 'bg-emerald-50 text-emerald-600' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <BookOpen size={20} />
              Tambah Matkul
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === 'task' ? (
            <form onSubmit={handleTaskSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-500" />
                  Mata Kuliah
                </label>
                <select 
                  required
                  value={taskForm.course_id}
                  onChange={e => setTaskForm({...taskForm, course_id: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700"
                >
                  <option value={0} disabled>Pilih mata kuliah...</option>
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Plus size={16} className="text-indigo-500" />
                  Judul Tugas
                </label>
                <input 
                  required
                  type="text"
                  placeholder="E.g. Membuat Laporan Akhir Praktikum"
                  value={taskForm.title}
                  onChange={e => setTaskForm({...taskForm, title: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-500" />
                    Deadline
                  </label>
                  <input 
                    required
                    type="date"
                    value={taskForm.deadline}
                    onChange={e => setTaskForm({...taskForm, deadline: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Flag size={16} className="text-indigo-500" />
                    Prioritas
                  </label>
                  <select 
                    value={taskForm.priority}
                    onChange={e => setTaskForm({...taskForm, priority: e.target.value as any})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700"
                  >
                    <option>Tinggi</option>
                    <option>Sedang</option>
                    <option>Rendah</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    Simpan Tugas
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleCourseSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <BookOpen size={16} className="text-emerald-500" />
                  Nama Mata Kuliah
                </label>
                <input 
                  required
                  type="text"
                  placeholder="E.g. Pemrograman Web Lanjut"
                  value={courseForm.name}
                  onChange={e => setCourseForm({...courseForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <User size={16} className="text-emerald-500" />
                  Nama Dosen
                </label>
                <input 
                  type="text"
                  placeholder="E.g. Dr. Surya Pratama"
                  value={courseForm.lecturer_name}
                  onChange={e => setCourseForm({...courseForm, lecturer_name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <GraduationCap size={16} className="text-emerald-500" />
                  Semester
                </label>
                <input 
                  required
                  type="number"
                  min={1}
                  max={14}
                  value={courseForm.semester}
                  onChange={e => setCourseForm({...courseForm, semester: Number(e.target.value)})}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-xl shadow-emerald-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <CheckCircle2 size={20} />
                    Tambah Mata Kuliah
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickAddModal;
