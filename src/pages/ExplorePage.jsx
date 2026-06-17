import { useMemo, useState } from 'react';
import { mockEvents } from '../data/mockEvents.js';
import EventCard from '../components/EventCard.jsx';
import EventModal from '../components/EventModal.jsx';
import FilterPanel from '../components/FilterPanel.jsx';

const CATEGORIES = ['Cultura', 'Deportes', 'Académico', 'Social', 'Tecnología'];

function IconSearch({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
    </svg>
  );
}

function normalize(s) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '');
}

export default function ExplorePage() {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceType, setPriceType] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [availabilityOnly, setAvailabilityOnly] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selected, setSelected] = useState(null);

  // Extract all unique tags from events
  const allTags = useMemo(() => {
    const tags = new Set();
    mockEvents.forEach((event) => {
      event.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    
    return mockEvents.filter((ev) => {
      // Text search filter
      if (q) {
        const hay = normalize(
          [ev.title, ev.description, ev.location, ev.organizer, ev.category, ...(ev.tags || [])].join(' '),
        );
        if (!hay.includes(q)) return false;
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(ev.category)) {
        return false;
      }

      // Price filter
      if (priceType === 'free' && ev.isPaid) return false;
      if (priceType === 'paid' && !ev.isPaid) return false;

      // Date range filter
      if (dateRange.from && ev.date < dateRange.from) return false;
      if (dateRange.to && ev.date > dateRange.to) return false;

      // Availability filter
      if (availabilityOnly && ev.registered >= ev.capacity) return false;

      // Tags filter
      if (selectedTags.length > 0) {
        const hasMatchingTag = selectedTags.some((tag) =>
          ev.tags?.includes(tag)
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [query, selectedCategories, priceType, dateRange, availabilityOnly, selectedTags]);

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceType('all');
    setDateRange({ from: '', to: '' });
    setAvailabilityOnly(false);
    setSelectedTags([]);
    setQuery('');
  };

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
          <h1 className="text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">Explorar Eventos</h1>
          <p className="mt-2 max-w-2xl text-base text-muted sm:text-lg">
            Encuentra actividades en campus, deportes, charlas y más. Filtra por categoría o busca por palabra clave.
          </p>

          <div className="relative mx-auto mt-8 max-w-xl">
            <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-green-mid" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, lugar, organizador..."
              className="w-full rounded-full border border-green-light bg-app-surface py-3.5 pl-12 pr-4 text-sm text-primary shadow-sm ring-green-mid/30 placeholder:text-muted focus:border-green-mid focus:bg-green-light focus:outline-none focus:ring-2"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filter Panel */}
          <div className="lg:col-span-1">
            <FilterPanel
              categories={CATEGORIES}
              selectedCategories={selectedCategories}
              onCategoriesChange={setSelectedCategories}
              priceType={priceType}
              onPriceTypeChange={setPriceType}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              availabilityOnly={availabilityOnly}
              onAvailabilityChange={setAvailabilityOnly}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              availableTags={allTags}
              onReset={handleResetFilters}
            />
          </div>

          {/* Events */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted">
                {filtered.length} evento{filtered.length === 1 ? '' : 's'} encontrado{filtered.length === 1 ? '' : 's'}
              </p>
            </div>

            <div className="rounded-3xl bg-green-light/60 p-4 sm:bg-green-light/50 sm:p-6 md:p-8">
              <div className="grid gap-6 sm:grid-cols-2 auto-rows-max">
                {filtered.map((ev) => (
                  <EventCard key={ev.id} event={ev} onOpenDetails={setSelected} />
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="py-12 text-center text-muted">No hay eventos que coincidan con tus filtros.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <EventModal event={selected} isOpen={Boolean(selected)} onClose={() => setSelected(null)} />
    </div>
  );
}
