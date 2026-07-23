import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import SareeCard, { SareeCardSkeleton } from '../components/SareeCard';
import { subscribeSarees, getUniqueCategories } from '../sareeService';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low – High' },
  { value: 'price-high', label: 'Price: High – Low' },
];

export default function Collection() {
  const location = useLocation();
  const [sarees, setSarees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(location.state?.category || '');
  const [sort, setSort] = useState('newest');

  useEffect(() => {
    if (location.state?.category) {
      setCategory(location.state.category);
    }
  }, [location.state]);

  useEffect(() => {
    const unsubscribe = subscribeSarees(
      (data) => {
        setSarees(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const categories = useMemo(() => getUniqueCategories(sarees), [sarees]);

  const filtered = useMemo(() => {
    let result = [...sarees];

    if (category) {
      result = result.filter(
        (s) => s.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((s) => s.name?.toLowerCase().includes(q));
    }

    switch (sort) {
      case 'price-low':
        result.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        break;
    }

    return result;
  }, [sarees, category, search, sort]);

  const hasActiveFilters = category || search.trim();

  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="eyebrow">Our Collection</p>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-maroon sm:text-4xl md:text-5xl">
            Every Saree, Every Story
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-ink/60 sm:text-base">
            Browse our full collection. Filter by category, search by name, or
            sort by price to find your perfect drape.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-10 space-y-4 rounded-2xl border border-maroon/10 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-11"
              />
            </div>

            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="input-field appearance-none pl-11 pr-10 lg:w-56"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setCategory('')}
                className={`min-h-[36px] rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-200 ${
                  !category
                    ? 'bg-maroon text-ivory shadow-sm'
                    : 'bg-ivory text-ink/60 hover:bg-maroon/5 hover:text-maroon'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat === category ? '' : cat)}
                  className={`min-h-[36px] rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-200 ${
                    category === cat
                      ? 'bg-maroon text-ivory shadow-sm'
                      : 'bg-ivory text-ink/60 hover:bg-maroon/5 hover:text-maroon'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-xs text-ink/50">
              <span>
                Showing {filtered.length} of {sarees.length} sarees
              </span>
              <button
                type="button"
                onClick={() => {
                  setCategory('');
                  setSearch('');
                }}
                className="inline-flex items-center gap-1 text-maroon hover:text-gold"
              >
                <X className="h-3 w-3" />
                Clear filters
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-10 rounded-xl border border-maroon/20 bg-maroon/5 p-6 text-center">
            <p className="text-sm text-maroon">
              Unable to load collection. Please check your Firebase configuration.
            </p>
          </div>
        )}

        {!error && loading && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SareeCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!error && !loading && filtered.length === 0 && (
          <div className="mt-10 rounded-xl border border-dashed border-maroon/20 bg-ivory p-12 text-center">
            <p className="font-serif text-xl text-maroon">
              {sarees.length === 0 ? 'No sarees yet' : 'No matches found'}
            </p>
            <p className="mt-2 text-sm text-ink/60">
              {sarees.length === 0
                ? 'New sarees will appear here once added from the admin panel.'
                : 'Try adjusting your filters or search term.'}
            </p>
          </div>
        )}

        {!error && !loading && filtered.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {filtered.map((saree) => (
              <SareeCard key={saree.id} saree={saree} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
