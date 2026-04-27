import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { authApi } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = (location.state as { message?: string } | null)?.message;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authApi.login({ email, password });
      // Simpan token ke localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("auth_user", JSON.stringify(response.data.data));
      // Redirect ke dashboard
      navigate("/");
    } catch (error) {
      alert("Login gagal, periksa email dan password.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white shadow rounded-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {successMessage && (
          <div className="mb-4 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full mb-6 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Masuk
        </button>
        <p className="mt-4 text-center text-sm">
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-600">
            Daftar
          </Link>
        </p>
      </form>
    </div>
  );
}
