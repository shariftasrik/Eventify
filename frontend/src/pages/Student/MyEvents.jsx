import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import ProfileSidebar from "../Profile/ProfileSidebar";
import { CalendarCheck } from "lucide-react";
import { getAllEvents } from "../../data/events";

function getRegisteredOnly() {
  const all = getAllEvents();
  let stored = [];
  try {
    const raw = localStorage.getItem("registeredEvents");
    stored = raw ? JSON.parse(raw) : [];
  } catch (err){
    console.log(err);
  }
  const ids = new Set(stored.map((e) => e.id));
  return all.filter((e) => e.isRegistered || ids.has(e.id));
}

const Motion = motion;

export default function MyEventsPage() {
  const events = getRegisteredOnly();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/20 to-purple-50/20">
      <Header />

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          <ProfileSidebar />

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-semibold">
              <CalendarCheck className="h-4 w-4" />
              My Registered Events
            </div>

            {events.length === 0 ? (
              <div className="mt-6 rounded-xl border border-slate-200 bg-white/80 p-10 text-center text-slate-600">
                You have no registered events yet.
              </div>
            ) : (
              <Motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
                }}
                className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {events.map((e) => (
                  <Motion.div
                    key={e.id}
                    variants={{
                      hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { type: "spring", stiffness: 120, damping: 16 },
                      },
                    }}
                    className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm hover:shadow-md transition"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                      <img
                        src={e.photo}
                        alt={e.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-slate-900 line-clamp-1">{e.title}</div>
                      <div className="mt-1 text-sm text-slate-600 line-clamp-2">
                        {e.organizer} • {e.location}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-white">
                          {e.date}
                        </span>
                        <span className="text-slate-700 font-semibold">{e.fee} Tk</span>
                      </div>
                    </div>
                  </Motion.div>
                ))}
              </Motion.div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
