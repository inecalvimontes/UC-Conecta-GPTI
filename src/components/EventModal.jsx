import { useEffect, useState, useRef } from 'react';
import { formatClp, formatEventDate } from '../utils/format.js';
import { useAuth } from '../context/AuthContext.jsx';
import { shareOnWhatsApp } from '../utils/share.js';
import { toPng } from 'html-to-image';

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

function IconShare({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 1H5c-3.314 0-6 2.686-6 6v6c0 3.314 2.686 6 6 6h5v4l9-8V7c0-3.314-2.686-6-6-6z" />
    </svg>
  );
}

function StoryCard({ event }) {
  const cover = event?.image || '';
  const eventDate = event?.date ? new Date(event.date) : null;
  const dateText = eventDate
    ? eventDate.toLocaleDateString('es-CL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      })
    : 'Fecha por confirmar';

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        fontFamily: 'Inter, Segoe UI, Segoe UI Emoji, Noto Color Emoji, Apple Color Emoji, sans-serif',
      }}
      className="relative overflow-hidden bg-app-surface text-primary"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: cover ? `url('${cover}')` : 'linear-gradient(180deg, #60d385 0%, #d8b4fe 100%)',
          filter: 'brightness(0.72)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/75" />

      <div className="relative flex h-full flex-col justify-between p-16 text-white">
        <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
          <span>UConecta</span>
          <span>Story</span>
        </div>

        <div className="space-y-8">
          <div className="space-y-5">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold uppercase tracking-wide backdrop-blur">
              {event?.category || 'Evento'}
            </span>
            <h1 className="max-w-[14ch] text-6xl font-black leading-[0.95] text-white drop-shadow-xl">
              {event?.title || 'Evento sin título'}
            </h1>
          </div>

          <div className="space-y-4 rounded-[2rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-2xl">📆</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Fecha y hora</p>
                <p className="mt-1 text-xl font-semibold">
                  {dateText} · {event?.time || 'Hora por confirmar'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 text-2xl">📍</div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Lugar</p>
                <p className="mt-1 text-xl font-semibold">{event?.location || 'Lugar por definir'}</p>
              </div>
            </div>

            {event?.url ? (
              <div className="flex items-start gap-4">
                <div className="mt-1 text-2xl">🔗</div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">Más información</p>
                  <p className="mt-1 truncate text-xl font-semibold">{event.url}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <div className="max-w-[18rem] text-sm leading-6 text-white/80">
            Comparte este evento en Instagram Stories o descarga la imagen para enviarla por WhatsApp.
          </div>
          <div className="rounded-2xl bg-white p-4 text-right text-sm font-bold text-primary shadow-2xl">
            @uconecta
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventModal({ event, isOpen, onClose }) {
  const [success, setSuccess] = useState(false);
  const { isAuthenticated, isSubscribed, subscribe, unsubscribe } = useAuth();
  const storyRef = useRef(null);
  const [showStory, setShowStory] = useState(false);
  const [generatingStory, setGeneratingStory] = useState(false);
  const [storyDataUrl, setStoryDataUrl] = useState(null);
  const [sharingStory, setSharingStory] = useState(false);

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
  const userIsSubscribed = isSubscribed(event.id);

  const handleSubscribe = () => {
    if (userIsSubscribed) {
      unsubscribe(event.id);
    } else {
      subscribe(event.id);
      setSuccess(true);
    }
  };

  const generateStoryImage = async () => {
    if (!storyRef.current) return;
    setGeneratingStory(true);
    try {
      // html-to-image respects the element's size; StoryCard renders at 1080x1920
      const dataUrl = await toPng(storyRef.current, { cacheBust: true, pixelRatio: 2 });
      setStoryDataUrl(dataUrl);
    } catch (err) {
      console.error('Error generating story image', err);
      alert('Error al generar la imagen. Intenta nuevamente.');
    } finally {
      setGeneratingStory(false);
    }
  };

  const downloadStoryImage = () => {
    const url = storyDataUrl;
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = `uconecta_${event.id}_story.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const dataUrlToFile = async (dataUrl, fileName) => {
    const response = await fetch(dataUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type || 'image/png' });
  };

  const shareStoryImage = async () => {
    if (!storyDataUrl) return;

    const fileName = `uconecta_${event.id}_story.png`;
    const shareTitle = event.title || 'UConecta';
    const shareText = [
      '¡Te comparto este evento!',
      '',
      event.title || 'Evento',
      event.date ? `Fecha: ${event.date}` : null,
      event.time ? `Hora: ${event.time}` : null,
      event.location ? `Ubicación: ${event.location}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      setSharingStory(true);
      const file = await dataUrlToFile(storyDataUrl, fileName);

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          files: [file],
        });
        return;
      }

      downloadStoryImage();
    } catch (error) {
      console.error('Error sharing story image', error);
      downloadStoryImage();
    } finally {
      setSharingStory(false);
    }
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
                ¡Te has suscrito al evento! Recibirás notificaciones sobre cambios.
              </p>
            </div>
          ) : !isAuthenticated ? (
            <div className="mt-8 rounded-2xl border border-green-light bg-green-light/30 p-4 sm:p-5">
              <p className="text-sm font-medium text-primary mb-3">
                Inicia sesión para suscribirte a este evento
              </p>
              <a
                href="/login"
                className="block w-full rounded-full bg-accent py-3.5 text-center text-sm font-bold text-primary shadow-sm transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Iniciar sesión
              </a>
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-green-light bg-green-light/30 p-4 sm:p-5">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSubscribe}
                  className={`flex-1 rounded-full py-3.5 text-center text-sm font-bold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    userIsSubscribed
                      ? 'border-2 border-green-mid text-green-mid hover:bg-green-mid/10'
                      : 'bg-green-mid text-app-surface hover:brightness-105 focus-visible:outline-green-mid'
                  }`}
                >
                  {userIsSubscribed ? '✓ Suscrito' : 'Suscribirse →'}
                </button>
                <button
                  type="button"
                  onClick={() => shareOnWhatsApp(event)}
                  className="flex items-center justify-center rounded-full border-2 border-green-mid px-5 py-3.5 text-green-mid transition hover:bg-green-mid/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-mid"
                  title="Compartir por WhatsApp"
                  aria-label="Compartir por WhatsApp"
                >
                  <IconShare className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowStory(true);
                    setStoryDataUrl(null);
                  }}
                  className="ml-2 flex items-center justify-center rounded-full border-2 border-green-mid px-4 py-3.5 text-green-mid transition hover:bg-green-mid/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-mid"
                  title="Crear Story"
                  aria-label="Crear Story"
                >
                  Crear Story
                </button>
              </div>
            </div>
          )}
        </div>
        {showStory && (
          <div
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setShowStory(false);
            }}
          >
            <div className="max-w-md rounded-xl bg-app-surface p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold">Vista previa - Story (9:16)</h3>
                <button type="button" onClick={() => setShowStory(false)} className="text-sm text-muted">Cerrar</button>
              </div>

              <div className="mb-3 flex justify-center">
                <div style={{ width: 270, height: 480, overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div style={{ width: 1080, height: 1920, transform: 'scale(0.25)', transformOrigin: 'top left' }}>
                    <StoryCard event={event} />
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {!storyDataUrl ? (
                  <button
                    type="button"
                    onClick={generateStoryImage}
                    disabled={generatingStory}
                    className="flex-1 rounded-full bg-green-mid py-2 text-sm font-semibold text-app-surface disabled:opacity-60"
                  >
                    {generatingStory ? 'Generando...' : 'Generar imagen'}
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={shareStoryImage}
                      disabled={sharingStory}
                      className="flex-1 rounded-full bg-green-mid py-2 text-sm font-semibold text-app-surface disabled:opacity-60"
                    >
                      {sharingStory ? 'Compartiendo...' : 'Share Image'}
                    </button>
                    <button type="button" onClick={downloadStoryImage} className="flex-1 rounded-full bg-accent py-2 text-sm font-semibold text-primary">
                      Descargar PNG
                    </button>
                  </>
                )}
              </div>

              {/* Hidden full-size node for html-to-image to capture */}
              <div style={{ position: 'absolute', left: -9999, top: 0, width: 1080, height: 1920 }} aria-hidden>
                <div ref={storyRef}>
                  <StoryCard event={event} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
