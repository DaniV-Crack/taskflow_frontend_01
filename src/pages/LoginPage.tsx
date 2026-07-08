import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../api/auth.service";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await authService.login({ email, password });
      login(token, user);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(
        err.response?.data?.message ?? err.message ?? "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Iniciar sesión
        </h1>
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-md px-4 py-2 mb-4 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
