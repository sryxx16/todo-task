import { Shield, ChevronRight } from "lucide-react";

const Keamanan = () => {
  return (
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
  );
};

export default Keamanan;
