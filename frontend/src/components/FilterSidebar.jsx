// src/components/events/FilterSidebar.jsx
export default function FilterSidebar({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  sortKey,
  sortDir,
  onSortKeyChange,
  onSortDirToggle,
  onClear,
}) {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-4 space-y-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <h2 className="text-base font-semibold mb-3">Filters</h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm text-slate-600">
              Search by topic
            </label>
            <div className="relative">
              <input
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="e.g., AI, Blockchain…"
                className="w-full bg-white/90 backdrop-blur-sm rounded-xl py-2.5 pl-4 pr-10 text-sm border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={filters.registeredOnly}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    registeredOnly: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
              />
              Registered only
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={filters.newOnly}
                onChange={(e) =>
                  onFiltersChange({ ...filters, newOnly: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
              />
              New events
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={filters.hasSeatsOnly}
                onChange={(e) =>
                  onFiltersChange({
                    ...filters,
                    hasSeatsOnly: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-400"
              />
              Has seats available
            </label>
          </div>

          <div className="my-4 h-px bg-slate-200" />

          <div className="space-y-2">
            <label htmlFor="sort" className="block text-sm text-slate-600">
              Sort by
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <select
                  id="sort"
                  value={sortKey}
                  onChange={(e) => {
                    const value = e.target.value;
                    onSortKeyChange(value);

                    // if sorting by date, force descending
                    if (value === "date") {
                      onSortDirToggle("desc");
                    }
                  }}
                  className="w-full appearance-none bg-white/90 backdrop-blur-sm rounded-xl py-2.5 pl-3 pr-8 text-sm
                             border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm"
                >
                  <option value="">None</option>
                  <option value="date">📅 Date</option>
                  <option value="title">🔤 Title</option>
                  <option value="fee">💰 Fee</option>
                  <option value="newest">✨ Newest</option>
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-indigo-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>

              <button
                type="button"
                onClick={onSortDirToggle}
                className="shrink-0 rounded-xl border border-gray-200 px-3 text-sm text-slate-700 bg-white hover:bg-slate-50"
                title={`Toggle ${sortDir.toUpperCase()}`}
              >
                {sortDir === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="button"
              onClick={onClear}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Clear filters
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
