import {
  ClipboardList,
  Clock,
  RefreshCw,
  CheckCircle2,
  Calendar as CalendarIcon,
  BookOpen,
  Wifi,
  Database,
  Users,
  FileText
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
            Selamat datang, Surya <span className="animate-bounce">👋</span>
          </h1>
          <p className="text-slate-500 mt-1">
            Kelola tugas kuliahmu dengan lebih terstruktur dan produktif.
          </p>
        </div>

        {/* Tanggal & Profil */}
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

      {/* Top Statistic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
             <div className="p-2.5 bg-indigo-50 text-indigo-500 rounded-xl">
              <ClipboardList size={24} />
            </div>
            <p className="text-xs font-semibold text-slate-500">Total Tugas</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">24</h3>
          <p className="text-xs text-slate-500 mb-3">Semua tugas kamu</p>
          <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 12% dari minggu lalu</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl">
              <Clock size={24} />
            </div>
            <p className="text-xs font-semibold text-slate-500">Belum Dikerjakan</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">8</h3>
          <p className="text-xs text-slate-500 mb-3">Tugas belum dimulai</p>
          <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 5% dari minggu lalu</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2.5 bg-blue-50 text-blue-500 rounded-xl">
              <RefreshCw size={24} />
            </div>
            <p className="text-xs font-semibold text-slate-500">Sedang Dikerjakan</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">9</h3>
          <p className="text-xs text-slate-500 mb-3">Tugas dalam proses</p>
          <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 18% dari minggu lalu</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-xs font-semibold text-slate-500">Selesai</p>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-1">7</h3>
          <p className="text-xs text-slate-500 mb-3">Tugas selesai</p>
          <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 25% dari minggu lalu</p>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-red-50 rounded-full opacity-50"></div>
          <div className="relative">
            <div className="flex justify-between items-start mb-2">
              <div className="p-2.5 bg-red-50 text-red-500 rounded-xl">
                <CalendarIcon size={24} />
              </div>
              <p className="text-xs font-semibold text-slate-500">Deadline Terdekat</p>
            </div>
            <h3 className="text-2xl font-bold text-red-500 mb-1">2 Hari Lagi</h3>
            <p className="text-xs text-slate-800 font-medium mb-3">Tugas Web Programming 2</p>
            <p className="text-xs font-bold text-red-500">30 April 2026</p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Keseluruhan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Progress Keseluruhan</h2>
          
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center w-36 h-36 rounded-full border-[12px] border-indigo-100">
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-800">58%</span>
                <span className="text-xs text-slate-500 mt-0.5">Total Progres</span>
              </div>
              <svg className="absolute w-36 h-36 transform -rotate-90">
                <circle cx="72" cy="72" r="60" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-indigo-600" strokeDasharray="377" strokeDashoffset={377 - (377 * 58) / 100} strokeLinecap="round" />
              </svg>
            </div>
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Selesai</span>
                  <span className="font-medium">29%</span>
                </div>
                <p className="text-xs text-slate-500 ml-3.5">7 tugas</p>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Proses</span>
                  <span className="font-medium">37%</span>
                </div>
                <p className="text-xs text-slate-500 ml-3.5">9 tugas</p>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Belum Dikerjakan</span>
                  <span className="font-medium">34%</span>
                </div>
                <p className="text-xs text-slate-500 ml-3.5">8 tugas</p>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-600 font-medium">Terus semangat! 💪</p>
        </div>

        {/* Tugas Deadline Terdekat */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Tugas Deadline Terdekat</h2>
            <button className="text-xs text-indigo-600 font-medium hover:underline">Lihat Semua</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                  <CalendarIcon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Tugas Web Programming 2</h4>
                  <p className="text-xs text-slate-500">Web Programming 2</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800">30 Apr 2026</p>
                <p className="text-xs font-bold text-red-500 mt-0.5">2 hari lagi</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center">
                  <ClipboardList size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Resume Jurnal IoT</h4>
                  <p className="text-xs text-slate-500">Internet of Things</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800">28 Apr 2026</p>
                <p className="text-xs font-bold text-amber-500 mt-0.5">4 hari lagi</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                  <ClipboardList size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Presentasi IoT</h4>
                  <p className="text-xs text-slate-500">Internet of Things</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800">2 Mei 2026</p>
                <p className="text-xs font-bold text-amber-500 mt-0.5">8 hari lagi</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center">
                  <ClipboardList size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Laporan Basis Data</h4>
                  <p className="text-xs text-slate-500">Basis Data</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-slate-800">5 Mei 2026</p>
                <p className="text-xs font-bold text-emerald-500 mt-0.5">11 hari lagi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tugas per Mata Kuliah */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Tugas per Mata Kuliah</h2>
            <button className="text-xs text-indigo-600 font-medium hover:underline">Lihat Semua</button>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><BookOpen size={14} /></div>
                  <span className="text-sm font-semibold text-slate-800">Web Programming 2</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">70%</span>
                  <span className="text-xs font-medium">7/10</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center"><Wifi size={14} /></div>
                  <span className="text-sm font-semibold text-slate-800">Internet of Things</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">100%</span>
                  <span className="text-xs font-medium">5/5</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><Database size={14} /></div>
                  <span className="text-sm font-semibold text-slate-800">Basis Data</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">40%</span>
                  <span className="text-xs font-medium">2/5</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-300 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"><Users size={14} /></div>
                  <span className="text-sm font-semibold text-slate-800">Interaksi Manusia & Komputer</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">60%</span>
                  <span className="text-xs font-medium">3/5</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-300 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><FileText size={14} /></div>
                  <span className="text-sm font-semibold text-slate-800">Proyek Akhir</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">20%</span>
                  <span className="text-xs font-medium">1/5</span>
                </div>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aktivitas Terbaru */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">Aktivitas Terbaru</h2>
            <button className="text-xs text-indigo-600 font-medium hover:underline">Lihat Semua</button>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                <CheckCircle2 size={18} />
              </div>
              <div className="flex-1 pb-6 border-b border-slate-100">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-800">Kamu menyelesaikan tugas "Resume Jurnal IoT"</p>
                  <span className="text-xs text-slate-500">2 jam yang lalu</span>
                </div>
                <p className="text-xs text-slate-500">Internet of Things</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
              </div>
              <div className="flex-1 pb-6 border-b border-slate-100">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-800">Kamu mengupdate tugas "CRUD Laravel"</p>
                  <span className="text-xs text-slate-500">5 jam yang lalu</span>
                </div>
                <p className="text-xs text-slate-500">Web Programming 2</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-semibold text-slate-800">Kamu menambahkan tugas baru "ERD Database"</p>
                  <span className="text-xs text-slate-500">1 hari yang lalu</span>
                </div>
                <p className="text-xs text-slate-500">Basis Data</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prioritas Tugas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Prioritas Tugas</h2>
          <div className="flex items-center gap-6 mb-6">
            <div className="relative flex items-center justify-center w-28 h-28 rounded-full border-[8px] border-amber-500 border-t-red-500 border-l-red-500 border-r-red-500">
              <div className="absolute w-28 h-28 rounded-full border-[8px] border-transparent border-b-emerald-500 border-l-emerald-500 rotate-45"></div>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-black text-slate-800">24</span>
                <span className="text-[10px] text-slate-500 mt-0.5">Total</span>
              </div>
            </div>
            <div className="space-y-3 flex-1">
               <div className="flex justify-between text-xs items-center">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>Tinggi</span>
                  <span className="text-slate-500">9 tugas (38%)</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>Sedang</span>
                  <span className="text-slate-500">10 tugas (42%)</span>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>Rendah</span>
                  <span className="text-slate-500">5 tugas (20%)</span>
                </div>
            </div>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl flex gap-2 text-xs text-slate-500">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500 shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
             Fokus pada tugas prioritas tinggi terlebih dahulu!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
