import { formatClp, formatEventDateShort } from '../utils/format.js';

function IconCalendar({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
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

export default function EventCard({ event, onOpenDetails }) {
  const pct = Math.min(100, Math.round((event.registered / event.capacity) * 100));

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-app-surface shadow-card ring-1 ring-black/5 transition-shadow hover:shadow-lg">
      <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-lavender-light">
        <img src={event.image} alt="" className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute left-3 top-3 rounded-full bg-lavender-light px-3 py-1 text-xs font-semibold text-primary">
          {event.category}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
            event.isPaid
              ? 'bg-accent text-primary'
              : 'border border-green-mid/30 bg-app-surface text-green-mid'
          }`}
        >
          {event.isPaid ? `$${formatClp(event.price)} CLP` : 'GRATIS'}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h3 className="text-base font-semibold leading-snug text-primary sm:text-lg">{event.title}</h3>

        <div className="flex flex-col gap-2 text-sm text-primary">
          <p className="flex items-center gap-2">
            <IconCalendar className="h-4 w-4 shrink-0 text-green-mid" />
            <span>{formatEventDateShort(event.date)}</span>
          </p>
          <p className="flex items-start gap-2">
            <IconMapPin className="mt-0.5 h-4 w-4 shrink-0 text-green-mid" />
            <span className="leading-snug">{event.location}</span>
          </p>
        </div>

        <p className="text-sm text-muted">por {event.organizer}</p>

        <div>
          <div className="mb-1 flex justify-between text-xs text-muted">
            <span>Capacidad</span>
            <span>
              {event.registered}/{event.capacity}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-green-light">
            <div className="h-full rounded-full bg-green-mid transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenDetails?.(event)}
          className="mt-auto w-full rounded-full border-2 border-primary bg-transparent py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-app-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Ver detalles
        </button>
      </div>
    </article>
  );
}
