import axios from "axios";

// Base URL API Laravel via Docker (port 80)
const api = axios.create({
  baseURL: "http://localhost/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========================
// TYPES
// ========================

export interface Course {
  id: number;
  name: string;
  lecturer_name: string | null;
  semester: number;
  total_tasks: number;
  completed_tasks: number;
  in_progress_tasks: number;
  progress_percentage: number;
}

export interface Task {
  id: number;
  course_id: number;
  title: string;
  deadline: string;
  status: "Belum Dikerjakan" | "Proses" | "Selesai";
  priority: "Rendah" | "Sedang" | "Tinggi";
  progress: number;
  course?: {
    id: number;
    name: string;
    lecturer_name: string | null;
    semester: number;
  };
  created_at?: string;
  updated_at?: string;
}

export interface DashboardStats {
  total: number;
  belum_dikerjakan: number;
  proses: number;
  selesai: number;
  overall_progress: number;
}

export interface DashboardData {
  statistics: DashboardStats;
  upcoming_deadlines: Task[];
}

// ========================
// COURSE API
// ========================

export const courseApi = {
  getAll: () => api.get<{ status: string; data: Course[] }>("/courses"),
  create: (data: { name: string; lecturer_name?: string; semester: number }) =>
    api.post<{ status: string; message: string; data: Course }>(
      "/courses",
      data,
    ),
  delete: (id: number) =>
    api.delete<{ status: string; message: string }>(`/courses/${id}`),
};

// ========================
// TASK API
// ========================

export const taskApi = {
  getAll: () => api.get<{ status: string; data: Task[] }>("/tasks"),
  create: (data: {
    course_id: number;
    title: string;
    deadline: string;
    priority: "Rendah" | "Sedang" | "Tinggi";
  }) =>
    api.post<{ status: string; message: string; data: Task }>("/tasks", data),
  update: (id: number, data: Partial<Task>) =>
    api.put<{ status: string; message: string; data: Task }>(
      `/tasks/${id}`,
      data,
    ),
  updateProgress: (
    id: number,
    data: { progress: number; status: Task["status"] },
  ) =>
    api.patch<{ status: string; message: string; data: Task }>(
      `/tasks/${id}/progress`,
      data,
    ),
  delete: (id: number) =>
    api.delete<{ status: string; message: string }>(`/tasks/${id}`),
};

// ========================
// DASHBOARD API
// ========================

export const dashboardApi = {
  get: () => api.get<{ status: string; data: DashboardData }>("/dashboard"),
};

export const authApi = {
  login: (data: any) => api.post("/login", data),
  register: (data: any) => api.post("/register", data),
  logout: () => api.post("/logout"),
  getUser: () => api.get("/user"),
};

export const notificationSettingsApi = {
  get: () =>
    api.get<{ data: { deadline_email_notifications: boolean } }>(
      "/notification-settings",
    ),
  update: (data: { deadline_email_notifications: boolean }) =>
    api.put<{
      message: string;
      data: { deadline_email_notifications: boolean };
    }>("/notification-settings", data),
};

export default api;
