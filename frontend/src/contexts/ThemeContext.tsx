import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// ========================
// TRANSLATIONS
// ========================
export const translations = {
  id: {
    // Sidebar
    dashboard: "Dashboard",
    mataKuliah: "Mata Kuliah",
    dataTugas: "Data Tugas",
    kalender: "Kalender",
    prioritas: "Prioritas",
    statistik: "Statistik",
    pengaturan: "Pengaturan",
    logout: "Logout",
    quickAction: "Quick Action",
    tambahTugas: "Tambah Tugas",
    tambahMatkul: "Tambah Mata Kuliah",
    // Dashboard
    selamatDatang: "Selamat datang",
    kelolaTugas: "Kelola tugas kuliahmu dengan lebih terstruktur dan produktif.",
    totalTugas: "Total Tugas",
    belumDikerjakan: "Belum Dikerjakan",
    sedangDikerjakan: "Sedang Dikerjakan",
    selesai: "Selesai",
    deadlineTerdekat: "Deadline Terdekat",
    hariLagi: "Hari Lagi",
    tidakAdaDeadline: "Tidak ada deadline 🎉",
    progressKeseluruhan: "Progress Keseluruhan",
    totalProgres: "Total Progres",
    proses: "Proses",
    belum: "Belum",
    tugas: "tugas",
    terusSemangat: "Terus semangat! 💪",
    tugasDeadlineTerdekat: "Tugas Deadline Terdekat",
    tidakAdaDeadlineMepet: "Tidak ada deadline mepet! 🎉",
    tugasPerMatkul: "Tugas per Mata Kuliah",
    belumAdaMatkul: "Belum ada mata kuliah",
    mulaiDariSini: "Mulai dari sini!",
    tambahMatkulDanTugas: "Tambahkan mata kuliah dan tugas pertama kamu untuk melihat dashboard yang aktif.",
    semuaTugas: "Semua tugas kamu",
    tugasBelumDimulai: "Tugas belum dimulai",
    tugasDalamProses: "Tugas dalam proses",
    tugasSelesai: "Tugas selesai",
    memuatDashboard: "Memuat Dashboard...",
    cobaLagi: "Coba Lagi",
    gagalMemuatData: "Gagal memuat data. Pastikan backend Docker sudah berjalan.",
    // Pengaturan
    kelolaAkun: "Kelola akun, preferensi aplikasi, dan data kamu.",
    menuPengaturan: "Menu Pengaturan",
    profilSaya: "Profil Saya",
    notifikasi: "Notifikasi",
    preferensi: "Preferensi",
    keamanan: "Keamanan",
    tentangAplikasi: "Tentang Aplikasi",
    // Notifikasi
    aturNotifikasi: "Atur notifikasi yang ingin kamu terima.",
    notifDeadline: "Notifikasi Deadline",
    notifDeadlineDesc: "Dapatkan notifikasi sebelum deadline tugas.",
    notifTugasBaru: "Notifikasi Tugas Baru",
    notifTugasBaruDesc: "Dapatkan notifikasi saat ada tugas baru.",
    notifPenyelesaian: "Notifikasi Penyelesaian",
    notifPenyelesaianDesc: "Dapatkan notifikasi saat tugas selesai.",
    kelolaNotifEmail: "Aktifkan Notifikasi Browser",
    diaktifkan: "diaktifkan",
    dinonaktifkan: "dinonaktifkan",
    // Preferensi
    sesuaikanTampilan: "Sesuaikan tampilan dan preferensi aplikasi.",
    modeTampilan: "Mode Tampilan",
    pilihModeTampilan: "Pilih mode tampilan aplikasi.",
    terang: "Terang",
    gelap: "Gelap",
    bahasa: "Bahasa",
    pilihBahasa: "Pilih bahasa yang digunakan.",
    zonaWaktu: "Zona Waktu",
    aturZonaWaktu: "Atur zona waktu kamu.",
    diubahKe: "diubah ke",
    // Keamanan
    kelolaKeamanan: "Kelola keamanan akun kamu.",
    ubahPassword: "Ubah Password",
    perbaruiPassword: "Perbarui password akun kamu secara berkala.",
    verifikasiDuaLangkah: "Verifikasi Dua Langkah",
    tambahKeamanan: "Tambahkan keamanan ekstra untuk akun kamu.",
    aktif: "Aktif",
    nonaktif: "Nonaktif",
    passwordLama: "Password Lama",
    passwordBaru: "Password Baru",
    konfirmasiPassword: "Konfirmasi Password Baru",
    masukkanPasswordLama: "Masukkan password lama",
    minimalKarakter: "Minimal 8 karakter",
    ulangiPasswordBaru: "Ulangi password baru",
    batal: "Batal",
    simpan: "Simpan",
    semuaFieldHarusDiisi: "Semua field harus diisi.",
    passwordMinimal: "Password baru minimal 8 karakter.",
    konfirmasiTidakCocok: "Konfirmasi password tidak cocok.",
    passwordBerhasilDiubah: "Password berhasil diubah!",
    // Profil
    kelolaInfoProfil: "Kelola informasi profil dan foto kamu.",
    namaLengkap: "Nama Lengkap",
    username: "Username",
    email: "Email",
    bioOpsional: "Bio (Opsional)",
    tulisBio: "Tulis sedikit tentang dirimu...",
    simpanPerubahan: "Simpan Perubahan",
    fotoInfo: "PNG atau JPG, maks. 2MB",
    ubahFoto: "Ubah foto profil",
    hapusFoto: "Hapus foto",
    profileRequired: "Nama lengkap, username, dan email wajib diisi.",
    emailTidakValid: "Format email belum valid.",
    formatFotoTidakValid: "Format foto harus PNG atau JPG.",
    fotoTerlaluBesar: "Ukuran foto maksimal 2MB.",
    fotoGagalDibaca: "Foto gagal dibaca. Coba pilih file lain.",
    fotoBerhasilDiubah: "Foto profil berhasil diubah!",
    fotoBerhasilDihapus: "Foto profil berhasil dihapus.",
    profilBerhasilDisimpan: "Profil berhasil disimpan!",
    // Tentang
    infoAplikasi: "Informasi tentang aplikasi TaskKuliah.",
    versiAplikasi: "Versi Aplikasi",
    dibuatDenganCinta: "Dibuat dengan ❤️ untuk mahasiswa produktif.",
    hubungiDeveloper: "Hubungi Developer",
    // Sidebar tips
    tipMatkul: "Kelola mata kuliah dan tugasmu dengan lebih terstruktur!",
    tipTugas: "Kelola tugas kuliahmu dengan teratur dan selesaikan tepat waktu!",
    tipKalender: "Atur jadwal, pantau deadline, dan selesaikan tugas tepat waktu!",
    tipPengaturan: "Atur preferensi aplikasi sesuai kebutuhanmu untuk pengalaman terbaik.",
    tipPrioritas: "Fokus pada tugas prioritas terlebih dahulu untuk hasil lebih maksimal!",
    tipStatistik: "Pantau produktivitas dan perkembangan tugasmu di sini.",
    // Deadline notifications
    deadlineNotifTitle: "⏰ Deadline Mendekat!",
    deadlineNotifBody: "memiliki deadline dalam",
    hari: "hari",
  },
  en: {
    // Sidebar
    dashboard: "Dashboard",
    mataKuliah: "Courses",
    dataTugas: "Tasks",
    kalender: "Calendar",
    prioritas: "Priority",
    statistik: "Statistics",
    pengaturan: "Settings",
    logout: "Logout",
    quickAction: "Quick Action",
    tambahTugas: "Add Task",
    tambahMatkul: "Add Course",
    // Dashboard
    selamatDatang: "Welcome",
    kelolaTugas: "Manage your college assignments more structured and productive.",
    totalTugas: "Total Tasks",
    belumDikerjakan: "Not Started",
    sedangDikerjakan: "In Progress",
    selesai: "Completed",
    deadlineTerdekat: "Nearest Deadline",
    hariLagi: "Days Left",
    tidakAdaDeadline: "No deadlines 🎉",
    progressKeseluruhan: "Overall Progress",
    totalProgres: "Total Progress",
    proses: "In Progress",
    belum: "Not Started",
    tugas: "tasks",
    terusSemangat: "Keep it up! 💪",
    tugasDeadlineTerdekat: "Upcoming Deadlines",
    tidakAdaDeadlineMepet: "No urgent deadlines! 🎉",
    tugasPerMatkul: "Tasks per Course",
    belumAdaMatkul: "No courses yet",
    mulaiDariSini: "Start here!",
    tambahMatkulDanTugas: "Add your first course and task to see the active dashboard.",
    semuaTugas: "All your tasks",
    tugasBelumDimulai: "Tasks not started",
    tugasDalamProses: "Tasks in progress",
    tugasSelesai: "Tasks completed",
    memuatDashboard: "Loading Dashboard...",
    cobaLagi: "Try Again",
    gagalMemuatData: "Failed to load data. Make sure Docker backend is running.",
    // Pengaturan
    kelolaAkun: "Manage your account, app preferences, and data.",
    menuPengaturan: "Settings Menu",
    profilSaya: "My Profile",
    notifikasi: "Notifications",
    preferensi: "Preferences",
    keamanan: "Security",
    tentangAplikasi: "About App",
    // Notifikasi
    aturNotifikasi: "Manage the notifications you want to receive.",
    notifDeadline: "Deadline Notifications",
    notifDeadlineDesc: "Get notified before task deadlines.",
    notifTugasBaru: "New Task Notifications",
    notifTugasBaruDesc: "Get notified when new tasks are added.",
    notifPenyelesaian: "Completion Notifications",
    notifPenyelesaianDesc: "Get notified when tasks are completed.",
    kelolaNotifEmail: "Enable Browser Notifications",
    diaktifkan: "enabled",
    dinonaktifkan: "disabled",
    // Preferensi
    sesuaikanTampilan: "Customize the appearance and app preferences.",
    modeTampilan: "Display Mode",
    pilihModeTampilan: "Choose the app display mode.",
    terang: "Light",
    gelap: "Dark",
    bahasa: "Language",
    pilihBahasa: "Choose the language to use.",
    zonaWaktu: "Timezone",
    aturZonaWaktu: "Set your timezone.",
    diubahKe: "changed to",
    // Keamanan
    kelolaKeamanan: "Manage your account security.",
    ubahPassword: "Change Password",
    perbaruiPassword: "Update your account password regularly.",
    verifikasiDuaLangkah: "Two-Factor Authentication",
    tambahKeamanan: "Add extra security to your account.",
    aktif: "Active",
    nonaktif: "Inactive",
    passwordLama: "Old Password",
    passwordBaru: "New Password",
    konfirmasiPassword: "Confirm New Password",
    masukkanPasswordLama: "Enter old password",
    minimalKarakter: "Minimum 8 characters",
    ulangiPasswordBaru: "Repeat new password",
    batal: "Cancel",
    simpan: "Save",
    semuaFieldHarusDiisi: "All fields are required.",
    passwordMinimal: "New password must be at least 8 characters.",
    konfirmasiTidakCocok: "Password confirmation does not match.",
    passwordBerhasilDiubah: "Password changed successfully!",
    // Profil
    kelolaInfoProfil: "Manage your profile information and photo.",
    namaLengkap: "Full Name",
    username: "Username",
    email: "Email",
    bioOpsional: "Bio (Optional)",
    tulisBio: "Write something about yourself...",
    simpanPerubahan: "Save Changes",
    fotoInfo: "PNG or JPG, max 2MB",
    ubahFoto: "Change profile photo",
    hapusFoto: "Remove photo",
    profileRequired: "Full name, username, and email are required.",
    emailTidakValid: "Email format is not valid.",
    formatFotoTidakValid: "Photo format must be PNG or JPG.",
    fotoTerlaluBesar: "Photo size must be 2MB or less.",
    fotoGagalDibaca: "Unable to read the photo. Try another file.",
    fotoBerhasilDiubah: "Profile photo updated!",
    fotoBerhasilDihapus: "Profile photo removed.",
    profilBerhasilDisimpan: "Profile saved!",
    // Tentang
    infoAplikasi: "Information about the TaskKuliah app.",
    versiAplikasi: "App Version",
    dibuatDenganCinta: "Made with ❤️ for productive students.",
    hubungiDeveloper: "Contact Developer",
    // Sidebar tips
    tipMatkul: "Manage your courses and tasks in a more structured way!",
    tipTugas: "Manage your college tasks regularly and finish on time!",
    tipKalender: "Plan your schedule, track deadlines, and finish on time!",
    tipPengaturan: "Set your app preferences for the best experience.",
    tipPrioritas: "Focus on priority tasks first for maximum results!",
    tipStatistik: "Monitor your productivity and task progress here.",
    // Deadline notifications
    deadlineNotifTitle: "⏰ Deadline Approaching!",
    deadlineNotifBody: "has a deadline in",
    hari: "days",
  },
} as const;

export type Lang = "id" | "en";
export type TranslationKey = keyof typeof translations.id;
export type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem("todoo_theme");
    return (saved as Theme) || "light";
  });

  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("todoo_lang");
    return (saved as Lang) || "id";
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("todoo_theme", newTheme);
  };

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("todoo_lang", newLang);
  };

  const t = (key: TranslationKey): string => {
    return translations[lang][key] || key;
  };

  // Apply dark class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, lang, setLang, t }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
