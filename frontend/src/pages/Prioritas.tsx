import {
  Search,
  Download,
  Flag,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  Target
} from "lucide-react";

const Prioritas = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Prioritas</h1>
          <p className="text-slate-500 mt-1">Kelola dan lihat tugas berdasarkan tingkat prioritasnya.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
            <CalendarIcon size={18} />
            <span className="text-sm font-medium">Rabu, 21 Mei 2026</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100 cursor-pointer">
            <img src="https://ui-avatars.com/api/?name=Surya&background=0D8ABC&color=fff" alt="Surya" className="w-8 h-8 rounded-full" />
            <span className="font-medium text-slate-700">Surya</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tinggi */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2.5 bg-red-50 text-red-500 rounded-xl">
              <Flag size={24} />
            </div>
            <p className="text-xs font-semibold text-slate-500">Prioritas Tinggi</p>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">9</h3>
          <p className="text-xs text-slate-500 mb-2">38% dari total tugas</p>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-3">
             <div className="h-full bg-red-500 rounded-full" style={{ width: '38%' }}></div>
          </div>
        </div>

        {/* Sedang */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl">
              <Flag size={24} />
            </div>
            <p className="text-xs font-semibold text-slate-500">Prioritas Sedang</p>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">10</h3>
          <p className="text-xs text-slate-500 mb-2">42% dari total tugas</p>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-3">
             <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }}></div>
          </div>
        </div>

        {/* Rendah */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl">
              <Flag size={24} />
            </div>
            <p className="text-xs font-semibold text-slate-500">Prioritas Rendah</p>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">5</h3>
          <p className="text-xs text-slate-500 mb-2">20% dari total tugas</p>
           <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-3">
             <div className="h-full bg-emerald-500 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>

        {/* Total */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
             <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </div>
            <p className="text-xs font-semibold text-slate-500">Total Tugas</p>
          </div>
          <h3 className="text-3xl font-bold text-slate-800 mb-1">24</h3>
          <p className="text-xs text-slate-500 mb-2">Semua tugas</p>
           <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-3">
             <div className="h-full bg-indigo-500 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Controls */}
          <div className="flex justify-between items-center bg-white p-3 rounded-2xl shadow-sm border border-slate-100">
             <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Cari tugas..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                />
              </div>
              <div className="flex items-center gap-3">
                 <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 text-sm">
                  <option>Semua Mata Kuliah</option>
                </select>
                <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 text-sm">
                  <option>Semua Status</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 border border-indigo-200 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-50 transition-colors">
                  <Download size={16} /> Export
                </button>
              </div>
          </div>

          {/* List Prioritas Tinggi */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <ChevronDown className="text-slate-400 cursor-pointer" size={20} />
              <h2 className="text-lg font-bold text-slate-800">Prioritas Tinggi</h2>
              <span className="px-2 py-0.5 bg-red-50 text-red-500 text-xs font-semibold rounded-md">9 tugas</span>
            </div>
            
            <table className="w-full text-left text-sm mb-4">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
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
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                   <td className="py-3"><input type="checkbox" className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" /></td>
                   <td className="py-3">
                     <p className="font-bold text-slate-800">Tugas CRUD Laravel</p>
                     <p className="text-xs text-slate-500">Membuat aplikasi CRUD data anggota</p>
                   </td>
                   <td className="py-3 text-slate-600">Web Programming 2</td>
                   <td className="py-3 font-semibold text-red-500">30 Apr 2026</td>
                   <td className="py-3"><span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md">Proses</span></td>
                   <td className="py-3 w-32">
                     <div className="flex items-center gap-2 text-xs">
                       <span className="font-medium">70%</span>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-indigo-600 rounded-full" style={{width:'70%'}}></div></div>
                     </div>
                   </td>
                   <td className="py-3">
                     <div className="flex justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"><Edit size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                   </td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                   <td className="py-3"><input type="checkbox" className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" /></td>
                   <td className="py-3">
                     <p className="font-bold text-slate-800">ERD Database</p>
                     <p className="text-xs text-slate-500">Membuat ERD untuk sistem perpustakaan</p>
                   </td>
                   <td className="py-3 text-slate-600">Basis Data</td>
                   <td className="py-3 font-semibold text-slate-600">1 Mei 2026</td>
                   <td className="py-3"><span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">Belum Dikerjakan</span></td>
                   <td className="py-3 w-32">
                     <div className="flex items-center gap-2 text-xs">
                       <span className="font-medium">0%</span>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-slate-300 rounded-full" style={{width:'0%'}}></div></div>
                     </div>
                   </td>
                   <td className="py-3">
                     <div className="flex justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"><Edit size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                   </td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                   <td className="py-3"><input type="checkbox" className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" /></td>
                   <td className="py-3">
                     <p className="font-bold text-slate-800">Proyek Akhir</p>
                     <p className="text-xs text-slate-500">Menyusun laporan dan presentasi</p>
                   </td>
                   <td className="py-3 text-slate-600">Proyek Akhir</td>
                   <td className="py-3 font-semibold text-slate-600">10 Mei 2026</td>
                   <td className="py-3"><span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">Belum Dikerjakan</span></td>
                   <td className="py-3 w-32">
                     <div className="flex items-center gap-2 text-xs">
                       <span className="font-medium">0%</span>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-slate-300 rounded-full" style={{width:'0%'}}></div></div>
                     </div>
                   </td>
                   <td className="py-3">
                     <div className="flex justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"><Edit size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                   </td>
                </tr>
              </tbody>
            </table>
            <div className="text-center">
              <button className="text-xs font-medium text-indigo-600 hover:underline flex items-center justify-center gap-1 mx-auto">Lihat semua <ChevronDown size={14}/></button>
            </div>
          </div>

          {/* List Prioritas Sedang */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <ChevronDown className="text-slate-400 cursor-pointer" size={20} />
              <h2 className="text-lg font-bold text-slate-800">Prioritas Sedang</h2>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-500 text-xs font-semibold rounded-md">10 tugas</span>
            </div>
             <table className="w-full text-left text-sm mb-4">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
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
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                   <td className="py-3"><input type="checkbox" className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" /></td>
                   <td className="py-3">
                     <p className="font-bold text-slate-800">Resume Jurnal IoT</p>
                     <p className="text-xs text-slate-500">Membuat resume jurnal tentang IoT</p>
                   </td>
                   <td className="py-3 text-slate-600">Internet of Things</td>
                   <td className="py-3 font-semibold text-slate-600">28 Apr 2026</td>
                   <td className="py-3"><span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-md">Selesai</span></td>
                   <td className="py-3 w-32">
                     <div className="flex items-center gap-2 text-xs">
                       <span className="font-medium">100%</span>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-indigo-600 rounded-full" style={{width:'100%'}}></div></div>
                     </div>
                   </td>
                   <td className="py-3">
                     <div className="flex justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"><Edit size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                   </td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                   <td className="py-3"><input type="checkbox" className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" /></td>
                   <td className="py-3">
                     <p className="font-bold text-slate-800">UI/UX Design</p>
                     <p className="text-xs text-slate-500">Membuat desain UI aplikasi</p>
                   </td>
                   <td className="py-3 text-slate-600">Interaksi Manusia & Komputer</td>
                   <td className="py-3 font-semibold text-slate-600">3 Mei 2026</td>
                   <td className="py-3"><span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md">Proses</span></td>
                   <td className="py-3 w-32">
                     <div className="flex items-center gap-2 text-xs">
                       <span className="font-medium">40%</span>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-indigo-600 rounded-full" style={{width:'40%'}}></div></div>
                     </div>
                   </td>
                   <td className="py-3">
                     <div className="flex justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"><Edit size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                   </td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                   <td className="py-3"><input type="checkbox" className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" /></td>
                   <td className="py-3">
                     <p className="font-bold text-slate-800">Presentasi IoT</p>
                     <p className="text-xs text-slate-500">Membuat slide presentasi IoT</p>
                   </td>
                   <td className="py-3 text-slate-600">Internet of Things</td>
                   <td className="py-3 font-semibold text-slate-600">12 Mei 2026</td>
                   <td className="py-3"><span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md">Proses</span></td>
                   <td className="py-3 w-32">
                     <div className="flex items-center gap-2 text-xs">
                       <span className="font-medium">60%</span>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-indigo-600 rounded-full" style={{width:'60%'}}></div></div>
                     </div>
                   </td>
                   <td className="py-3">
                     <div className="flex justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"><Edit size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                   </td>
                </tr>
              </tbody>
            </table>
             <div className="text-center">
              <button className="text-xs font-medium text-indigo-600 hover:underline flex items-center justify-center gap-1 mx-auto">Lihat semua <ChevronDown size={14}/></button>
            </div>
          </div>

          {/* List Prioritas Rendah */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <ChevronDown className="text-slate-400 cursor-pointer" size={20} />
              <h2 className="text-lg font-bold text-slate-800">Prioritas Rendah</h2>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-500 text-xs font-semibold rounded-md">5 tugas</span>
            </div>
             <table className="w-full text-left text-sm mb-4">
              <thead>
                <tr className="border-b border-slate-100 text-slate-500">
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
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                   <td className="py-3"><input type="checkbox" className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" /></td>
                   <td className="py-3">
                     <p className="font-bold text-slate-800">Normalisasi Database</p>
                     <p className="text-xs text-slate-500">Melakukan normalisasi hingga 3NF</p>
                   </td>
                   <td className="py-3 text-slate-600">Basis Data</td>
                   <td className="py-3 font-semibold text-slate-600">15 Mei 2026</td>
                   <td className="py-3"><span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md">Proses</span></td>
                   <td className="py-3 w-32">
                     <div className="flex items-center gap-2 text-xs">
                       <span className="font-medium">20%</span>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-indigo-600 rounded-full" style={{width:'20%'}}></div></div>
                     </div>
                   </td>
                   <td className="py-3">
                     <div className="flex justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"><Edit size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                   </td>
                </tr>
                <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                   <td className="py-3"><input type="checkbox" className="rounded text-indigo-600 border-slate-300 focus:ring-indigo-500" /></td>
                   <td className="py-3">
                     <p className="font-bold text-slate-800">Laporan Basis Data</p>
                     <p className="text-xs text-slate-500">Membuat laporan praktikum</p>
                   </td>
                   <td className="py-3 text-slate-600">Basis Data</td>
                   <td className="py-3 font-semibold text-slate-600">5 Mei 2026</td>
                   <td className="py-3"><span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-md">Selesai</span></td>
                   <td className="py-3 w-32">
                     <div className="flex items-center gap-2 text-xs">
                       <span className="font-medium">100%</span>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full"><div className="h-full bg-indigo-600 rounded-full" style={{width:'100%'}}></div></div>
                     </div>
                   </td>
                   <td className="py-3">
                     <div className="flex justify-center gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg"><Eye size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg"><Edit size={16} /></button>
                        <button className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"><Trash2 size={16} /></button>
                     </div>
                   </td>
                </tr>
              </tbody>
            </table>
             <div className="text-center">
              <button className="text-xs font-medium text-indigo-600 hover:underline flex items-center justify-center gap-1 mx-auto">Lihat semua <ChevronDown size={14}/></button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6 shrink-0">
          {/* Distribusi Prioritas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-bold text-slate-800 mb-6">Distribusi Prioritas</h2>
            <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-[8px] border-amber-500 border-t-red-500 border-l-red-500 border-r-red-500">
                <div className="absolute w-28 h-28 rounded-full border-[8px] border-transparent border-b-emerald-500 border-l-emerald-500 rotate-45"></div>
                <div className="absolute flex flex-col items-center">
                  <span className="text-xl font-black text-slate-800">24</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Total Tugas</span>
                </div>
              </div>
              <div className="space-y-3 flex-1">
                 <div className="flex justify-between text-xs items-center">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>Tinggi</span>
                    <span className="text-slate-500">9 (38%)</span>
                  </div>
                  <div className="flex justify-between text-xs items-center">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>Sedang</span>
                    <span className="text-slate-500">10 (42%)</span>
                  </div>
                  <div className="flex justify-between text-xs items-center">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Rendah</span>
                    <span className="text-slate-500">5 (20%)</span>
                  </div>
              </div>
            </div>
          </div>

          {/* Tips Prioritas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-sm font-bold text-slate-800 mb-4">Tips Prioritas</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                  <Flag size={14} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Kerjakan tugas prioritas tinggi terlebih dahulu</p>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                  <Clock size={14} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Pastikan tugas dengan deadline dekat tidak terlewat</p>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={14} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Selesaikan tugas sedang sebelum menambah tugas baru</p>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                  <Target size={14} />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">Prioritas bisa diubah sesuai dengan kebutuhanmu</p>
              </div>
            </div>
          </div>

          {/* Deadline Terdekat */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-4">Deadline Terdekat</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Tugas CRUD Laravel</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Web Programming 2</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-semibold text-slate-800">30 Apr 2026</p>
                  <p className="text-[10px] font-bold text-red-500 mt-0.5">2 hari lagi</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Resume Jurnal IoT</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Internet of Things</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-semibold text-slate-800">28 Apr 2026</p>
                  <p className="text-[10px] font-bold text-amber-500 mt-0.5">4 hari lagi</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                   <CalendarIcon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">ERD Database</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Basis Data</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-semibold text-slate-800">1 Mei 2026</p>
                  <p className="text-[10px] font-bold text-amber-500 mt-0.5">7 hari lagi</p>
                </div>
              </div>
            </div>
            <button className="w-full text-center text-xs text-indigo-600 font-semibold mt-4 hover:underline">Lihat semua deadline</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prioritas;
