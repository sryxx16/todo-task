import { Plus } from "lucide-react";

const Kalender = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Kalender</h1>
          <p className="text-slate-500 mt-1">Lihat dan kelola jadwal deadline tugas kuliahmu.</p>
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

      <div className="flex gap-6 items-start">
        {/* Main Calendar Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors">Hari Ini</button>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-slate-600">&lt;</button>
                <h2 className="text-lg font-bold text-slate-800 w-32 text-center">Mei 2026</h2>
                <button className="p-2 text-slate-400 hover:text-slate-600">&gt;</button>
              </div>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg shadow-sm font-medium text-sm">Bulan</button>
              <button className="px-4 py-1.5 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg font-medium text-sm transition-all">Minggu</button>
              <button className="px-4 py-1.5 text-slate-600 hover:bg-white hover:shadow-sm rounded-lg font-medium text-sm transition-all">Hari</button>
            </div>
          </div>

          {/* Calendar Grid Header */}
          <div className="grid grid-cols-7 mb-2">
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(day => (
              <div key={day} className="text-center font-semibold text-slate-500 py-2">{day}</div>
            ))}
          </div>

          {/* Calendar Grid Body (Mockup) */}
          <div className="grid grid-cols-7 border-t border-l border-slate-100">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 3; // Offset to start at May 1 on Friday
              const isCurrentMonth = day > 0 && day <= 31;
              const isToday = day === 21;
              return (
                <div key={i} className={`h-32 border-r border-b border-slate-100 p-2 ${isCurrentMonth ? '' : 'bg-slate-50/50 text-slate-300'}`}>
                  <div className={`font-medium mb-1 ${isToday ? 'w-7 h-7 bg-indigo-600 text-white rounded-full flex items-center justify-center' : (isCurrentMonth ? 'text-slate-700' : 'text-slate-400')} ${day === 30 || day === 31 ? 'text-red-500' : ''}`}>
                    {day > 0 && day <= 31 ? day : (day <= 0 ? 30 + day : day - 31)}
                  </div>
                  {/* Mock Events */}
                  {day === 5 && (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs p-1.5 rounded-md truncate font-medium">
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Laporan Basis Data</div>
                      <div className="text-emerald-400 mt-0.5 ml-3">23:59</div>
                    </div>
                  )}
                  {day === 8 && (
                    <div className="bg-amber-50 border border-amber-100 text-amber-600 text-xs p-1.5 rounded-md truncate font-medium">
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>UI/UX Design</div>
                      <div className="text-amber-400 mt-0.5 ml-3">23:59</div>
                    </div>
                  )}
                  {day === 10 && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-1.5 rounded-md truncate font-medium">
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>ERD Database</div>
                      <div className="text-red-400 mt-0.5 ml-3">23:59</div>
                    </div>
                  )}
                  {day === 12 && (
                    <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs p-1.5 rounded-md truncate font-medium">
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>Presentasi IoT</div>
                      <div className="text-indigo-400 mt-0.5 ml-3">23:59</div>
                    </div>
                  )}
                  {day === 15 && (
                    <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs p-1.5 rounded-md truncate font-medium">
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Normalisasi Database</div>
                      <div className="text-emerald-400 mt-0.5 ml-3">23:59</div>
                    </div>
                  )}
                  {day === 20 && (
                    <div className="bg-blue-50 border border-blue-100 text-blue-600 text-xs p-1.5 rounded-md truncate font-medium mt-1">
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>Resume Jurnal IoT</div>
                      <div className="text-blue-400 mt-0.5 ml-3">23:59</div>
                    </div>
                  )}
                  {day === 21 && (
                    <div className="bg-amber-50 border border-amber-100 text-amber-600 text-xs p-1.5 rounded-md truncate font-medium mt-1">
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>Tugas CRUD Laravel</div>
                      <div className="text-amber-400 mt-0.5 ml-3">23:59</div>
                    </div>
                  )}
                  {day === 28 && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-xs p-1.5 rounded-md truncate font-medium mt-1">
                      <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>Proyek Akhir</div>
                      <div className="text-red-400 mt-0.5 ml-3">23:59</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate-100 text-sm">
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-300"></span><span className="text-slate-600">Belum Dikerjakan</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-slate-600">Proses</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-slate-600">Selesai</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-slate-600">Tinggi</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span><span className="text-slate-600">Sedang</span></div>
            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-400"></span><span className="text-slate-600">Rendah</span></div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          <div className="flex justify-end mb-2">
             <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white w-full justify-center py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20">
               <Plus size={20} />
               Tambah Tugas
             </button>
          </div>

          {/* Mini Calendar */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-4">
              <button className="text-slate-400">&lt;</button>
              <h3 className="font-bold text-slate-800">Mei 2026</h3>
              <button className="text-slate-400">&gt;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
              <span className="font-medium text-slate-500">Sen</span><span className="font-medium text-slate-500">Sel</span><span className="font-medium text-slate-500">Rab</span><span className="font-medium text-slate-500">Kam</span><span className="font-medium text-slate-500">Jum</span><span className="font-medium text-slate-500">Sab</span><span className="font-medium text-slate-500">Min</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {[27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((d, i) => (
                <div key={i} className={`p-1.5 rounded-full ${i < 4 ? 'text-slate-300' : 'text-slate-700'} ${d === 21 && i > 3 ? 'bg-indigo-600 text-white font-bold' : ''}`}>
                  {d}
                  {d === 8 && i > 3 && <div className="w-1 h-1 bg-amber-500 rounded-full mx-auto mt-0.5"></div>}
                  {d === 28 && i > 3 && <div className="w-1 h-1 bg-red-500 rounded-full mx-auto mt-0.5"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Deadline Terdekat */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Deadline Terdekat</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Tugas CRUD Laravel</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Web Programming 2</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-semibold text-slate-800">30 Apr 2026</p>
                  <p className="text-xs font-semibold text-red-500 mt-0.5">2 hari lagi</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Resume Jurnal IoT</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Internet of Things</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-semibold text-slate-800">28 Apr 2026</p>
                  <p className="text-xs font-semibold text-amber-500 mt-0.5">4 hari lagi</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">ERD Database</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Basis Data</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-semibold text-slate-800">1 Mei 2026</p>
                  <p className="text-xs font-semibold text-amber-500 mt-0.5">7 hari lagi</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">UI/UX Design</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Interaksi Manusia & Komputer</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-xs font-semibold text-slate-800">3 Mei 2026</p>
                  <p className="text-xs font-semibold text-emerald-500 mt-0.5">9 hari lagi</p>
                </div>
              </div>
            </div>
            <button className="w-full text-center text-sm text-indigo-600 font-semibold mt-4 hover:underline">Lihat Semua</button>
          </div>

          {/* Ringkasan Bulan Ini */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Ringkasan Bulan Ini</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-2xl font-bold text-slate-800">24</p>
                <p className="text-xs text-slate-500">Total Tugas</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-2xl font-bold text-emerald-600">9</p>
                <p className="text-xs text-emerald-600">Selesai</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-2xl font-bold text-amber-600">10</p>
                <p className="text-xs text-amber-600">Proses</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-2xl font-bold text-slate-600">5</p>
                <p className="text-xs text-slate-500">Belum Dikerjakan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kalender;
