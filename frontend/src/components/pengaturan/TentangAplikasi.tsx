import { Mail } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const TentangAplikasi = () => {
  const { theme, t } = useTheme();
  const dark = theme === "dark";

  return (
    <div className={`rounded-2xl shadow-sm border p-6 flex items-center justify-between transition-colors duration-300 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
      <div>
        <h2 className={`text-lg font-bold mb-1 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("tentangAplikasi")}</h2>
        <p className={`text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("infoAplikasi")}</p>
      </div>
      <div className="text-center">
        <p className={`text-sm font-medium ${dark ? 'text-slate-200' : 'text-slate-800'}`}>{t("versiAplikasi")}</p>
        <p className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-500'}`}>1.0.0</p>
      </div>
      <div className={`text-center text-sm ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
        {t("dibuatDenganCinta")}
      </div>
      <button className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${dark ? 'border-indigo-800 text-indigo-400 hover:bg-indigo-900/30' : 'border-indigo-200 text-indigo-600 hover:bg-indigo-50'}`}>
        <Mail size={16} /> {t("hubungiDeveloper")}
      </button>
    </div>
  );
};

export default TentangAplikasi;
