import {
  Search,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

const Tugas = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Data Tugas</h1>
          <p className="text-slate-500 mt-1">Kelola semua tugas kuliah yang kamu miliki.</p>
        </div>
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

      <div className="flex justify-end mb-4">
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20">
          <Plus size={20} />
          Tambah Tugas
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 w-48">
          <option>Semua Mata Kuliah</option>
        </select>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 w-40">
          <option>Semua Status</option>
        </select>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 w-40">
          <option>Semua Prioritas</option>
        </select>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 w-48">
          <option>Deadline Terdekat</option>
        </select>
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Cari tugas..."
            className="w-full pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-4 px-6 font-semibold text-slate-500 w-16">#</th>
              <th className="py-4 px-6 font-semibold text-slate-500">Tugas</th>
              <th className="py-4 px-6 font-semibold text-slate-500">Mata Kuliah</th>
              <th className="py-4 px-6 font-semibold text-slate-500">Deadline</th>
              <th className="py-4 px-6 font-semibold text-slate-500">Status</th>
              <th className="py-4 px-6 font-semibold text-slate-500">Progress</th>
              <th className="py-4 px-6 font-semibold text-slate-500">Prioritas</th>
              <th className="py-4 px-6 font-semibold text-slate-500 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 1, name: "Tugas CRUD Laravel", desc: "Membuat aplikasi CRUD data anggota...", matkul: "Web Programming 2", deadline: "30 Apr 2026", status: "Proses", progress: 70, prioritas: "Tinggi" },
              { id: 2, name: "Resume Jurnal IoT", desc: "Membuat resume jurnal tentang...", matkul: "Internet of Things", deadline: "28 Apr 2026", status: "Selesai", progress: 100, prioritas: "Sedang" },
              { id: 3, name: "ERD Database", desc: "Membuat ERD untuk sistem...", matkul: "Basis Data", deadline: "1 Mei 2026", status: "Belum Dikerjakan", progress: 0, prioritas: "Tinggi" },
              { id: 4, name: "UI/UX Design", desc: "Membuat desain UI aplikasi...", matkul: "Interaksi Manusia & Komputer", deadline: "3 Mei 2026", status: "Proses", progress: 40, prioritas: "Rendah" },
              { id: 5, name: "Laporan Akhir", desc: "Menyusun laporan akhir proyek...", matkul: "Proyek Akhir", deadline: "10 Mei 2026", status: "Belum Dikerjakan", progress: 0, prioritas: "Tinggi" },
              { id: 6, name: "Presentasi IoT", desc: "Membuat slide presentasi IoT", matkul: "Internet of Things", deadline: "12 Mei 2026", status: "Proses", progress: 60, prioritas: "Sedang" },
              { id: 7, name: "Normalisasi Database", desc: "Melakukan normalisasi hingga 3NF", matkul: "Basis Data", deadline: "15 Mei 2026", status: "Belum Dikerjakan", progress: 20, prioritas: "Rendah" }
            ].map((item, index) => (
              <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6 text-slate-800 font-medium">{index + 1}</td>
                <td className="py-4 px-6">
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </td>
                <td className="py-4 px-6 text-slate-600">{item.matkul}</td>
                <td className={`py-4 px-6 font-medium ${item.deadline === '30 Apr 2026' ? 'text-red-500' : 'text-slate-600'}`}>{item.deadline}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.status === 'Proses' ? 'bg-blue-50 text-blue-600' :
                    item.status === 'Selesai' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600 w-8">{item.progress}%</span>
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    item.prioritas === 'Tinggi' ? 'bg-red-50 text-red-500' :
                    item.prioritas === 'Sedang' ? 'bg-amber-50 text-amber-500' :
                    'bg-emerald-50 text-emerald-500'
                  }`}>
                    {item.prioritas}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200">
                      <Eye size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-slate-200">
                      <Edit size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-slate-200">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-slate-500">
        <p>Menampilkan 1 - 7 dari 24 tugas</p>
        <div className="flex gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400">&lt;</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium">1</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">2</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">3</button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600">&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default Tugas;
