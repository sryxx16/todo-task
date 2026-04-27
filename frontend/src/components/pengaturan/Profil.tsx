import { Camera } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Profil = () => {
  const { theme, t } = useTheme();
  const dark = theme === "dark";

  return (
    <div className={`rounded-2xl shadow-sm border p-6 transition-colors duration-300 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
      <h2 className={`text-xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("profilSaya")}</h2>
      <p className={`text-sm mb-6 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("kelolaInfoProfil")}</p>

      <div className="flex gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img src="https://ui-avatars.com/api/?name=Surya&background=0D8ABC&color=fff&size=128" alt="Profile" className={`w-32 h-32 rounded-full border-4 ${dark ? 'border-slate-700' : 'border-slate-50'}`} />
            <button className={`absolute bottom-0 right-0 p-2 rounded-full border shadow-sm transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-300 hover:text-indigo-400' : 'bg-white border-slate-200 text-slate-600 hover:text-indigo-600'}`}>
              <Camera size={16} />
            </button>
          </div>
          <p className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{t("fotoInfo")}</p>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("namaLengkap")}</label>
            <input type="text" defaultValue="Surya Pratama" className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-200'}`} />
          </div>
          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("username")}</label>
            <input type="text" defaultValue="surya_p" className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-200'}`} />
          </div>
          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("email")}</label>
            <input type="email" defaultValue="surya.pratama@student.ac.id" className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-200'}`} />
          </div>
          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("bioOpsional")}</label>
            <textarea placeholder={t("tulisBio")} rows={2} className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-white border-slate-200'}`}></textarea>
          </div>
        </div>
      </div>
      <div className={`flex justify-end mt-6 pt-6 border-t ${dark ? 'border-slate-700' : 'border-slate-100'}`}>
         <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20">
           {t("simpanPerubahan")}
         </button>
      </div>
    </div>
  );
};

export default Profil;
