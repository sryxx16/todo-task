import {
  ClipboardList,
  Clock,
  RefreshCw,
  CheckCircle2,
  Calendar as CalendarIcon,
  CheckCircle,
  Target,
  ArrowUp
} from "lucide-react";

const Statistik = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Statistik</h1>
          <p className="text-slate-500 mt-1">Lihat ringkasan dan perkembangan tugas kuliahmu.</p>
        </div>

        {/* Tanggal & Profil */}
        <div className="flex items-center gap-4">
           <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 text-sm">
            <option>Bulan Ini</option>
          </select>
          <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-slate-600 text-sm">
            <option>Semua Mata Kuliah</option>
          </select>
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-indigo-50 text-indigo-500 rounded-xl">
              <ClipboardList size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Tugas</p>
              <h3 className="text-2xl font-bold text-slate-800">24</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-2">Semua tugas</p>
          <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 12% dari bulan lalu</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-amber-50 text-amber-500 rounded-xl">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Belum Dikerjakan</p>
              <h3 className="text-2xl font-bold text-slate-800">8</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-2">33% dari total tugas</p>
          <p className="text-xs font-semibold text-red-500 flex items-center gap-1">↓ 5% dari bulan lalu</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
              <RefreshCw size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Sedang Dikerjakan</p>
              <h3 className="text-2xl font-bold text-slate-800">9</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-2">37% dari total tugas</p>
          <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 18% dari bulan lalu</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-emerald-50 text-emerald-500 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Selesai</p>
              <h3 className="text-2xl font-bold text-slate-800">7</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-2">29% dari total tugas</p>
          <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">↑ 25% dari bulan lalu</p>
        </div>

        {/* Card 5 */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-3 bg-red-50 text-red-500 rounded-xl">
              <CalendarIcon size={24} />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500">Tugas Terlambat</p>
              <h3 className="text-2xl font-bold text-slate-800">2</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-2">8% dari total tugas</p>
          <p className="text-xs font-semibold text-red-500 flex items-center gap-1">↓ 2% dari bulan lalu</p>
        </div>
      </div>

      {/* Middle Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Perkembangan Tugas */}
        <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h2 className="text-sm font-bold text-slate-800 mb-4">Perkembangan Tugas (6 Bulan Terakhir)</h2>
          <div className="flex gap-4 mb-4 text-xs font-medium text-slate-500 px-4">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Selesai</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Proses</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Belum Dikerjakan</span>
          </div>
          <div className="flex-1 relative mt-2 border-l border-b border-slate-200 ml-6 pb-6">
            {/* Y Axis Labels */}
            <div className="absolute -left-6 top-0 text-[10px] text-slate-400">30</div>
            <div className="absolute -left-6 top-1/6 text-[10px] text-slate-400">25</div>
            <div className="absolute -left-6 top-2/6 text-[10px] text-slate-400">20</div>
            <div className="absolute -left-6 top-3/6 text-[10px] text-slate-400">15</div>
            <div className="absolute -left-6 top-4/6 text-[10px] text-slate-400">10</div>
            <div className="absolute -left-5 top-5/6 text-[10px] text-slate-400">5</div>
            <div className="absolute -left-5 bottom-0 text-[10px] text-slate-400">0</div>
            
            {/* Grid lines */}
            <div className="w-full border-b border-slate-100 absolute top-1/6"></div>
            <div className="w-full border-b border-slate-100 absolute top-2/6"></div>
            <div className="w-full border-b border-slate-100 absolute top-3/6"></div>
            <div className="w-full border-b border-slate-100 absolute top-4/6"></div>
            <div className="w-full border-b border-slate-100 absolute top-5/6"></div>

            {/* X Axis Labels */}
            <div className="absolute -bottom-5 w-full flex justify-between text-[10px] text-slate-400">
               <span>Des 2025</span><span>Jan 2026</span><span>Feb 2026</span><span>Mar 2026</span><span>Apr 2026</span><span>Mei 2026</span>
            </div>

            {/* Simulated Chart Lines (SVG) */}
            <svg className="w-full h-full absolute overflow-visible">
               {/* Selesai Line (Emerald) */}
               <polyline points="0,120 60,110 120,90 180,70 240,50 300,60" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               {/* Selesai Dots */}
               <circle cx="0" cy="120" r="4" fill="#10b981"/>
               <circle cx="60" cy="110" r="4" fill="#10b981"/>
               <circle cx="120" cy="90" r="4" fill="#10b981"/>
               <circle cx="180" cy="70" r="4" fill="#10b981"/>
               <circle cx="240" cy="50" r="4" fill="#10b981"/>
               <circle cx="300" cy="60" r="4" fill="#10b981"/>

               {/* Proses Line (Blue) */}
               <polyline points="0,100 60,95 120,80 180,60 240,55 300,70" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               {/* Proses Dots */}
               <circle cx="0" cy="100" r="4" fill="#3b82f6"/>
               <circle cx="60" cy="95" r="4" fill="#3b82f6"/>
               <circle cx="120" cy="80" r="4" fill="#3b82f6"/>
               <circle cx="180" cy="60" r="4" fill="#3b82f6"/>
               <circle cx="240" cy="55" r="4" fill="#3b82f6"/>
               <circle cx="300" cy="70" r="4" fill="#3b82f6"/>

               {/* Belum Line (Amber) */}
               <polyline points="0,60 60,50 120,60 180,45 240,50 300,75" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
               {/* Belum Dots */}
               <circle cx="0" cy="60" r="4" fill="#f59e0b"/>
               <circle cx="60" cy="50" r="4" fill="#f59e0b"/>
               <circle cx="120" cy="60" r="4" fill="#f59e0b"/>
               <circle cx="180" cy="45" r="4" fill="#f59e0b"/>
               <circle cx="240" cy="50" r="4" fill="#f59e0b"/>
               <circle cx="300" cy="75" r="4" fill="#f59e0b"/>
            </svg>
            
            {/* Tooltip Mock */}
            <div className="absolute right-8 top-12 bg-white border border-slate-200 shadow-lg p-2 rounded-lg text-xs z-10 w-32">
              <p className="font-bold mb-1 text-slate-800">Mei 2026</p>
              <p className="flex justify-between text-slate-600"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>Selesai:</span> 18</p>
              <p className="flex justify-between text-slate-600"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>Proses:</span> 9</p>
              <p className="flex justify-between text-slate-600"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>Belum:</span> 8</p>
            </div>
          </div>
        </div>

        {/* Distribusi Status Tugas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center relative">
          <h2 className="text-sm font-bold text-slate-800 mb-6 w-full">Distribusi Status Tugas</h2>
          <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-[16px] border-emerald-500 border-b-amber-500 border-l-amber-500 border-t-blue-500">
            <div className="absolute w-40 h-40 rounded-full border-[16px] border-transparent border-t-blue-500 border-r-blue-500 rotate-45"></div>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-black text-slate-800">24</span>
              <span className="text-xs text-slate-500">Total</span>
            </div>
          </div>
          <div className="mt-8 space-y-3 w-full pl-6">
             <div className="flex justify-between text-xs items-center">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="font-medium text-slate-700">Selesai</span></span>
                <span className="text-slate-500">7 tugas (29%)</span>
              </div>
              <div className="flex justify-between text-xs items-center">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="font-medium text-slate-700">Proses</span></span>
                <span className="text-slate-500">9 tugas (37%)</span>
              </div>
              <div className="flex justify-between text-xs items-center">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span><span className="font-medium text-slate-700">Belum Dikerjakan</span></span>
                <span className="text-slate-500">8 tugas (33%)</span>
              </div>
          </div>
        </div>

        {/* Produktivitas Mingguan */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-sm font-bold text-slate-800">Produktivitas Mingguan</h2>
             <select className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 focus:outline-none focus:border-indigo-500">
              <option>7 Hari Terakhir</option>
            </select>
          </div>
          <div className="flex-1 flex items-end gap-2 px-2 pb-6 border-b border-l border-slate-100 relative">
            <div className="absolute -left-5 top-0 text-[10px] text-slate-400">20</div>
            <div className="absolute -left-5 top-1/4 text-[10px] text-slate-400">15</div>
            <div className="absolute -left-5 top-2/4 text-[10px] text-slate-400">10</div>
            <div className="absolute -left-4 top-3/4 text-[10px] text-slate-400">5</div>
            <div className="absolute -left-4 bottom-5 text-[10px] text-slate-400">0</div>

            {/* Bars */}
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-indigo-600">8</span>
              <div className="w-8 bg-indigo-500 rounded-t-md" style={{height: '40%'}}></div>
              <span className="text-[10px] text-slate-500">11 Mei</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-indigo-600">12</span>
              <div className="w-8 bg-indigo-500 rounded-t-md" style={{height: '60%'}}></div>
              <span className="text-[10px] text-slate-500">12 Mei</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-indigo-600">15</span>
              <div className="w-8 bg-indigo-600 rounded-t-md" style={{height: '80%'}}></div>
              <span className="text-[10px] font-bold text-slate-800">13 Mei</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-indigo-600">10</span>
              <div className="w-8 bg-indigo-500 rounded-t-md" style={{height: '50%'}}></div>
              <span className="text-[10px] text-slate-500">14 Mei</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-indigo-600">14</span>
              <div className="w-8 bg-indigo-500 rounded-t-md" style={{height: '70%'}}></div>
              <span className="text-[10px] text-slate-500">15 Mei</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-indigo-600">9</span>
              <div className="w-8 bg-indigo-500 rounded-t-md" style={{height: '45%'}}></div>
              <span className="text-[10px] text-slate-500">16 Mei</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-indigo-600">7</span>
              <div className="w-8 bg-indigo-500 rounded-t-md" style={{height: '35%'}}></div>
              <span className="text-[10px] text-slate-500">17 Mei</span>
            </div>
          </div>
          <div className="mt-4 bg-indigo-50 p-3 rounded-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
               <ArrowUp size={16} />
            </div>
            <p className="text-xs text-indigo-800 font-medium leading-relaxed">
              Kamu menyelesaikan 15 tugas minggu ini, naik 25% dari minggu lalu!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tugas per Mata Kuliah */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <h2 className="text-sm font-bold text-slate-800 mb-6">Tugas per Mata Kuliah</h2>
           <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-500">
                <th className="pb-3 font-medium">Mata Kuliah</th>
                <th className="pb-3 font-medium text-center">Total</th>
                <th className="pb-3 font-medium text-center">Selesai</th>
                <th className="pb-3 font-medium text-right">Progres</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50">
                <td className="py-3 font-medium text-slate-700">Web Programming 2</td>
                <td className="py-3 text-center text-slate-600">10</td>
                <td className="py-3 text-center text-slate-600">7</td>
                <td className="py-3 flex items-center gap-2 justify-end">
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600" style={{width:'70%'}}></div></div>
                  <span className="text-xs text-slate-500 w-8">70%</span>
                </td>
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-3 font-medium text-slate-700">Internet of Things</td>
                <td className="py-3 text-center text-slate-600">5</td>
                <td className="py-3 text-center text-slate-600">3</td>
                <td className="py-3 flex items-center gap-2 justify-end">
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600" style={{width:'60%'}}></div></div>
                  <span className="text-xs text-slate-500 w-8">60%</span>
                </td>
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-3 font-medium text-slate-700">Basis Data</td>
                <td className="py-3 text-center text-slate-600">5</td>
                <td className="py-3 text-center text-slate-600">2</td>
                <td className="py-3 flex items-center gap-2 justify-end">
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600" style={{width:'40%'}}></div></div>
                  <span className="text-xs text-slate-500 w-8">40%</span>
                </td>
              </tr>
              <tr className="border-b border-slate-50">
                <td className="py-3 font-medium text-slate-700">Interaksi Manusia & Komputer</td>
                <td className="py-3 text-center text-slate-600">3</td>
                <td className="py-3 text-center text-slate-600">2</td>
                <td className="py-3 flex items-center gap-2 justify-end">
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600" style={{width:'67%'}}></div></div>
                  <span className="text-xs text-slate-500 w-8">67%</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium text-slate-700">Proyek Akhir</td>
                <td className="py-3 text-center text-slate-600">1</td>
                <td className="py-3 text-center text-slate-600">1</td>
                <td className="py-3 flex items-center gap-2 justify-end">
                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-600" style={{width:'100%'}}></div></div>
                  <span className="text-xs text-slate-500 w-8">100%</span>
                </td>
              </tr>
            </tbody>
           </table>
           <button className="w-full text-center text-xs font-medium text-indigo-600 hover:underline mt-2">Lihat semua mata kuliah →</button>
        </div>

        {/* Tugas Berdasarkan Prioritas */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center">
           <h2 className="text-sm font-bold text-slate-800 mb-6 w-full">Tugas Berdasarkan Prioritas</h2>
           <div className="flex items-center gap-6">
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-[12px] border-amber-500 border-t-red-500 border-l-red-500 border-r-red-500">
                <div className="absolute w-32 h-32 rounded-full border-[12px] border-transparent border-b-emerald-500 border-l-emerald-500 rotate-45"></div>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-800">24</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">Total</span>
                </div>
              </div>
              <div className="space-y-4 flex-1">
                 <div className="flex justify-between text-xs items-center">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="font-medium text-slate-700">Tinggi</span></span>
                    <span className="text-slate-500">9 tugas (38%)</span>
                  </div>
                  <div className="flex justify-between text-xs items-center">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span><span className="font-medium text-slate-700">Sedang</span></span>
                    <span className="text-slate-500">10 tugas (42%)</span>
                  </div>
                  <div className="flex justify-between text-xs items-center">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="font-medium text-slate-700">Rendah</span></span>
                    <span className="text-slate-500">5 tugas (20%)</span>
                  </div>
              </div>
            </div>
        </div>

        {/* Rata-rata Progress */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center">
           <h2 className="text-sm font-bold text-slate-800 w-full mb-8">Rata-rata Progress Tugas</h2>
           
           {/* Half Donut Gauge */}
           <div className="relative w-48 h-24 overflow-hidden mb-4">
              <div className="absolute w-48 h-48 rounded-full border-[20px] border-slate-100 border-b-transparent border-r-transparent rotate-45 top-0"></div>
              <div className="absolute w-48 h-48 rounded-full border-[20px] border-indigo-600 border-b-transparent border-r-transparent rotate-45 top-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 58%, 0 58%)' }}></div>
              <div className="absolute bottom-0 w-full flex flex-col items-center justify-end pb-2">
                <span className="text-4xl font-black text-slate-800">58%</span>
                <span className="text-xs text-slate-500 font-medium">Rata-rata Progress Keseluruhan</span>
              </div>
           </div>
           
           <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-semibold">
              <ArrowUp size={14} /> 14% dari bulan lalu (44%)
           </div>
        </div>
      </div>

      {/* Insight Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Insight</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-500 shrink-0 shadow-sm">
                <CheckCircle size={16} />
             </div>
             <p className="text-xs text-emerald-800 font-medium leading-relaxed mt-1">
                Mantap! Kamu menyelesaikan 25% lebih banyak tugas dibanding bulan lalu.
             </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-500 shrink-0 shadow-sm">
                <Clock size={16} />
             </div>
             <p className="text-xs text-amber-800 font-medium leading-relaxed mt-1">
                8 tugas belum dikerjakan. Atur waktumu agar deadline tidak terlewat.
             </p>
          </div>
          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex items-start gap-3">
             <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-500 shrink-0 shadow-sm">
                <Target size={16} />
             </div>
             <p className="text-xs text-indigo-800 font-medium leading-relaxed mt-1">
                Fokus pada 9 tugas prioritas tinggi agar produktivitasmu lebih maksimal!
             </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Statistik;
