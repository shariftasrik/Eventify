// Events.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllEvents } from "../../data/events.js";
import EventCard from "../../components/student/eventlist/EventCard.jsx";
import EventDetailsModal from "../../components/student/eventlist/EventDetailsModal.jsx";
import FilterSidebar from "../../components/FilterSidebar.jsx";
import Pagination from "../../components/Pagination.jsx";

export default function Events() {
  const [events, setEvents] = useState(getAllEvents());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    registeredOnly: false,
    newOnly: false,
    hasSeatsOnly: false,
  });
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState("asc");

  // Pagination
  const PAGE_SIZE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const MotionDiv = motion.div;

  const parseDMY = (dmy) => {
    if (!dmy) return new Date(0);
    const [d, m, y] = String(dmy).split(".").map(Number);
    return new Date(y || 0, (m || 1) - 1, d || 1);
  };

  const openModal = (event) => setSelectedEvent(event);
  const closeModal = () => setSelectedEvent(null);

  const submitRegistration = (event, formData) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id
          ? { ...e, perticipant: Math.max(0, (e.perticipant ?? 0) - 1), isRegistered: true, formData }
          : e
      )
    );
    closeModal();
  };

  const cancelRegistration = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, perticipant: (e.perticipant ?? 0) + 1, isRegistered: false, formData: undefined }
          : e
      )
    );
  };

 
  let visible = [...events];
  const q = query.trim().toLowerCase();
  if (q) visible = visible.filter((e) => e.title.toLowerCase().includes(q));
  if (filters.registeredOnly) visible = visible.filter((e) => e.isRegistered);
  if (filters.newOnly) visible = visible.filter((e) => e.newest === true);
  if (filters.hasSeatsOnly) visible = visible.filter((e) => (e.perticipant ?? 0) > 0);

  if (sortKey) {
    const dir = sortDir === "desc" ? -1 : 1;
    visible.sort((a, b) => {
      if (sortKey === "date") return (parseDMY(a.date) - parseDMY(b.date)) * dir;
      if (sortKey === "title") return a.title.localeCompare(b.title) * dir;
      if (sortKey === "fee") return ((a.fee ?? 0) - (b.fee ?? 0)) * dir;
      if (sortKey === "newest") {
        const av = a.newest ? 1 : 0;
        const bv = b.newest ? 1 : 0;
        return (av - bv) * dir;
      }
      return 0;
    });
  }


  useEffect(() => {
    setCurrentPage(1);
  }, [query, filters, sortKey, sortDir]);

  // Pagination math
  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = visible.slice(start, start + PAGE_SIZE);

  const handleClear = () => {
    setQuery("");
    setFilters({ registeredOnly: false, newOnly: false, hasSeatsOnly: false });
    setSortKey("");
    setSortDir("asc");
  };

  const handleSortDirToggle = (forceValue) => {
    if (forceValue) {
    setSortDir(forceValue);
  } else {
    setSortDir((d) => (d === "asc" ? "desc" : "asc"));
  }
  }

  return (
    <div className="min-h-screen">
      {/* header band */}
      <motion.section
        className="relative px-4 md:px-8 pt-8 pb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-indigo-50/30 to-purple-50/30" />
        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="flex items-end justify-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              All <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">Events</span>
            </h1>
          </div>
        </div>
      </motion.section>

      {/* content */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* sidebar */}
          <FilterSidebar
            query={query}
            onQueryChange={setQuery}
            filters={filters}
            onFiltersChange={setFilters}
            sortKey={sortKey}
            sortDir={sortDir}
            onSortKeyChange={setSortKey}
            onSortDirToggle={handleSortDirToggle}
            onClear={handleClear}
          />

          {/* cards + pagination */}
          <div className="lg:col-span-3">
            <motion.div
              className="grid gap-6 sm:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            >
              {pageItems.map((event) => (
                <motion.div
                  key={event.id}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                >
                  <EventCard
                    event={event}
                    onOpenModal={openModal}
                    onRemove={cancelRegistration}
                    isAddCart={event.isRegistered} 
                  />
                </motion.div>
              ))}

              {pageItems.length === 0 && (
                <div className="col-span-full rounded-xl border border-dashed p-8 text-center text-slate-500">
                  No events match your filters.
                </div>
              )}
            </motion.div>

            {/* pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <p className="mt-3 text-center text-xs text-slate-500">
              Showing {visible.length === 0 ? 0 : start + 1}–{Math.min(start + PAGE_SIZE, visible.length)} of {visible.length} events
            </p>
          </div>
        </div>
      </section>

      {/* modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetailsModal event={selectedEvent} onClose={closeModal} onSubmit={submitRegistration} />
        )}
      </AnimatePresence>
    </div>
  );
}
