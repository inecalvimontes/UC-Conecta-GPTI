import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthPanel from '../components/AuthPanel.jsx';

function IconEye({ open, className }) {
  return open ? (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function IconWarn({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-5 w-5 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message ?? 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <AuthPanel blobA="bg-green-mid" blobB="bg-accent" />

      {/* mobile top banner */}
      <div className="flex flex-col items-center gap-2 bg-green-light px-6 py-8 text-center lg:hidden">
        <span className="text-3xl" role="img" aria-label="UConecta">🤝</span>
        <p className="text-xl font-extrabold text-primary">UConecta</p>
        <p className="text-sm text-muted">Haz match con tu vida universitaria</p>
      </div>

      {/* form column */}
      <div className="flex items-center justify-center bg-app-surface px-6 py-10 sm:px-10">
        <div className="w-full max-w-[400px] animate-fade-slide-up">
          <h1 className="text-2xl font-extrabold text-primary sm:text-3xl">Bienvenido de vuelta 👋</h1>
          <p className="mt-1.5 text-sm text-muted">Inicia sesión con tu cuenta UC</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
            {/* email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-primary">
                Correo UC
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="tu.nombre@uc.cl"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-primary placeholder:text-muted outline-none transition focus:border-primary focus:bg-green-light focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-semibold text-primary">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm text-primary placeholder:text-muted outline-none transition focus:border-primary focus:bg-green-light focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary"
                >
                  <IconEye open={showPwd} className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* remember + forgot */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-primary select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-primary"
                />
                Recordarme
              </label>
              <button
                type="button"
                className="text-sm text-muted underline-offset-2 hover:underline focus-visible:outline-none"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* error */}
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <IconWarn className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <p className="text-sm font-medium text-red-500">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-bold text-primary shadow-sm transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {loading ? <><Spinner /> Iniciando sesión…</> : 'Iniciar sesión'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="font-semibold text-primary underline underline-offset-2 hover:opacity-80">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
