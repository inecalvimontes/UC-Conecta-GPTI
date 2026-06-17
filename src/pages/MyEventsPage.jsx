import { useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { mockEvents } from '../data/mockEvents.js';
import { useAuth } from '../context/AuthContext.jsx';
import EventCard from '../components/EventCard.jsx';
import EventModal from '../components/EventModal.jsx';
import EventCalendar from '../components/EventCalendar.jsx';

function IconList({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
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

export default function MyEventsPage() {
  const { isAuthenticated, subscriptions } = useAuth();
  const [viewMode, setViewMode] = useState('list');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Get subscribed events
  const subscribedEvents = useMemo(() => {
    return mockEvents.filter((event) => subscriptions.includes(event.id));
  }, [subscriptions]);

  // Filter by date if in calendar mode with selection
  const filteredEvents = useMemo(() => {
    if (!selectedDate || viewMode === 'list') {
      return subscribedEvents;
    }
    return subscribedEvents.filter((event) => event.date === selectedDate);
  }, [subscribedEvents, selectedDate, viewMode]);

  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });
  }, [filteredEvents]);

  const selectedDateFormatted = useMemo(() => {
    if (!selectedDate) return null;
    const date = new Date(selectedDate + 'T00:00');
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [selectedDate]);

  return (
    <div className="min-h-[60vh] bg-app-surface">
      <header className="relative overflow-hidden bg-green-light px-4 pb-10 pt-10 sm:px-6 sm:pb-12 sm:pt-12">
        <div
          className="pointer-events-none absolute -left-24 bottom-0 h-48 w-48 rounded-[40%] bg-lavender/50 opacity-70 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-[45%] bg-accent/40 opacity-80 blur-xl"
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">Mis Eventos</h1>
          <p className="mt-2 max-w-2xl text-base text-muted sm:text-lg">
            {subscribedEvents.length === 0
              ? 'Aún no te has suscrito a ningún evento. ¡Explora y encuentra tus actividades favoritas!'
              : `Tienes ${subscribedEvents.length} evento${subscribedEvents.length === 1 ? '' : 's'} en tu calendario.`}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {subscribedEvents.length === 0 ? (
          <div className="rounded-2xl bg-lavender-light p-8 text-center">
            <p className="text-muted mb-4">No hay eventos suscritos</p>
            <a
              href="/explorar"
              className="inline-block rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-primary hover:opacity-90 transition-opacity"
            >
              Explorar Eventos
            </a>
          </div>
        ) : (
          <>
            {/* View Mode Toggle */}
            <div className="mb-6 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setViewMode('list');
                  setSelectedDate(null);
                }}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  viewMode === 'list'
                    ? 'bg-green-mid text-app-surface'
                    : 'border-2 border-green-light text-primary hover:bg-green-light/50'
                }`}
              >
                <IconList className="h-4 w-4" />
                Lista
              </button>
              <button
                type="button"
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-green-mid text-app-surface'
                    : 'border-2 border-green-light text-primary hover:bg-green-light/50'
                }`}
              >
                <IconCalendar className="h-4 w-4" />
                Calendario
              </button>
            </div>

            {/* Content */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Calendar or Info */}
              {viewMode === 'calendar' && (
                <div>
                  <EventCalendar events={subscribedEvents} onSelectDate={setSelectedDate} />
                </div>
              )}

              {/* Events List */}
              <div className={viewMode === 'calendar' ? 'lg:col-span-2' : 'lg:col-span-3'}>
                {selectedDate && viewMode === 'calendar' && (
                  <div className="mb-6 rounded-lg bg-green-light/30 p-4 border-l-4 border-green-mid">
                    <p className="text-sm font-medium text-primary mb-2">Seleccionado:</p>
                    <p className="text-lg font-semibold text-primary capitalize">{selectedDateFormatted}</p>
                    {sortedEvents.length === 0 && (
                      <p className="mt-2 text-sm text-muted">No hay eventos en esta fecha</p>
                    )}
                  </div>
                )}

                <div className={`grid gap-6 ${viewMode === 'calendar' ? 'sm:grid-cols-1 lg:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} auto-rows-max`}>
                  {sortedEvents.length === 0 ? (
                    viewMode === 'calendar' ? null : (
                      <p className="text-center text-muted py-8">No hay eventos suscritos</p>
                    )
                  ) : (
                    sortedEvents.map((ev) => (
                      <EventCard key={ev.id} event={ev} onOpenDetails={setSelectedEvent} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <EventModal event={selectedEvent} isOpen={Boolean(selectedEvent)} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
