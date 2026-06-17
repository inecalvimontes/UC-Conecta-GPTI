import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { mockEvents } from '../data/mockEvents.js';
import EventCard from '../components/EventCard.jsx';
import EventModal from '../components/EventModal.jsx';

function LogoManosPhone({ className = '' }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <span className={`text-5xl leading-none ${className}`} role="img" aria-label="UConecta">
        🤝
      </span>
    );
  }
  return (
    <img
      src="/logo-manos.png"
      alt=""
      className={`h-16 w-16 object-contain ${className}`}
      onError={() => setBroken(true)}
    />
  );
}

function IconUsers({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconCalendar({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconBuilding({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v0M9 13v0M9 17v0M13 16v0M13 12v0" />
    </svg>
  );
}

const steps = [
  { n: 1, text: 'Regístrate con tu mail UC' },
  { n: 2, text: 'Explora eventos' },
  { n: 3, text: '¡Asiste y conecta!' },
];

const featured = mockEvents.slice(0, 3);

export default function LandingPage() {
  const [selected, setSelected] = useState(null);
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-app-surface">
      {/* Hero */}
      <section className="relative overflow-hidden bg-app-surface">
        <div
          className="pointer-events-none absolute -right-24 -top-28 h-[22rem] w-[22rem] rounded-[48%] bg-accent opacity-[0.72] sm:h-[26rem] sm:w-[26rem]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-28 h-[20rem] w-[20rem] rounded-[46%] bg-lavender opacity-[0.75] sm:h-[24rem] sm:w-[24rem]"
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:gap-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-[3.25rem]">
              Haz match con tu vida universitaria
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted sm:text-xl">
              Descubre eventos, conecta con otros alumnos UC y sé parte de tu comunidad
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/explorar"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-center text-sm font-bold text-primary shadow-md transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Explorar Eventos →
              </Link>
              <Link
                to={isAuthenticated ? '/mis-eventos' : '/login'}
                className="inline-flex items-center justify-center rounded-full border-2 border-primary px-6 py-3 text-center text-sm font-semibold text-primary transition hover:bg-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {isAuthenticated ? 'Ir a Mis Eventos →' : '¿Ya tienes cuenta? Inicia sesión'}
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[280px] justify-center lg:max-w-none lg:justify-end">
            <div
              className="pointer-events-none absolute -right-6 top-1/2 h-32 w-32 -translate-y-1/2 rounded-[40%] bg-green-mid/35 blur-xl"
              aria-hidden
            />
            <div className="relative w-[220px] rounded-[2.5rem] border-[10px] border-app-surface bg-lavender p-6 shadow-2xl ring-1 ring-black/10 sm:w-[260px]">
              <div className="mx-auto mb-4 h-6 w-20 rounded-full bg-primary/10" aria-hidden />
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl bg-lavender/90 p-6">
                <LogoManosPhone />
                <p className="mt-4 text-center text-sm font-semibold text-primary">UConecta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-green-light py-16 sm:py-20">
        <div
          className="pointer-events-none absolute right-10 top-8 h-24 w-24 rounded-[45%] bg-accent/30 opacity-70"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-6 left-8 h-20 w-20 rounded-[50%] bg-lavender-light/80 opacity-60"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: IconUsers, num: '500+', label: 'Estudiantes' },
              { icon: IconCalendar, num: '50+', label: 'Eventos al mes' },
              { icon: IconBuilding, num: '20+', label: 'Organizaciones' },
            ].map(({ icon: Icon, num, label }) => (
              <div
                key={label}
                className="rounded-2xl bg-app-surface p-6 text-center shadow-card ring-1 ring-black/5 sm:p-8"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-light">
                  <Icon className="h-6 w-6 text-green-mid" />
                </div>
                <p className="mt-4 text-3xl font-extrabold text-primary sm:text-4xl">{num}</p>
                <p className="mt-1 text-sm font-medium text-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos destacados */}
      <section className="relative overflow-hidden bg-app-surface py-16 sm:py-20">
        <div
          className="pointer-events-none absolute -right-12 top-20 h-40 w-40 rounded-[42%] bg-green-mid/25 opacity-80"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">Eventos esta semana</h2>
          <p className="mt-2 max-w-2xl text-muted">Un vistazo a lo que está pasando en la UC.</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((ev) => (
              <EventCard key={ev.id} event={ev} onOpenDetails={setSelected} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/explorar"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-bold text-primary shadow-md transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Ver todos los eventos →
            </Link>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="relative overflow-hidden bg-lavender-light py-16 sm:py-20">
        <div
          className="pointer-events-none absolute left-1/4 top-0 h-36 w-36 -translate-x-1/2 rounded-[44%] bg-lavender/40 opacity-50 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 right-10 h-28 w-28 rounded-[48%] bg-primary/10 opacity-70"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-primary sm:text-3xl">¿Cómo funciona?</h2>
          <p className="mt-2 text-muted">Tres pasos para empezar a conectar.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="flex gap-4 rounded-2xl border border-lavender/30 bg-app-surface p-5 shadow-card sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-mid text-lg font-extrabold text-app-surface">
                  {s.n}
                </div>
                <p className="pt-2 text-base font-semibold leading-snug text-primary">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden bg-primary py-16 sm:py-20">
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-[45%] bg-green-mid opacity-25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-[40%] bg-accent/15 opacity-80"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-extrabold text-app-surface sm:text-3xl">¿Listo para conectar con tu U?</h2>
          <Link
            to={isAuthenticated ? '/mis-eventos' : '/register'}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-10 py-3.5 text-sm font-bold text-primary shadow-lg transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-surface"
          >
            {isAuthenticated ? 'Ver Mis Eventos' : 'Crear mi cuenta'}
          </Link>
        </div>
      </section>

      <EventModal event={selected} isOpen={Boolean(selected)} onClose={() => setSelected(null)} />
    </div>
  );
}
