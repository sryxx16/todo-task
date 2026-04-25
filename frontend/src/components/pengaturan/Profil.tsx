import { Camera } from "lucide-react";

const Profil = () => {
  return (
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
  );
};

export default Profil;
