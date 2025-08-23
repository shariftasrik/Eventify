import getImgUrl from "../../../../utils/event_utils";

export default function EventCard({ event, onAdd, onRemove, isAddCart }) {
  if (!event) return null;

  const totalSeats = event.totalSeats ?? 20;
  const seatsLeft = Math.max(0, event.perticipant ?? 0);
  const booked = Math.max(0, totalSeats - seatsLeft);
  const bookedPct = Math.min(100, Math.round((booked / totalSeats) * 100));

  return (
    <div
      className="group relative rounded-2xl border border-slate-200 bg-white
                 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-slate-100">
        {event.photo ? (
          <img
            src={getImgUrl(String(event.photo))}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            No image
          </div>
        )}

        {event.newest && (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-600/95 px-2.5 py-1 text-xs font-semibold text-white shadow">
            New
          </span>
        )}
        <span
          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold shadow
            ${
              seatsLeft === 0
                ? "bg-rose-600/95 text-white"
                : "bg-white/90 text-slate-800 backdrop-blur"
            }`}
        >
          {seatsLeft === 0 ? "Full" : `${seatsLeft} left`}
        </span>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
          {event.title}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
            {`Fee: ${event.fee} Tk`}
          </span>
          <span className="text-xs text-green-500">{event.date}</span>
        </div>

        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-xs text-slate-500">
            <span>Booked</span>
            <span>
              {booked}/{totalSeats}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${
                seatsLeft === 0 ? "bg-rose-600" : "bg-indigo-600"
              }`}
              style={{ width: `${bookedPct}%` }}
            />
          </div>
        </div>

        <div className="mt-4">
          {isAddCart ? (
            <button
              onClick={() => onRemove(event.id)}
              className="w-full rounded-xl bg-rose-600 py-2 text-white shadow
                         transition-transform active:translate-y-[1px] focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-rose-400/60"
            >
              Cancel Registration
            </button>
          ) : (
            <button
              onClick={() => onAdd(event)}
              disabled={seatsLeft === 0}
              className="w-full rounded-xl bg-gradient-to-b from-slate-900 to-slate-800
                         py-2 text-white shadow transition-all active:translate-y-[1px]
                         disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60"
            >
              {seatsLeft === 0 ? "No Seat Left" : "Registration"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
