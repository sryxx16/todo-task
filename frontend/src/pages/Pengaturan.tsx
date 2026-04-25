import { useState } from "react";
import { User, Bell, Sliders, Shield, Database, Info } from "lucide-react";

// Import komponen pengaturan yang sudah dipisah
import Profil from "../components/pengaturan/Profil";
import Notifikasi from "../components/pengaturan/Notifikasi";
import Preferensi from "../components/pengaturan/Preferensi";
import Keamanan from "../components/pengaturan/Keamanan";
import BackupData from "../components/pengaturan/BackupData";
import TentangAplikasi from "../components/pengaturan/TentangAplikasi";

const Pengaturan = () => {
  // State untuk melacak tab aktif
  const [activeTab, setActiveTab] = useState("profil");

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
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

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Sidebar Pengaturan */}
        <div className="w-full lg:w-64 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 shrink-0">
          <h3 className="font-bold text-slate-800 mb-4 px-2">Menu Pengaturan</h3>
          <div className="space-y-1">
            <button 
              onClick={() => setActiveTab("profil")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'profil' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              <User size={18} /> Profil Saya
            </button>
            <button 
              onClick={() => setActiveTab("notifikasi")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'notifikasi' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              <Bell size={18} /> Notifikasi
            </button>
            <button 
              onClick={() => setActiveTab("preferensi")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'preferensi' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              <Sliders size={18} /> Preferensi
            </button>
            <button 
              onClick={() => setActiveTab("keamanan")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'keamanan' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              <Shield size={18} /> Keamanan
            </button>
            <button 
              onClick={() => setActiveTab("backup")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'backup' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              <Database size={18} /> Backup & Data
            </button>
            <button 
              onClick={() => setActiveTab("tentang")}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'tentang' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}`}
            >
              <Info size={18} /> Tentang Aplikasi
            </button>
          </div>
        </div>

        {/* Konten Pengaturan Dinamis (hanya merender yang aktif atau menampilkan semua dalam grid jika diperlukan) */}
        {/* Disini saya buat tampil sekaligus seperti design, tapi dibungkus agar modular */}
        <div className="flex-1 space-y-6 w-full">
          
          {/* Untuk contoh yang sangat interaktif, kita bisa membuat sidebar ini mengontrol scroll atau langsung menampilkan yang aktif */}
          {/* Tapi sesuai UI design sebelumnya, semuanya tampil di satu halaman besar, jadi kita render semua komponen secara bertumpuk */}
          
          {/* Tampilan Profil */}
          <div id="profil">
            <Profil />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div id="notifikasi">
              <Notifikasi />
            </div>
            <div id="preferensi">
              <Preferensi />
            </div>
            <div id="keamanan">
              <Keamanan />
            </div>
            <div id="backup">
              <BackupData />
            </div>
          </div>

          <div id="tentang">
             <TentangAplikasi />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pengaturan;
