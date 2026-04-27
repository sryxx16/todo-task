import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await authApi.register({ name, email, password });
      localStorage.removeItem("token");
      localStorage.removeItem("auth_user");
      alert(response.data.message || "Registrasi berhasil. Silakan login.");
      navigate("/login", {
        replace: true,
        state: { message: "Registrasi berhasil. Silakan login." },
      });
    } catch (error: any) {
      alert(
        "Registrasi gagal. " +
          (error.response?.data?.message || "Coba lagi nanti."),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
      <form
        onSubmit={handleRegister}
        className="p-8 bg-white dark:bg-slate-800 shadow-xl rounded-2xl w-96 border border-slate-100 dark:border-slate-700"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Daftar Akun
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Mulai kelola tugas kuliahmu
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            required
            className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password (min. 8 karakter)"
            required
            minLength={8}
            className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-8 bg-indigo-600 text-white p-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-70"
        >
          {isLoading ? "Memproses..." : "Daftar Sekarang"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Masuk
          </Link>
        </p>
      </form>
    </div>
  );
}
