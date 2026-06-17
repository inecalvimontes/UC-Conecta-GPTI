/**
 * Utilities for sharing events
 */

export function generateWhatsAppMessage(event) {
  // Use explicit Unicode escapes for emojis to avoid encoding/font issues
  const PARTY = '\u{1F389}'; // 🎉
  const CALENDAR = '\u{1F4C6}'; // 📅
  const CLOCK = '\u{23F0}'; // ⏰
  const PIN = '\u{1F4CD}'; // 📍

  const message = `${PARTY} Estás invitad@!\n\nVoy a: ${event.title}\n${CALENDAR} Fecha: ${formatEventDateForShare(event.date)}\n${CLOCK} Hora: ${event.time}\n${PIN} Ubicación: ${event.location || '—'}\n\nÚnete a través de UConecta ¡te espero!`;

  return message;
}

function formatEventDateForShare(isoDate) {
  try {
    const d = new Date(`${isoDate}T12:00:00`);
    return new Intl.DateTimeFormat('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    }).format(d);
  } catch {
    return isoDate;
  }
}

export function generateWhatsAppUrl(event) {
  const message = generateWhatsAppMessage(event);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/?text=${encodedMessage}`;
}

export function shareOnWhatsApp(event) {
  const url = generateWhatsAppUrl(event);
  window.open(url, '_blank', 'width=600,height=600');
}
