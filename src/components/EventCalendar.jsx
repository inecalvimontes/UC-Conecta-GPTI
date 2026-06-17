import { useMemo, useState } from 'react';

function IconChevron({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}

const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab'];
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function EventCalendar({ events, onSelectDate }) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 17)); // June 17, 2026

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((event) => {
      if (!map[event.date]) {
        map[event.date] = [];
      }
      map[event.date].push(event);
    });
    return map;
  }, [events]);

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDayClick = (day) => {
    const dateStr = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
    onSelectDate(dateStr);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const days = [];

  // Empty cells for days before month starts
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="rounded-2xl bg-app-surface p-6 shadow-card ring-1 ring-black/5">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-primary">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="rounded-md p-2 text-primary hover:bg-green-light/20 transition-colors"
            aria-label="Mes anterior"
          >
            <IconChevron className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handleNextMonth}
            className="rounded-md p-2 text-primary hover:bg-green-light/20 transition-colors"
            aria-label="Mes siguiente"
          >
            <IconChevron className="h-5 w-5 rotate-180" />
          </button>
        </div>
      </div>

      {/* Days of week header */}
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="py-2 text-center text-xs font-semibold text-muted">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return (
              <div key={`empty-${index}`} className="aspect-square" />
            );
          }

          const dateStr = formatDateKey(currentDate.getFullYear(), currentDate.getMonth(), day);
          const dayEvents = eventsByDate[dateStr] || [];
          const hasEvents = dayEvents.length > 0;

          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDayClick(day)}
              className={`relative aspect-square rounded-lg p-1 text-center text-sm font-medium transition-colors ${
                hasEvents
                  ? 'bg-green-light text-primary hover:bg-green-mid/20'
                  : 'text-primary hover:bg-green-light/20'
              } focus:outline focus:outline-2 focus:outline-primary`}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span>{day}</span>
                {hasEvents && (
                  <span className="mt-0.5 inline-block h-1 w-1 rounded-full bg-green-mid" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted border-t border-green-light/30 pt-3">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-mid" />
        <span>Tiene eventos</span>
      </div>
    </div>
  );
}
