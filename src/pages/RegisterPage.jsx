import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthPanel from '../components/AuthPanel.jsx';

const CARRERAS = [
  'Ingeniería',
  'Derecho',
  'Medicina',
  'Psicología',
  'Arquitectura',
  'Periodismo',
  'Educación',
  'Ciencias Biológicas',
  'Historia',
  'Diseño',
];

const UC_DOMAINS = ['@uc.cl', '@estudiante.uc.cl'];

function isUCEmail(v) {
  const s = v.toLowerCase().trim();
  return UC_DOMAINS.some((d) => s.endsWith(d));
}

function pwdStrength(pwd) {
  if (pwd.length < 8) return 0;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasNum = /[0-9]/.test(pwd);
  if (hasUpper && hasNum) return 3;
  if (hasUpper || hasNum) return 2;
  return 1;
}

const STRENGTH_META = [
  null,
  { label: 'Débil', bar: 'bg-red-500', w: 'w-1/3' },
  { label: 'Media', bar: 'bg-yellow-400', w: 'w-2/3' },
  { label: 'Fuerte', bar: 'bg-green-mid', w: 'w-full' },
];

function IconCheck({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
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

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

function FieldStatus({ touched, valid, error }) {
  if (!touched) return null;
  if (valid) return <IconCheck className="h-4 w-4 text-green-mid" />;
  if (error) return <IconWarn className="h-4 w-4 text-red-500" />;
  return null;
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <div className="flex items-start gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
      <IconWarn className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
      <p className="text-xs font-medium text-red-500">{msg}</p>
    </div>
  );
}

function inputBase(touched, valid, hasError) {
  const borderColor = !touched
    ? 'border-gray-200'
    : hasError
    ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
    : 'border-green-mid focus:border-green-mid focus:ring-green-mid/20';
  const bg = !touched
    ? 'bg-white'
    : hasError
    ? 'bg-red-50'
    : 'bg-green-light';
  return `w-full rounded-xl border px-4 py-3 text-sm text-primary placeholder:text-muted outline-none transition focus:ring-2 ${borderColor} ${bg}`;
}

function SuccessCard({ onGoLogin }) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-green-mid/20 bg-green-light p-10 text-center shadow-card">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-app-surface ring-4 ring-green-mid/30">
        <IconCheck className="h-8 w-8 text-green-mid" />
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-primary">¡Cuenta creada!</h2>
        <p className="mt-2 text-sm text-muted">
          Revisa tu correo UC para verificar tu cuenta.
        </p>
      </div>
      <button
        type="button"
        onClick={onGoLogin}
        className="mt-2 rounded-full bg-primary px-8 py-3 text-sm font-bold text-app-surface shadow-sm transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Ir al inicio de sesión
      </button>
    </div>
  );
}

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fields, setFields] = useState({ name: '', email: '', password: '', confirm: '', carrera: '' });
  const [touched, setTouched] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const set = (k) => (e) => {
    setFields((f) => ({ ...f, [k]: e.target.value }));
    if (!touched[k]) setTouched((t) => ({ ...t, [k]: true }));
    setSubmitError('');
  };

  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const validations = {
    name: fields.name.trim().length >= 3,
    email: isUCEmail(fields.email),
    password: fields.password.length >= 8 && /[A-Z]/.test(fields.password) && /[0-9]/.test(fields.password),
    confirm: fields.confirm.length > 0 && fields.confirm === fields.password,
    carrera: fields.carrera !== '',
  };

  const errors = {
    name: !validations.name ? 'El nombre debe tener al menos 3 caracteres' : '',
    email: !validations.email
      ? 'Solo puedes registrarte con un correo @uc.cl o @estudiante.uc.cl'
      : '',
    password: !validations.password
      ? 'Mínimo 8 caracteres, 1 mayúscula y 1 número'
      : '',
    confirm: !validations.confirm ? 'Las contraseñas no coinciden' : '',
    carrera: !validations.carrera ? 'Selecciona tu carrera' : '',
  };

  const allValid =
    Object.values(validations).every(Boolean) && termsAccepted;

  const strength = pwdStrength(fields.password);
  const strengthMeta = strength > 0 ? STRENGTH_META[strength] : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true, carrera: true });
    if (!allValid) return;
    setLoading(true);
    setSubmitError('');
    try {
      await register({ name: fields.name, email: fields.email, password: fields.password, carrera: fields.carrera });
      setSuccess(true);
    } catch (err) {
      setSubmitError(err.message ?? 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <AuthPanel blobA="bg-lavender" blobB="bg-green-mid" />

      {/* mobile top banner */}
      <div className="flex flex-col items-center gap-2 bg-green-light px-6 py-8 text-center lg:hidden">
        <span className="text-3xl" role="img" aria-label="UConecta">🤝</span>
        <p className="text-xl font-extrabold text-primary">UConecta</p>
        <p className="text-sm text-muted">Haz match con tu vida universitaria</p>
      </div>

      {/* form column */}
      <div className="flex items-start justify-center bg-app-surface px-6 py-10 sm:px-10">
        <div className="w-full max-w-[420px] animate-fade-slide-up">
          {success ? (
            <SuccessCard onGoLogin={() => navigate('/login')} />
          ) : (
            <>
              <h1 className="text-2xl font-extrabold text-primary sm:text-3xl">Crea tu cuenta UC 🎓</h1>
              <div className="mt-2 flex items-center gap-2">
                <span className="rounded-full bg-lavender-light px-3 py-1 text-xs font-semibold text-primary">
                  Solo para estudiantes UC
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-4">
                {/* nombre */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-primary">
                    Nombre completo
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="María González"
                      value={fields.name}
                      onChange={set('name')}
                      onBlur={blur('name')}
                      className={`${inputBase(touched.name, validations.name, touched.name && !validations.name)} pr-10`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      <FieldStatus touched={touched.name} valid={validations.name} error={errors.name} />
                    </span>
                  </div>
                  {touched.name && !validations.name && <FieldError msg={errors.name} />}
                </div>

                {/* email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-primary">
                    Correo UC
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="tu.nombre@uc.cl"
                      value={fields.email}
                      onChange={set('email')}
                      onBlur={blur('email')}
                      className={`${inputBase(touched.email, validations.email, touched.email && !validations.email)} pr-10`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2">
                      <FieldStatus touched={touched.email} valid={validations.email} error={errors.email} />
                    </span>
                  </div>
                  {touched.email && !validations.email && <FieldError msg={errors.email} />}
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
                      autoComplete="new-password"
                      placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
                      value={fields.password}
                      onChange={set('password')}
                      onBlur={blur('password')}
                      className={`${inputBase(touched.password, validations.password, touched.password && !validations.password)} pr-10`}
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
                  {/* barra de fortaleza */}
                  {fields.password.length > 0 && (
                    <div className="flex flex-col gap-1">
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${strengthMeta?.bar ?? 'bg-gray-200'} ${strengthMeta?.w ?? 'w-0'}`}
                        />
                      </div>
                      {strengthMeta && (
                        <p className={`text-xs font-medium ${strength === 1 ? 'text-red-500' : strength === 2 ? 'text-yellow-500' : 'text-green-mid'}`}>
                          {strengthMeta.label}
                        </p>
                      )}
                    </div>
                  )}
                  {touched.password && !validations.password && <FieldError msg={errors.password} />}
                </div>

                {/* confirm */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirm" className="text-sm font-semibold text-primary">
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Repite tu contraseña"
                      value={fields.confirm}
                      onChange={set('confirm')}
                      onBlur={blur('confirm')}
                      className={`${inputBase(touched.confirm, validations.confirm, touched.confirm && !validations.confirm)} pr-10`}
                    />
                    <button
                      type="button"
                      aria-label={showConfirm ? 'Ocultar' : 'Mostrar'}
                      onClick={() => setShowConfirm((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary"
                    >
                      <IconEye open={showConfirm} className="h-5 w-5" />
                    </button>
                  </div>
                  {touched.confirm && !validations.confirm && <FieldError msg={errors.confirm} />}
                </div>

                {/* carrera */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="carrera" className="text-sm font-semibold text-primary">
                    Carrera
                  </label>
                  <select
                    id="carrera"
                    value={fields.carrera}
                    onChange={set('carrera')}
                    onBlur={blur('carrera')}
                    className={`${inputBase(touched.carrera, validations.carrera, touched.carrera && !validations.carrera)} cursor-pointer`}
                  >
                    <option value="">Selecciona tu carrera</option>
                    {CARRERAS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {touched.carrera && !validations.carrera && <FieldError msg={errors.carrera} />}
                </div>

                {/* terms */}
                <label className="flex cursor-pointer items-start gap-3 select-none">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition ${
                      termsAccepted ? 'border-primary bg-primary' : 'border-primary bg-white'
                    }`}
                  >
                    {termsAccepted && <IconCheck className="h-3 w-3 text-green-mid" />}
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                  </span>
                  <span className="text-sm text-primary">
                    Acepto los{' '}
                    <button
                      type="button"
                      className="font-semibold underline underline-offset-2 hover:opacity-80"
                    >
                      términos y condiciones
                    </button>
                  </span>
                </label>

                {/* submit error */}
                {submitError && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <IconWarn className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <p className="text-sm font-medium text-red-500">{submitError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !allValid}
                  className={`mt-1 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    allValid && !loading
                      ? 'cursor-pointer bg-accent text-primary hover:opacity-95'
                      : 'cursor-not-allowed bg-gray-200 text-muted'
                  }`}
                >
                  {loading ? <><Spinner /> Creando cuenta…</> : 'Crear mi cuenta →'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-muted">
                ¿Ya tienes cuenta?{' '}
                <Link to="/login" className="font-semibold text-primary underline underline-offset-2 hover:opacity-80">
                  Inicia sesión
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
