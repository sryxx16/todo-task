import {
  User,
  Bell,
  Sliders,
  Shield,
  Database,
  Info,
  Camera,
  ExternalLink,
  ChevronRight,
  Download,
  Trash2,
  Mail
} from "lucide-react";

const Pengaturan = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Pengaturan</h1>
          <p className="text-slate-500 mt-1">Kelola akun, preferensi aplikasi, dan data kamu.</p>
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
        {/* Sidebar Pengaturan */}
        <div className="w-64 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 shrink-0">
          <h3 className="font-bold text-slate-800 mb-4 px-2">Menu Pengaturan</h3>
          <div className="space-y-1">
            <button className="flex items-center gap-3 w-full px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium">
              <User size={18} /> Profil Saya
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-colors">
              <Bell size={18} /> Notifikasi
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-colors">
              <Sliders size={18} /> Preferensi
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-colors">
              <Shield size={18} /> Keamanan
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-colors">
              <Database size={18} /> Backup & Data
            </button>
            <button className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl font-medium transition-colors">
              <Info size={18} /> Tentang Aplikasi
            </button>
          </div>
        </div>

        {/* Konten Pengaturan */}
        <div className="flex-1 space-y-6">
          {/* Profil Saya */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-xl font-bold text-slate-800">Profil Saya</h2>
            <p className="text-sm text-slate-500 mb-6">Kelola informasi profil dan foto kamu.</p>

            <div className="flex gap-8">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <img src="https://ui-avatars.com/api/?name=Surya&background=0D8ABC&color=fff&size=128" alt="Profile" className="w-32 h-32 rounded-full border-4 border-slate-50" />
                  <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-slate-200 shadow-sm text-slate-600 hover:text-indigo-600 transition-colors">
                    <Camera size={16} />
                  </button>
                </div>
                <p className="text-xs text-slate-400">PNG atau JPG, maks. 2MB</p>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                  <input type="text" defaultValue="Surya Pratama" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Username</label>
                  <input type="text" defaultValue="surya_p" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input type="email" defaultValue="surya.pratama@student.ac.id" className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Bio (Opsional)</label>
                  <textarea placeholder="Tulis sedikit tentang dirimu..." rows={2} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6 pt-6 border-t border-slate-100">
               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20">
                 Simpan Perubahan
               </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Notifikasi */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-1">Notifikasi</h2>
              <p className="text-sm text-slate-500 mb-6">Atur notifikasi yang ingin kamu terima.</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                      <Bell size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Notifikasi Deadline</h4>
                      <p className="text-xs text-slate-500">Dapatkan notifikasi sebelum deadline tugas.</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Notifikasi Tugas Baru</h4>
                      <p className="text-xs text-slate-500">Dapatkan notifikasi saat ada tugas baru.</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Notifikasi Penyelesaian</h4>
                      <p className="text-xs text-slate-500">Dapatkan notifikasi saat tugas selesai.</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-indigo-600 font-medium hover:underline cursor-pointer">
                Kelola notifikasi melalui email <ExternalLink size={14} />
              </div>
            </div>

            {/* Preferensi */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-1">Preferensi</h2>
              <p className="text-sm text-slate-500 mb-6">Sesuaikan tampilan dan preferensi aplikasi.</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Mode Tampilan</h4>
                      <p className="text-xs text-slate-500">Pilih mode tampilan aplikasi.</p>
                    </div>
                  </div>
                  <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-indigo-500">
                    <option>Terang</option>
                    <option>Gelap</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Bahasa</h4>
                      <p className="text-xs text-slate-500">Pilih bahasa yang digunakan.</p>
                    </div>
                  </div>
                  <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-indigo-500">
                    <option>Bahasa Indonesia</option>
                    <option>English</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Zona Waktu</h4>
                      <p className="text-xs text-slate-500">Atur zona waktu kamu.</p>
                    </div>
                  </div>
                  <select className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:border-indigo-500">
                    <option>(GMT+07:00) WIB - Jakarta</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Keamanan */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-1">Keamanan</h2>
              <p className="text-sm text-slate-500 mb-6">Kelola keamanan akun kamu.</p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <Shield size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Ubah Password</h4>
                      <p className="text-xs text-slate-500">Perbarui password akun kamu secara berkala.</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
                <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Verifikasi Dua Langkah</h4>
                      <p className="text-xs text-slate-500">Tambahkan keamanan ekstra untuk akun kamu.</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Nonaktif</span>
                  <ChevronRight size={18} className="text-slate-400" />
                </div>
              </div>
            </div>

            {/* Backup & Data */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-1">Backup & Data</h2>
              <p className="text-sm text-slate-500 mb-6">Kelola data dan backup akun kamu.</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                      <Database size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Backup Data</h4>
                      <p className="text-xs text-slate-500">Download backup semua data tugas kamu.</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors">
                    <Download size={16} /> Download
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                      <Trash2 size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">Hapus Semua Data</h4>
                      <p className="text-xs text-slate-500">Hapus semua data secara permanen.</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                    <Trash2 size={16} /> Hapus Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tentang Aplikasi */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-1">Tentang Aplikasi</h2>
              <p className="text-sm text-slate-500">Informasi tentang aplikasi TaskKuliah.</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-800">Versi Aplikasi</p>
              <p className="text-xs text-slate-500">1.0.0</p>
            </div>
            <div className="text-center text-sm text-slate-500">
              Dibuat dengan ❤️ untuk mahasiswa produktif.
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-indigo-200 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors">
              <Mail size={16} /> Hubungi Developer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pengaturan;
