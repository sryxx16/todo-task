import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

// Import komponen pengaturan yang sudah dipisah
import Profil, {
  getProfileAvatar,
  PROFILE_UPDATED_EVENT,
  readStoredProfile,
  type UserProfile,
} from "../components/pengaturan/Profil";
import Notifikasi from "../components/pengaturan/Notifikasi";
import Preferensi from "../components/pengaturan/Preferensi";
import Keamanan from "../components/pengaturan/Keamanan";
import TentangAplikasi from "../components/pengaturan/TentangAplikasi";

const Pengaturan = () => {
  const { theme, t } = useTheme();
  const dark = theme === "dark";
  const [profile, setProfile] = useState<UserProfile>(() =>
    readStoredProfile(),
  );

  useEffect(() => {
    const handleProfileUpdate = (event: Event) => {
      const detail = (event as CustomEvent<UserProfile>).detail;
      setProfile(detail || readStoredProfile());
    };

    window.addEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
    return () =>
      window.removeEventListener(PROFILE_UPDATED_EVENT, handleProfileUpdate);
  }, []);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1
            className={`text-3xl font-bold ${dark ? "text-slate-100" : "text-slate-800"}`}
          >
            {t("pengaturan")}
          </h1>
          <p className={`mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {t("kelolaAkun")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border ${dark ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-white border-slate-100 text-slate-500"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="text-sm font-medium">{today}</span>
          </div>
          <div
            className={`flex items-center gap-3 px-3 py-1.5 rounded-lg shadow-sm border cursor-pointer ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
          >
            <img
              src={getProfileAvatar(profile)}
              alt={profile.fullName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span
              className={`font-medium ${dark ? "text-slate-200" : "text-slate-700"}`}
            >
              {profile.fullName.split(" ")[0] || profile.username}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={dark ? "text-slate-500" : "text-slate-400"}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Konten Pengaturan */}
        <div className="flex-1 space-y-6 w-full">
          <div id="profil">
            <Profil />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <div id="notifikasi">
              <Notifikasi />
            </div> */}
            <div id="preferensi">
              <Preferensi />
            </div>
            <div id="keamanan">
              <Keamanan />
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
