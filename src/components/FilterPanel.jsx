import { useState } from 'react';

function IconChevron({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function IconX({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function FilterPanel({
  categories,
  selectedCategories,
  onCategoriesChange,
  priceType,
  onPriceTypeChange,
  dateRange,
  onDateRangeChange,
  availabilityOnly,
  onAvailabilityChange,
  selectedTags,
  onTagsChange,
  availableTags,
  onReset,
}) {
  const [expanded, setExpanded] = useState({
    categories: true,
    price: true,
    dates: true,
    availability: true,
    tags: false,
  });

  const toggleExpanded = (section) => {
    setExpanded((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleCategory = (category) => {
    onCategoriesChange(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category],
    );
  };

  const toggleTag = (tag) => {
    onTagsChange(
      selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag],
    );
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceType !== 'all' ||
    dateRange.from ||
    dateRange.to ||
    availabilityOnly ||
    selectedTags.length > 0;

  return (
    <div className="space-y-4 rounded-2xl bg-lavender-light p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Filtros</h2>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onReset}
            className="text-sm font-medium text-green-mid hover:text-green-dark transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="space-y-3">
        {/* Categorías */}
        <div className="border-t border-green-light/30 pt-3">
          <button
            type="button"
            onClick={() => toggleExpanded('categories')}
            className="flex w-full items-center justify-between py-2 font-medium text-primary hover:text-green-mid transition-colors"
          >
            <span>Categorías</span>
            <IconChevron
              className={`h-5 w-5 transition-transform ${expanded.categories ? 'rotate-180' : ''}`}
            />
          </button>
          {expanded.categories && (
            <div className="space-y-2 pt-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="h-4 w-4 rounded border-green-mid text-green-mid focus:ring-2 focus:ring-green-mid"
                  />
                  <span className="text-sm text-primary">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Tipo de entrada */}
        <div className="border-t border-green-light/30 pt-3">
          <button
            type="button"
            onClick={() => toggleExpanded('price')}
            className="flex w-full items-center justify-between py-2 font-medium text-primary hover:text-green-mid transition-colors"
          >
            <span>Tipo de entrada</span>
            <IconChevron className={`h-5 w-5 transition-transform ${expanded.price ? 'rotate-180' : ''}`} />
          </button>
          {expanded.price && (
            <div className="space-y-2 pt-2">
              {[
                { value: 'all', label: 'Todos' },
                { value: 'free', label: 'Gratuito' },
                { value: 'paid', label: 'Pagado' },
              ].map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="price"
                    value={option.value}
                    checked={priceType === option.value}
                    onChange={(e) => onPriceTypeChange(e.target.value)}
                    className="h-4 w-4 border-green-mid text-green-mid focus:ring-2 focus:ring-green-mid"
                  />
                  <span className="text-sm text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Fechas */}
        <div className="border-t border-green-light/30 pt-3">
          <button
            type="button"
            onClick={() => toggleExpanded('dates')}
            className="flex w-full items-center justify-between py-2 font-medium text-primary hover:text-green-mid transition-colors"
          >
            <span>Fechas</span>
            <IconChevron className={`h-5 w-5 transition-transform ${expanded.dates ? 'rotate-180' : ''}`} />
          </button>
          {expanded.dates && (
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-medium text-primary mb-1">Desde</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    onDateRangeChange({
                      ...dateRange,
                      from: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-green-light bg-app-surface px-3 py-2 text-sm text-primary focus:border-green-mid focus:outline-none focus:ring-2 focus:ring-green-mid/30"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-primary mb-1">Hasta</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) =>
                    onDateRangeChange({
                      ...dateRange,
                      to: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-green-light bg-app-surface px-3 py-2 text-sm text-primary focus:border-green-mid focus:outline-none focus:ring-2 focus:ring-green-mid/30"
                />
              </div>
            </div>
          )}
        </div>

        {/* Disponibilidad */}
        <div className="border-t border-green-light/30 pt-3">
          <button
            type="button"
            onClick={() => toggleExpanded('availability')}
            className="flex w-full items-center justify-between py-2 font-medium text-primary hover:text-green-mid transition-colors"
          >
            <span>Disponibilidad</span>
            <IconChevron
              className={`h-5 w-5 transition-transform ${expanded.availability ? 'rotate-180' : ''}`}
            />
          </button>
          {expanded.availability && (
            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={availabilityOnly}
                  onChange={(e) => onAvailabilityChange(e.target.checked)}
                  className="h-4 w-4 rounded border-green-mid text-green-mid focus:ring-2 focus:ring-green-mid"
                />
                <span className="text-sm text-primary">Solo con cupos disponibles</span>
              </label>
            </div>
          )}
        </div>

        {/* Tags */}
        {availableTags && availableTags.length > 0 && (
          <div className="border-t border-green-light/30 pt-3">
            <button
              type="button"
              onClick={() => toggleExpanded('tags')}
              className="flex w-full items-center justify-between py-2 font-medium text-primary hover:text-green-mid transition-colors"
            >
              <span>Temáticas</span>
              <IconChevron className={`h-5 w-5 transition-transform ${expanded.tags ? 'rotate-180' : ''}`} />
            </button>
            {expanded.tags && (
              <div className="flex flex-wrap gap-2 pt-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? 'bg-green-mid text-app-surface'
                        : 'border border-green-light/50 text-primary hover:border-green-mid'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <div className="border-t border-green-light/30 pt-3">
          <p className="text-xs font-medium text-muted mb-2">Filtros activos:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center gap-1 rounded-full bg-green-mid/10 px-2 py-1 text-xs text-green-mid"
              >
                {cat}
                <button
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className="hover:text-green-dark"
                  aria-label="Remove filter"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            ))}
            {priceType !== 'all' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-mid/10 px-2 py-1 text-xs text-green-mid">
                {priceType === 'free' ? 'Gratuito' : 'Pagado'}
                <button
                  type="button"
                  onClick={() => onPriceTypeChange('all')}
                  className="hover:text-green-dark"
                  aria-label="Remove filter"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            )}
            {(dateRange.from || dateRange.to) && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-mid/10 px-2 py-1 text-xs text-green-mid">
                {dateRange.from && dateRange.to
                  ? `${dateRange.from} a ${dateRange.to}`
                  : dateRange.from
                    ? `Desde ${dateRange.from}`
                    : `Hasta ${dateRange.to}`}
                <button
                  type="button"
                  onClick={() => onDateRangeChange({ from: '', to: '' })}
                  className="hover:text-green-dark"
                  aria-label="Remove filter"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            )}
            {availabilityOnly && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-mid/10 px-2 py-1 text-xs text-green-mid">
                Con cupos
                <button
                  type="button"
                  onClick={() => onAvailabilityChange(false)}
                  className="hover:text-green-dark"
                  aria-label="Remove filter"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-green-mid/10 px-2 py-1 text-xs text-green-mid"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className="hover:text-green-dark"
                  aria-label="Remove filter"
                >
                  <IconX className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
