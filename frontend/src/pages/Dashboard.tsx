import { useEffect, useState } from "react";
import {
  dashboardApi,
  courseApi,
  type DashboardData,
  type Course,
} from "../services/api";
import {
  ClipboardList,
  Clock,
  RefreshCw,
  CheckCircle2,
  Calendar as CalendarIcon,
  BookOpen,
  Wifi,
  Database,
  Users,
  FileText,
  CheckCircle,
  Plus,
  AlertCircle,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import ProfileBadge, { useCurrentProfile } from "../components/ProfileBadge";

const getCourseIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes("web") || lower.includes("program"))
    return <BookOpen size={14} />;
  if (lower.includes("iot") || lower.includes("internet"))
    return <Wifi size={14} />;
  if (lower.includes("data") || lower.includes("basis"))
    return <Database size={14} />;
  if (lower.includes("manusia") || lower.includes("komputer"))
    return <Users size={14} />;
  return <FileText size={14} />;
};

const getDaysLeft = (deadline: string) =>
  Math.ceil(
    (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );
const getDaysLeftColor = (days: number) =>
  days <= 2
    ? "text-red-500"
    : days <= 7
      ? "text-amber-500"
      : "text-emerald-500";
const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const Dashboard = () => {
  const { theme, t } = useTheme();
  const dark = theme === "dark";
  const profile = useCurrentProfile();
  const displayName =
    profile.fullName.split(" ")[0] || profile.username || profile.email || "User";

  const [dashData, setDashData] = useState<DashboardData | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dashRes, courseRes] = await Promise.all([
          dashboardApi.get(),
          courseApi.getAll(),
        ]);
        setDashData(dashRes.data.data);
        setCourses(courseRes.data.data);
      } catch {
        setError(t("gagalMemuatData"));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const stats = dashData?.statistics;
  const deadlines = dashData?.upcoming_deadlines || [];
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const iconColors = [
    dark ? "bg-indigo-900/50 text-indigo-400" : "bg-indigo-50 text-indigo-600",
    dark ? "bg-red-900/50 text-red-400" : "bg-red-50 text-red-500",
    dark
      ? "bg-emerald-900/50 text-emerald-400"
      : "bg-emerald-50 text-emerald-600",
    dark ? "bg-amber-900/50 text-amber-400" : "bg-amber-50 text-amber-600",
    dark ? "bg-blue-900/50 text-blue-400" : "bg-blue-50 text-blue-600",
  ];

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p
          className={`font-medium ${dark ? "text-slate-400" : "text-slate-500"}`}
        >
          {t("memuatDashboard")}
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
        <AlertCircle size={48} className="text-red-400" />
        <p
          className={`font-semibold ${dark ? "text-slate-200" : "text-slate-700"}`}
        >
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium"
        >
          {t("cobaLagi")}
        </button>
      </div>
    );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1
            className={`text-3xl font-bold flex items-center gap-2 ${dark ? "text-slate-100" : "text-slate-800"}`}
          >
            {t("selamatDatang")}, {displayName}{" "}
            <span className="animate-bounce">👋</span>
          </h1>
          <p className={`mt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}>
            {t("kelolaTugas")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm border ${dark ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-white border-slate-100 text-slate-500"}`}
          >
            <CalendarIcon size={18} />
            <span className="text-sm font-medium">{today}</span>
          </div>
          <ProfileBadge dark={dark} showChevron={false} />
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: t("totalTugas"),
            value: stats?.total ?? 0,
            sub: t("semuaTugas"),
            icon: <ClipboardList size={24} />,
            color: dark
              ? "bg-indigo-900/50 text-indigo-400"
              : "bg-indigo-50 text-indigo-500",
          },
          {
            label: t("belumDikerjakan"),
            value: stats?.belum_dikerjakan ?? 0,
            sub: t("tugasBelumDimulai"),
            icon: <Clock size={24} />,
            color: dark
              ? "bg-amber-900/50 text-amber-400"
              : "bg-amber-50 text-amber-500",
          },
          {
            label: t("sedangDikerjakan"),
            value: stats?.proses ?? 0,
            sub: t("tugasDalamProses"),
            icon: <RefreshCw size={24} />,
            color: dark
              ? "bg-blue-900/50 text-blue-400"
              : "bg-blue-50 text-blue-500",
          },
          {
            label: t("selesai"),
            value: stats?.selesai ?? 0,
            sub: t("tugasSelesai"),
            icon: <CheckCircle2 size={24} />,
            color: dark
              ? "bg-emerald-900/50 text-emerald-400"
              : "bg-emerald-50 text-emerald-500",
          },
        ].map((c) => (
          <div
            key={c.label}
            className={`p-5 rounded-2xl shadow-sm border transition-colors duration-300 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2.5 ${c.color} rounded-xl shrink-0`}>
                {c.icon}
              </div>
              <p
                className={`text-xs font-semibold pt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}
              >
                {c.label}
              </p>
            </div>
            <h3
              className={`text-3xl font-bold mb-1 ${dark ? "text-slate-100" : "text-slate-800"}`}
            >
              {c.value}
            </h3>
            <p
              className={`text-xs ${dark ? "text-slate-500" : "text-slate-500"}`}
            >
              {c.sub}
            </p>
          </div>
        ))}
        {/* Deadline card */}
        <div
          className={`p-5 rounded-2xl shadow-sm border transition-colors duration-300 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
        >
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`p-2.5 rounded-xl shrink-0 ${dark ? "bg-red-900/50 text-red-400" : "bg-red-50 text-red-500"}`}
            >
              <CalendarIcon size={24} />
            </div>
            <p
              className={`text-xs font-semibold pt-1 ${dark ? "text-slate-400" : "text-slate-500"}`}
            >
              {t("deadlineTerdekat")}
            </p>
          </div>
          {deadlines.length > 0 ? (
            <>
              <h3 className="text-xl font-bold text-red-500 mb-1">
                {getDaysLeft(deadlines[0].deadline)} {t("hariLagi")}
              </h3>
              <p
                className={`text-xs font-medium mb-1 truncate ${dark ? "text-slate-200" : "text-slate-800"}`}
              >
                {deadlines[0].title}
              </p>
              <p className="text-xs font-bold text-red-400">
                {formatDate(deadlines[0].deadline)}
              </p>
            </>
          ) : (
            <p
              className={`text-sm mt-2 ${dark ? "text-slate-400" : "text-slate-500"}`}
            >
              {t("tidakAdaDeadline")}
            </p>
          )}
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Keseluruhan */}
        <div
          className={`p-6 rounded-2xl shadow-sm border transition-colors duration-300 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
        >
          <h2
            className={`text-lg font-bold mb-6 ${dark ? "text-slate-100" : "text-slate-800"}`}
          >
            {t("progressKeseluruhan")}
          </h2>
          <div className="flex items-center gap-6">
            <div className="relative flex items-center justify-center w-36 h-36 shrink-0">
              <svg
                className="w-36 h-36 transform -rotate-90"
                viewBox="0 0 144 144"
              >
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke={dark ? "#334155" : "#e2e8f0"}
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="60"
                  stroke="#6366f1"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - (stats?.overall_progress ?? 0) / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span
                  className={`text-3xl font-black ${dark ? "text-slate-100" : "text-slate-800"}`}
                >
                  {stats?.overall_progress ?? 0}%
                </span>
                <span
                  className={`text-xs mt-0.5 ${dark ? "text-slate-400" : "text-slate-500"}`}
                >
                  {t("totalProgres")}
                </span>
              </div>
            </div>
            <div className="space-y-4 flex-1">
              {[
                {
                  label: t("selesai"),
                  color: "bg-emerald-500",
                  count: stats?.selesai ?? 0,
                },
                {
                  label: t("proses"),
                  color: "bg-blue-500",
                  count: stats?.proses ?? 0,
                },
                {
                  label: t("belum"),
                  color: "bg-amber-500",
                  count: stats?.belum_dikerjakan ?? 0,
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${item.color}`}
                      ></span>
                      {item.label}
                    </span>
                    <span className="font-medium">
                      {stats?.total
                        ? Math.round((item.count / stats.total) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                  <p
                    className={`text-xs ml-3.5 ${dark ? "text-slate-500" : "text-slate-500"}`}
                  >
                    {item.count} {t("tugas")}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p
            className={`mt-6 text-sm font-medium ${dark ? "text-slate-300" : "text-slate-600"}`}
          >
            {t("terusSemangat")}
          </p>
        </div>

        {/* Tugas Deadline Terdekat */}
        <div
          className={`p-6 rounded-2xl shadow-sm border transition-colors duration-300 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-lg font-bold ${dark ? "text-slate-100" : "text-slate-800"}`}
            >
              {t("tugasDeadlineTerdekat")}
            </h2>
          </div>
          <div className="space-y-4">
            {deadlines.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle
                  size={40}
                  className="mx-auto text-emerald-300 mb-3"
                />
                <p
                  className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}
                >
                  {t("tidakAdaDeadlineMepet")}
                </p>
              </div>
            ) : (
              deadlines.map((task) => {
                const days = getDaysLeft(task.deadline);
                return (
                  <div
                    key={task.id}
                    className={`flex items-center justify-between p-3 border rounded-xl transition-colors ${dark ? "border-slate-700 hover:bg-slate-700" : "border-slate-100 hover:bg-slate-50"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${days <= 2 ? (dark ? "bg-red-900/50 text-red-400" : "bg-red-50 text-red-500") : days <= 7 ? (dark ? "bg-amber-900/50 text-amber-400" : "bg-amber-50 text-amber-500") : dark ? "bg-blue-900/50 text-blue-400" : "bg-blue-50 text-blue-500"}`}
                      >
                        <CalendarIcon size={18} />
                      </div>
                      <div>
                        <h4
                          className={`font-bold text-sm truncate max-w-[140px] ${dark ? "text-slate-100" : "text-slate-800"}`}
                        >
                          {task.title}
                        </h4>
                        <p
                          className={`text-xs ${dark ? "text-slate-400" : "text-slate-500"}`}
                        >
                          {task.course?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xs font-semibold ${dark ? "text-slate-200" : "text-slate-800"}`}
                      >
                        {formatDate(task.deadline)}
                      </p>
                      <p
                        className={`text-xs font-bold mt-0.5 ${getDaysLeftColor(days)}`}
                      >
                        {days} {t("hari")} lagi
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Tugas per Mata Kuliah */}
        <div
          className={`p-6 rounded-2xl shadow-sm border transition-colors duration-300 ${dark ? "bg-slate-800 border-slate-700" : "bg-white border-slate-100"}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-lg font-bold ${dark ? "text-slate-100" : "text-slate-800"}`}
            >
              {t("tugasPerMatkul")}
            </h2>
          </div>
          {courses.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen
                size={40}
                className={`mx-auto mb-3 ${dark ? "text-slate-600" : "text-slate-200"}`}
              />
              <p
                className={`text-sm ${dark ? "text-slate-400" : "text-slate-500"}`}
              >
                {t("belumAdaMatkul")}
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {courses.slice(0, 5).map((course, idx) => (
                <div key={course.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconColors[idx % iconColors.length]}`}
                      >
                        {getCourseIcon(course.name)}
                      </div>
                      <span
                        className={`text-sm font-semibold truncate ${dark ? "text-slate-100" : "text-slate-800"}`}
                      >
                        {course.name}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-medium shrink-0 ml-2 ${dark ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {course.completed_tasks}/{course.total_tasks}
                    </span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full overflow-hidden ${dark ? "bg-slate-700" : "bg-slate-100"}`}
                  >
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${course.progress_percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* {stats?.total === 0 && (
        <div className={`border rounded-2xl p-6 text-center ${dark ? 'bg-indigo-950/50 border-indigo-900' : 'bg-indigo-50 border-indigo-100'}`}>
          <Plus size={40} className="mx-auto text-indigo-400 mb-3" />
          <h3 className={`text-lg font-bold mb-2 ${dark ? 'text-indigo-300' : 'text-indigo-800'}`}>{t('mulaiDariSini')}</h3>
          <p className={`text-sm ${dark ? 'text-indigo-400' : 'text-indigo-600'}`}>{t('tambahMatkulDanTugas')}</p>
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;
