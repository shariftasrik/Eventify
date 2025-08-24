import { motion } from "framer-motion";
import { CalendarPlus, Ticket } from "lucide-react";

export default function RegisteredEvents({ events = [] }) {
  if (!events.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 p-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <CalendarPlus className="h-6 w-6" />
        </div>
        <h4 className="mt-3 text-base font-semibold text-slate-900">
          My Registered Events
        </h4>
        <p className="mt-1 text-sm text-slate-600">
          You haven’t registered for an event yet.
        </p>
        <a
          href="/events"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <Ticket className="h-4 w-4" />
          Register an event
        </a>
      </div>
    );
  }
  const MotionLi = motion.li;

  // Simple list of registered items
  return (
    <ul className="space-y-3">
      {events.map((e) => (
        <MotionLi
          key={e.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-slate-200 bg-white p-3"
        >
          <div className="flex items-center gap-3">
            <img
              src={e.photo}
              alt={e.title}
              className="h-10 w-10 rounded-md object-cover"
            />
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-slate-900">
                {e.title}
              </div>
              <div className="text-xs text-slate-600">
                {e.date} • {e.fee} Tk
              </div>
            </div>
          </div>
        </MotionLi>
      ))}
    </ul>
  );
}
