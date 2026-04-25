import { Bell, ExternalLink } from "lucide-react";

const Notifikasi = () => {
  return (
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
  );
};

export default Notifikasi;
