// src/components/home/NewEventsCarousel.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function EventsCarousel({ events = [], autoPlay = true, interval = 4000 }) {
  // only newest events
  const slides = events.filter((e) => e?.newest);
  const [index, setIndex] = useState(0);

  const Motion = motion;

  // autoplay
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [autoPlay, slides.length, interval]);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      {/* viewport */}
      <div className="relative h-[340px] sm:h-[360px]">
        <AnimatePresence initial={false} mode="wait">
          <Motion.div
            key={slides[index].id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <EventSlideCard event={slides[index]} />
          </Motion.div>
        </AnimatePresence>
      </div>

      {/* controls */}
      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur p-2 shadow hover:bg-white hidden sm:inline-flex"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur p-2 shadow hover:bg-white hidden sm:inline-flex"
        aria-label="Next"
      >
        ›
      </button>

      {/* dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-indigo-600" : "w-2.5 bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

function EventSlideCard({ event }) {
  const seatsLeft = Math.max(0, event.perticipant ?? 0);
  return (
    <div className="grid md:grid-cols-2 h-full">
      {/* image */}
      <div className="relative">
        <img
          src={event.photo}
          alt={event.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* chips over image */}
        <div className="absolute left-3 top-3 flex gap-2">
          {event.newest && (
            <span className="rounded-full bg-emerald-600/95 px-2.5 py-1 text-xs font-semibold text-white shadow">
              New
            </span>
          )}
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold shadow ${seatsLeft === 0 ? "bg-rose-600/95 text-white" : "bg-white/90 text-slate-800 backdrop-blur"}`}>
            {seatsLeft === 0 ? "Full" : `${seatsLeft} left`}
          </span>
        </div>
      </div>

      {/* body */}
      <div className="p-5 sm:p-6 flex flex-col">
        <div className="rounded-xl bg-white/95 backdrop-blur border border-slate-200 p-4 shadow">
          <div className="font-semibold text-slate-900 line-clamp-2">{event.title}</div>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1">📅 {event.date}</span>
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1">💰 {event.fee} Tk</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link
              to="/events"
              className={`rounded-lg text-sm font-semibold py-2 text-center shadow
              ${seatsLeft === 0 ? "bg-rose-600 text-white cursor-not-allowed" : "bg-slate-900 text-white hover:opacity-95"}`}
            >
              {seatsLeft === 0 ? "Finished" : "Register"}
            </Link>
            <Link
              to="/events"
              className="rounded-lg border border-slate-300 bg-white text-sm font-semibold py-2 text-center hover:bg-slate-50"
            >
              See All
            </Link>
          </div>
        </div>

        {/* meta row */}
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-600">
          <span>Topic: {event.topic ?? "General"}</span>
          <span>Seats: {event.perticipant ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
