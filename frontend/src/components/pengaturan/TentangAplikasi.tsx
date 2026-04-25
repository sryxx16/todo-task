import { Mail } from "lucide-react";

const TentangAplikasi = () => {
  return (
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
  );
};

export default TentangAplikasi;
