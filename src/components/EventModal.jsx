import { useEffect, useState } from 'react';
import { formatClp, formatEventDate } from '../utils/format.js';

function IconCalendar({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function IconClock({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconMapPin({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconUsers({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
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

function IconCheckCircle({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l2.5 2.5L16 9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EventModal({ event, isOpen, onClose }) {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen, event?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const pct = Math.min(100, Math.round((event.registered / event.capacity) * 100));

  const handleRegister = () => {
    setSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="animate-modal-in relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-app-surface shadow-2xl ring-1 ring-black/10">
        <button
          type="button"
          onClick={() => onClose?.()}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-app-surface/90 text-primary shadow-md ring-1 ring-black/5 transition hover:bg-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Cerrar"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-4 sm:p-6">
          <div className="overflow-hidden rounded-xl bg-lavender-light">
            <div className="aspect-video w-full">
              <img src={event.image} alt="" className="h-full w-full object-cover" />
            </div>
          </div>

          <span className="mt-4 inline-block rounded-full bg-lavender-light px-3 py-1 text-xs font-semibold text-primary">
            {event.category}
          </span>

          <h2 id="event-modal-title" className="mt-2 text-2xl font-extrabold leading-tight text-primary sm:text-3xl">
            {event.title}
          </h2>

          <p className="mt-3 text-base leading-relaxed text-gray-600">{event.description}</p>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="flex gap-3 rounded-xl border border-green-light bg-green-light/40 p-3">
              <IconCalendar className="mt-0.5 h-5 w-5 shrink-0 text-green-mid" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Fecha</dt>
                <dd className="text-sm font-medium text-primary">{formatEventDate(event.date)}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-green-light bg-green-light/40 p-3">
              <IconClock className="mt-0.5 h-5 w-5 shrink-0 text-green-mid" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Hora</dt>
                <dd className="text-sm font-medium text-primary">{event.time}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-green-light bg-green-light/40 p-3 sm:col-span-2">
              <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-mid" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Lugar</dt>
                <dd className="text-sm font-medium text-primary">{event.location}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-green-light bg-green-light/40 p-3 sm:col-span-2">
              <IconBuilding className="mt-0.5 h-5 w-5 shrink-0 text-green-mid" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Organizador</dt>
                <dd className="text-sm font-medium text-primary">{event.organizer}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-xl border border-green-light bg-green-light/40 p-3 sm:col-span-2">
              <IconUsers className="mt-0.5 h-5 w-5 shrink-0 text-green-mid" />
              <div className="min-w-0 flex-1">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Capacidad</dt>
                <dd className="text-sm font-medium text-primary">
                  {event.registered} inscritos · {event.capacity} cupos
                </dd>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-green-light">
                  <div className="h-full rounded-full bg-green-mid" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          </dl>

          {event.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-lavender-light px-3 py-1 text-xs font-medium text-primary">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {success ? (
            <div className="mt-8 flex gap-3 rounded-2xl border border-green-mid/20 bg-green-light p-4">
              <IconCheckCircle className="h-6 w-6 shrink-0 text-green-mid" />
              <p className="text-sm font-medium leading-snug text-primary">
                ¡Inscripción registrada! Te enviaremos un correo a tu mail UC.
              </p>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-green-light bg-green-light/30 p-4 sm:p-5">
              {event.isPaid ? (
                <>
                  <p className="text-3xl font-extrabold text-primary">${formatClp(event.price)} CLP</p>
                  <p className="mt-1 text-sm text-muted">Pago seguro via WebPay</p>
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="mt-4 w-full rounded-full bg-accent py-3.5 text-center text-sm font-bold text-primary shadow-sm transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Inscribirse y Pagar →
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleRegister}
                  className="w-full rounded-full bg-green-mid py-3.5 text-center text-sm font-bold text-app-surface shadow-sm transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-mid"
                >
                  Inscribirse gratis →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
