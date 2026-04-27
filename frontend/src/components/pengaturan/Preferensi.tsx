import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Preferensi = () => {
  const { theme, setTheme, lang, setLang, t } = useTheme();
  const dark = theme === "dark";

  const [zonaWaktu, setZonaWaktu] = useState(() => {
    const saved = localStorage.getItem("todoo_zona_waktu");
    return saved || "(GMT+07:00) WIB - Jakarta";
  });
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem("todoo_zona_waktu", zonaWaktu); }, [zonaWaktu]);
  useEffect(() => { if (toast) { const ti = setTimeout(() => setToast(null), 2500); return () => clearTimeout(ti); } }, [toast]);

  const showToast = (msg: string) => setToast(msg);

  const handleThemeChange = (value: string) => {
    const newTheme = value === t("gelap") || value === "Dark" || value === "Gelap" ? "dark" : "light";
    setTheme(newTheme);
    showToast(`${t("modeTampilan")} ${t("diubahKe")} "${value}"`);
  };

  const handleLangChange = (value: string) => {
    const newLang = value === "English" ? "en" : "id";
    setLang(newLang);
    // Use direct text since language is changing
    showToast(newLang === "en" ? `Language changed to "${value}"` : `Bahasa diubah ke "${value}"`);
  };

  const handleZonaChange = (value: string) => {
    setZonaWaktu(value);
    showToast(`${t("zonaWaktu")} ${t("diubahKe")} "${value}"`);
  };

  return (
    <div className={`rounded-2xl shadow-sm border p-6 relative overflow-hidden transition-colors duration-300 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
      {/* Toast */}
      <div className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium shadow-lg transition-all duration-300 z-10 ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <CheckCircle size={16} />{toast}
      </div>
      <h2 className={`text-lg font-bold mb-1 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("preferensi")}</h2>
      <p className={`text-sm mb-6 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("sesuaikanTampilan")}</p>
      <div className="space-y-4">
        {/* Mode Tampilan */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-slate-700 text-slate-300' : 'bg-slate-50 text-slate-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </div>
            <div>
              <h4 className={`font-medium ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("modeTampilan")}</h4>
              <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("pilihModeTampilan")}</p>
            </div>
          </div>
          <select value={theme === "dark" ? t("gelap") : t("terang")} onChange={(e) => handleThemeChange(e.target.value)} className={`px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:border-indigo-500 cursor-pointer transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-white border-slate-200 text-slate-600'}`}>
            <option>{t("terang")}</option>
            <option>{t("gelap")}</option>
          </select>
        </div>
        {/* Bahasa */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-slate-700 text-slate-300' : 'bg-slate-50 text-slate-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div>
              <h4 className={`font-medium ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("bahasa")}</h4>
              <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("pilihBahasa")}</p>
            </div>
          </div>
          <select value={lang === "en" ? "English" : "Bahasa Indonesia"} onChange={(e) => handleLangChange(e.target.value)} className={`px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:border-indigo-500 cursor-pointer transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-white border-slate-200 text-slate-600'}`}>
            <option>Bahasa Indonesia</option>
            <option>English</option>
          </select>
        </div>
        {/* Zona Waktu */}
        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-slate-700 text-slate-300' : 'bg-slate-50 text-slate-500'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <div>
              <h4 className={`font-medium ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("zonaWaktu")}</h4>
              <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("aturZonaWaktu")}</p>
            </div>
          </div>
          <select value={zonaWaktu} onChange={(e) => handleZonaChange(e.target.value)} className={`px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:border-indigo-500 cursor-pointer transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-200' : 'bg-white border-slate-200 text-slate-600'}`}>
            <option>(GMT+07:00) WIB - Jakarta</option>
            <option>(GMT+08:00) WITA - Makassar</option>
            <option>(GMT+09:00) WIT - Jayapura</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Preferensi;
