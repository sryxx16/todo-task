import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AlertTriangle, Camera, CheckCircle, Trash2 } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

export const PROFILE_STORAGE_KEY = "todoo_user_profile";
export const PROFILE_UPDATED_EVENT = "todoo-profile-updated";
const AUTH_USER_STORAGE_KEY = "auth_user";

export interface UserProfile {
  fullName: string;
  username: string;
  email: string;
  bio: string;
  avatar: string;
}

export const DEFAULT_PROFILE: UserProfile = {
  fullName: "",
  username: "",
  email: "",
  bio: "",
  avatar: "",
};

interface StoredAuthUser {
  id?: number | string;
  name?: string;
  email?: string;
}

const readAuthUser = (): StoredAuthUser | null => {
  try {
    const saved = localStorage.getItem(AUTH_USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const buildProfileFromAuthUser = (): UserProfile => {
  const authUser = readAuthUser();
  const email = authUser?.email || "";

  return {
    ...DEFAULT_PROFILE,
    fullName: authUser?.name || "",
    username: email ? email.split("@")[0] : "",
    email,
  };
};

const getProfileStorageKey = () => {
  const authUser = readAuthUser();
  const userKey = authUser?.id || authUser?.email;

  return userKey ? `${PROFILE_STORAGE_KEY}_${userKey}` : PROFILE_STORAGE_KEY;
};

export const getProfileAvatar = (profile: UserProfile) => {
  if (profile.avatar) return profile.avatar;

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || profile.username || "User")}&background=0D8ABC&color=fff&size=128`;
};

export const readStoredProfile = (): UserProfile => {
  const baseProfile = buildProfileFromAuthUser();

  try {
    const saved = localStorage.getItem(getProfileStorageKey());
    if (!saved) return baseProfile;

    return { ...baseProfile, ...JSON.parse(saved) };
  } catch {
    return baseProfile;
  }
};

const Profil = () => {
  const { theme, t } = useTheme();
  const dark = theme === "dark";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<UserProfile>(() => readStoredProfile());
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const updateProfile = (key: keyof UserProfile, value: string) => {
    setProfile((current) => ({ ...current, [key]: value }));
    setError(null);
  };

  const saveProfile = (nextProfile: UserProfile) => {
    localStorage.setItem(getProfileStorageKey(), JSON.stringify(nextProfile));
    window.dispatchEvent(new CustomEvent(PROFILE_UPDATED_EVENT, { detail: nextProfile }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextProfile = {
      ...profile,
      fullName: profile.fullName.trim(),
      username: profile.username.trim(),
      email: profile.email.trim(),
      bio: profile.bio.trim(),
    };

    if (!nextProfile.fullName || !nextProfile.username || !nextProfile.email) {
      setError(t("profileRequired"));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextProfile.email)) {
      setError(t("emailTidakValid"));
      return;
    }

    setProfile(nextProfile);
    saveProfile(nextProfile);
    setToast(t("profilBerhasilDisimpan"));
    setError(null);
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError(t("formatFotoTidakValid"));
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError(t("fotoTerlaluBesar"));
      event.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const avatar = String(reader.result || "");
      const nextProfile = { ...profile, avatar };
      setProfile(nextProfile);
      saveProfile(nextProfile);
      setToast(t("fotoBerhasilDiubah"));
      setError(null);
    };
    reader.onerror = () => setError(t("fotoGagalDibaca"));
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleRemovePhoto = () => {
    const nextProfile = { ...profile, avatar: "" };
    setProfile(nextProfile);
    saveProfile(nextProfile);
    setToast(t("fotoBerhasilDihapus"));
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className={`rounded-2xl shadow-sm border p-6 relative overflow-hidden transition-colors duration-300 ${dark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
      <div className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium shadow-lg transition-all duration-300 z-10 ${toast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}`}>
        <CheckCircle size={16} />{toast}
      </div>

      <h2 className={`text-xl font-bold ${dark ? 'text-slate-100' : 'text-slate-800'}`}>{t("profilSaya")}</h2>
      <p className={`text-sm mb-6 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{t("kelolaInfoProfil")}</p>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-sm mb-5">
          <AlertTriangle size={16} />{error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img src={getProfileAvatar(profile)} alt={profile.fullName} className={`w-32 h-32 rounded-full border-4 object-cover ${dark ? 'border-slate-700' : 'border-slate-50'}`} />
            <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handlePhotoChange} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className={`absolute bottom-0 right-0 p-2 rounded-full border shadow-sm transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-300 hover:text-indigo-400' : 'bg-white border-slate-200 text-slate-600 hover:text-indigo-600'}`} aria-label={t("ubahFoto")}>
              <Camera size={16} />
            </button>
          </div>
          <p className={`text-xs ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{t("fotoInfo")}</p>
          {profile.avatar && (
            <button type="button" onClick={handleRemovePhoto} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${dark ? 'text-red-400 hover:text-red-300' : 'text-red-500 hover:text-red-600'}`}>
              <Trash2 size={14} />{t("hapusFoto")}
            </button>
          )}
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("namaLengkap")}</label>
            <input type="text" value={profile.fullName} onChange={(event) => updateProfile("fullName", event.target.value)} className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-200'}`} />
          </div>
          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("username")}</label>
            <input type="text" value={profile.username} onChange={(event) => updateProfile("username", event.target.value)} className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-200'}`} />
          </div>
          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("email")}</label>
            <input type="email" value={profile.email} onChange={(event) => updateProfile("email", event.target.value)} className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-100' : 'bg-white border-slate-200'}`} />
          </div>
          <div className="space-y-1.5">
            <label className={`text-sm font-medium ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{t("bioOpsional")}</label>
            <textarea value={profile.bio} onChange={(event) => updateProfile("bio", event.target.value)} placeholder={t("tulisBio")} rows={2} className={`w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-colors ${dark ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-500' : 'bg-white border-slate-200'}`}></textarea>
          </div>
        </div>
      </div>
      <div className={`flex justify-end mt-6 pt-6 border-t ${dark ? 'border-slate-700' : 'border-slate-100'}`}>
         <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-600/20">
           {t("simpanPerubahan")}
         </button>
      </div>
    </form>
  );
};

export default Profil;
