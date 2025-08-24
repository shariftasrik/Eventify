import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, Filter } from "lucide-react";
import { getAllEvents } from "../../../data/events.js";
import EventCard from "./EventCard";
import RegisteredEvents from "./RegisteredEvents";
import EventDetailsModal from "./EventDetailsModal";

export default function EventList() {
  // ===== state =====
  const [events, setEvents] = useState(getAllEvents());
  const [registered, setRegistered] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("featured");

  // motion helpers
  const MotionDiv = motion.div;
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.05 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
  };

  // modal controls
  const handleOpenModal = (event) => setSelectedEvent(event);
  const handleCloseModal = () => setSelectedEvent(null);

  // registration flow
  const handleSubmitRegistration = (event, formData) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id
          ? {
              ...e,
              perticipant: Math.max(0, (e.perticipant ?? 0) - 1),
              isRegistered: true,
            }
          : e
      )
    );

    setRegistered((prev) => {
      const exists = prev.find((item) => item.id === event.id);
      if (exists) return prev;
      return [...prev, { ...event, formData, isRegistered: true }];
    });

    handleCloseModal();
  };

  const handleRemoveRegistration = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              perticipant: (e.perticipant ?? 0) + 1,
              isRegistered: false,
            }
          : e
      )
    );
    setRegistered((prev) => prev.filter((item) => item.id !== id));
  };

  const q = query.trim().toLowerCase();
  let visibleEvents = events;

  if (q) {
    visibleEvents = visibleEvents.filter((e) =>
      String(e.title ?? "")
        .toLowerCase()
        .includes(q)
    );
  }
  if (sortKey === "availability") {
    visibleEvents = [...visibleEvents].sort(
      (a, b) => (b.perticipant ?? 0) - (a.perticipant ?? 0)
    );
  }

  return (
    <section className="relative py-10">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.10),transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(236,72,153,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(100,116,139,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(100,116,139,0.06)_1px,transparent_1px)] bg-[size:22px_22px]" />
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        {/* Header / Toolbar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
              Explore Events
            </h2>
            <p className="text-slate-600">
              Find your next workshop, meetup, or hackathon.{" "}
              {visibleEvents.length} available.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            {/* search */}
            <label className="relative min-w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title…"
                className="w-full rounded-xl border border-slate-200 bg-white/90 pl-9 pr-3 py-2 text-sm shadow-sm outline-none focus:ring-4 focus:ring-indigo-100"
              />
            </label>

            {/* sort */}
            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-3 py-2 shadow-sm">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
                className="bg-transparent text-sm outline-none"
              >
                <option value="featured">Featured</option>
                <option value="availability">Most seats</option>
              </select>
            </div>
          </div>
        </div>

        {/* CHANGE: Modified grid layout with better spacing and responsive behavior */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* CHANGE: Events section now takes 3/4 width on xl screens for better space utilization */}
          <div className="xl:col-span-3">
            {visibleEvents.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-10 text-center shadow-sm">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                  No events found
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Try a different search term or reset filters.
                </p>
              </div>
            ) : (
              <MotionDiv
                variants={listVariants}
                initial="hidden"
                animate="show"
              
                className="event-grid grid gap-6 
                          grid-cols-1 
                          sm:grid-cols-2 
                          lg:grid-cols-2 
                          xl:grid-cols-3 
                          auto-rows-fr"
              >
                {visibleEvents.slice(0, 6).map((event) => (
                  <MotionDiv 
                    key={event.id} 
                    variants={itemVariants} 
                  
                    className="flex"
                  >
                  
                    <div className="flex-1 flex flex-col">
                      <EventCard
                        event={event}
                        onOpenModal={handleOpenModal}
                        onRemove={handleRemoveRegistration}
                        isAddEvent={event.isRegistered}
                      />
                    </div>
                  </MotionDiv>
                ))}
              </MotionDiv>
            )}
          </div>

          {/* CHANGE: Sidebar now takes 1/4 width on xl screens with better positioning */}
          <div className="xl:col-span-1">
            {/* CHANGE: Added sticky positioning to prevent overlap and keep sidebar visible */}
            <div className="sticky top-6">
              <div
                className="relative isolate overflow-hidden 
                          rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur
                          {/* CHANGE: Added min-height to ensure consistent sidebar size */}
                          min-h-[400px]"
              >
                <div
                  className="
                            pointer-events-none absolute -inset-8 -z-10 rounded-[28px]
                            opacity-35 blur-3xl
                            bg-[conic-gradient(at_50%_-10%,#818cf8_0deg,#22d3ee_120deg,#f472b6_240deg,#818cf8_360deg)]
                          "
                  aria-hidden="true"
                />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 text-pink-700 px-3 py-1 text-xs font-semibold shadow-sm border border-pink-100">
                    <Users className="h-4 w-4" />
                    Registered ({registered.length})
                  </div>

                  {/* CHANGE: Added max-height and scroll for better content management */}
                  <div className="mt-4 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm max-h-[320px] overflow-y-auto">
                    <RegisteredEvents events={registered} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={handleCloseModal}
          onSubmit={handleSubmitRegistration}
        />
      )}
    </section>
  );
}