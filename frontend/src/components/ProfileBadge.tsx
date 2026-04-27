import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  getProfileAvatar,
  PROFILE_UPDATED_EVENT,
  readStoredProfile,
  type UserProfile,
} from "./pengaturan/Profil";

export const useCurrentProfile = () => {
  const [profile, setProfile] = useState<UserProfile>(() => readStoredProfile());

  useEffect(() => {
    const refreshProfile = (event?: Event) => {
      const detail = (event as CustomEvent<UserProfile> | undefined)?.detail;
      setProfile(detail || readStoredProfile());
    };

    window.addEventListener(PROFILE_UPDATED_EVENT, refreshProfile);
    window.addEventListener("storage", refreshProfile);

    return () => {
      window.removeEventListener(PROFILE_UPDATED_EVENT, refreshProfile);
      window.removeEventListener("storage", refreshProfile);
    };
  }, []);

  return profile;
};

interface ProfileBadgeProps {
  dark: boolean;
  showChevron?: boolean;
}

const ProfileBadge = ({ dark, showChevron = true }: ProfileBadgeProps) => {
  const profile = useCurrentProfile();
  const displayName =
    profile.fullName.split(" ")[0] || profile.username || profile.email || "User";

  return (
    <div
      className={`flex items-center gap-3 px-3 py-1.5 rounded-lg shadow-sm border ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
    >
      <img
        src={getProfileAvatar(profile)}
        alt={displayName}
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className={`font-medium ${dark ? "text-slate-200" : "text-slate-700"}`}>
        {displayName}
      </span>
      {showChevron && (
        <ChevronDown size={16} className={dark ? "text-slate-500" : "text-slate-400"} />
      )}
    </div>
  );
};

export default ProfileBadge;
