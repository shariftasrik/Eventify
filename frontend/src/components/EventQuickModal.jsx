import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  MapPin,
  Building2,
  CalendarDays,
  Ticket,
  UsersRound,
} from "lucide-react";

export default function EventQuickViewModal({ event, onClose, onRegister }) {

  useEffect(() => {
    if (!event) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [event, onClose]);


  if (!event) return null;

  const totalSeats = event.perticipant ?? 20;
  const seatsLeft = Math.max(0, event.perticipant ?? 0);
  const booked = Math.max(0, totalSeats - seatsLeft);

  const MotionDiv = motion.div;

  return (
    <AnimatePresence>
      <MotionDiv
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <MotionDiv
          className="absolute left-1/2 top-1/2 w-[min(920px,95vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 160, damping: 18 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="grid md:grid-cols-2">
            {/* Image */}
            <div className="relative h-60 md:h-full bg-slate-100">
              {event.photo && (
                <img
                  src={event.photo}
                  alt={event.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              )}
              {event.newest && (
                <span className="absolute left-3 top-3 rounded-full bg-emerald-600/95 px-2.5 py-1 text-xs font-semibold text-white shadow">
                  New
                </span>
              )}
            </div>

            {/* Details */}
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  {event.title}
                </h3>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-900">Organizer:</span>
                  <span className="truncate">{event.organizer || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-900">Location:</span>
                  <span className="truncate">{event.location || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-900">Date:</span>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-900">Fee:</span>
                  <span>{event.fee} Tk</span>
                </div>
                <div className="flex items-center gap-2">
                  <UsersRound className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-900">Seats:</span>
                  <span>
                    {booked}/{totalSeats} booked • {seatsLeft} left
                  </span>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    onClose?.();
                    onRegister?.(event);
                  }}
                  disabled={seatsLeft === 0}
                  className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {seatsLeft === 0 ? "No Seat Left" : "Register"}
                </button>
              </div>
            </div>
          </div>
        </MotionDiv>
      </MotionDiv>
    </AnimatePresence>
  );
}
