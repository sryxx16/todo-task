import { useState, useEffect } from "react";
import { Shield, ChevronRight, X, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

const Keamanan = () => {
  const { theme, t } = useTheme();
  const dark = theme === "dark";

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [twoFA, setTwoFA] = useState(() => {
    const saved = localStorage.getItem("todoo_2fa");
    return saved === "true";
  });
  const [toast, setToast] = useState<string | null>(null);

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passError, setPassError] = useState("");

  useEffect(() => { localStorage.setItem("todoo_2fa", String(twoFA)); }, [twoFA]);
  useEffect(() => { if (toast) { const ti = setTimeout(() => setToast(null), 3000); return () => clearTimeout(ti); } }, [toast]);

  const handleToggle2FA = () => {
    setTwoFA((prev) => {
      const newVal = !prev;
      setToast(`${t("verifikasiDuaLangkah")} ${newVal ? t("diaktifkan") : t("dinonaktifkan")}`);
      return newVal;
    });
  };

  const handleSubmitPassword = () => {
    setPassError("");
    if (!oldPass || !newPass || !confirmPass) { setPassError(t("semuaFieldHarusDiisi")); return; }
    if (newPass.length < 8) { setPassError(t("passwordMinimal")); return; }
    if (newPass !== confirmPass) { setPassError(t("konfirmasiTidakCocok")); return; }
    setToast(t("passwordBerhasilDiubah"));
    setShowPasswordModal(false);
    setOldPass(""); setNewPass(""); setConfirmPass("");
  };

  const closeModal = () => {
    setShowPasswordModal(false);
    setOldPass(""); setNewPass(""); setConfirmPass(""); setPassError("");
  };

  return (
    <div className={`rounded-2xl shadow-sm border p-6 relative overflow-hidden transition-colors duration-300 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
      <div className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium shadow-lg transition-all duration-300 z-10 ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <CheckCircle size={16} />{toast}
      </div>

      <h2 className={`text-lg font-bold mb-1 ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("keamanan")}</h2>
      <p className={`text-sm mb-6 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("kelolaKeamanan")}</p>
      
      <div className="space-y-4">
        <button onClick={() => setShowPasswordModal(true)} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition-colors w-full text-left ${dark ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-100 hover:bg-slate-50'}`}>
          <div className="flex gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}><Shield size={18} /></div>
            <div>
              <h4 className={`font-medium ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("ubahPassword")}</h4>
              <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("perbaruiPassword")}</p>
            </div>
          </div>
          <ChevronRight size={18} className={dark ? 'text-slate-500' : 'text-slate-400'} />
        </button>

        <div className={`flex items-center justify-between p-3 border rounded-xl transition-colors ${dark ? 'border-slate-700 hover:bg-slate-700' : 'border-slate-100 hover:bg-slate-50'}`}>
          <div className="flex gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${dark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div>
              <h4 className={`font-medium ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("verifikasiDuaLangkah")}</h4>
              <p className={`text-xs ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("tambahKeamanan")}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-medium px-2 py-1 rounded-md ${twoFA ? "text-emerald-600 bg-emerald-50" : dark ? "text-slate-400 bg-slate-700" : "text-slate-500 bg-slate-100"}`}>
              {twoFA ? t("aktif") : t("nonaktif")}
            </span>
            <button onClick={handleToggle2FA} className={`w-11 h-6 rounded-full relative transition-colors duration-300 focus:outline-none ${twoFA ? "bg-indigo-600" : dark ? "bg-slate-600" : "bg-slate-300"}`} role="switch" aria-checked={twoFA}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-sm ${twoFA ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={closeModal}>
          <div className={`rounded-2xl shadow-2xl w-full max-w-md p-6 mx-4 animate-in fade-in zoom-in-95 duration-200 ${dark ? 'bg-slate-800' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("ubahPassword")}</h3>
              <button onClick={closeModal} className={`p-1 rounded-lg transition-colors ${dark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}><X size={20} className={dark ? 'text-slate-400' : 'text-slate-400'} /></button>
            </div>
            {passError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm mb-4">
                <AlertTriangle size={16} />{passError}
              </div>
            )}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("passwordLama")}</label>
                <div className="relative">
                  <input type={showOld ? "text" : "password"} value={oldPass} onChange={(e) => setOldPass(e.target.value)} placeholder={t("masukkanPasswordLama")} className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 pr-10 ${dark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-white border-slate-200'}`} />
                  <button type="button" onClick={() => setShowOld(!showOld)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${dark ? 'text-slate-400' : 'text-slate-400'}`}>
                    {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("passwordBaru")}</label>
                <div className="relative">
                  <input type={showNew ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder={t("minimalKarakter")} className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 pr-10 ${dark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-white border-slate-200'}`} />
                  <button type="button" onClick={() => setShowNew(!showNew)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${dark ? 'text-slate-400' : 'text-slate-400'}`}>
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("konfirmasiPassword")}</label>
                <div className="relative">
                  <input type={showConfirm ? "text" : "password"} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder={t("ulangiPasswordBaru")} className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 pr-10 ${dark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-white border-slate-200'}`} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${dark ? 'text-slate-400' : 'text-slate-400'}`}>
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className={`flex-1 px-4 py-2.5 border rounded-xl font-medium transition-colors ${dark ? 'border-slate-600 text-slate-300 hover:bg-slate-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{t("batal")}</button>
              <button onClick={handleSubmitPassword} className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-600/20">{t("simpan")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Keamanan;
