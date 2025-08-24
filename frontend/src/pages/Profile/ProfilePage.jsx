import { motion } from "framer-motion";
import { Building2, CalendarCheck } from "lucide-react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getAllEvents } from "../../data/events";
import ProfileSidebar from "./ProfileSidebar";

function useRegisteredEvents() {
  const all = getAllEvents();
  const stored = (() => {
    try {
      const raw = localStorage.getItem("registeredEvents");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();
  const storedIds = new Set(stored.map((e) => e.id));

  const merged = all.filter((e) => e.isRegistered || storedIds.has(e.id));
  return merged;
}

function useMyClubs() {
  const all = getAllEvents();
  const names = Array.from(
    new Set(
      all
        .map((e) => e.organizer)
        .filter(Boolean)
        .filter((s) => s.toLowerCase().includes("aust"))
    )
  );
  if (names.length > 0) return names.slice(0, 8);
  return [
    "AUST CSE Society",
    "AUST EEE Association",
    "AUST Robotics Club",
    "AUST Architecture & Design Club",
    "AUST BBA Entrepreneurship Club",
    "AUST IPE Society",
  ];
}

const Motion = motion;

export default function ProfilePage() {
  const registered = useRegisteredEvents();
  const clubs = useMyClubs();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/20 to-purple-50/20">
      <Header />

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <ProfileSidebar />

          {/* Body */}
          <div className="space-y-6">
            {/* Hero / heading */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-md backdrop-blur">
              <div className="pointer-events-none absolute -top-14 -right-10 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome back 👋
              </h1>
              <p className="mt-1 text-slate-600">
                Manage your profile, clubs, and event registrations from one
                place.
              </p>
            </div>

            {/* Block 1: My Clubs */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">
                <Building2 className="h-4 w-4" />
                My Clubs
              </div>

              <Motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
              >
                {clubs.map((c) => (
                  <div
                    key={c}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 text-white grid place-items-center font-bold">
                      {c.replace("AUST ", "").slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 line-clamp-1">
                        {c}
                      </div>
                      <div className="text-xs text-slate-500">
                        Member since 2024
                      </div>
                    </div>
                  </div>
                ))}
              </Motion.div>
            </section>

            {/* Block 2: Registered / Attended events */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-semibold">
                <CalendarCheck className="h-4 w-4" />
                Registered & Attended
              </div>

              {registered.length === 0 ? (
                <div className="mt-4 rounded-xl border border-slate-200 bg-white/80 p-8 text-center text-slate-600">
                  You haven’t registered for any events yet.
                </div>
              ) : (
                <Motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.06,
                        delayChildren: 0.05,
                      },
                    },
                  }}
                  className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {registered.map((e) => (
                    <Motion.div
                      key={e.id}
                      variants={{
                        hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                        show: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            type: "spring",
                            stiffness: 120,
                            damping: 16,
                          },
                        },
                      }}
                      className="rounded-xl border border-slate-200 bg-white/90 p-4 shadow-sm hover:shadow-md transition"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={e.photo}
                          alt={e.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="mt-3 font-semibold text-slate-900 line-clamp-1">
                        {e.title}
                      </div>
                      <div className="mt-1 text-sm text-slate-600 line-clamp-2">
                        {e.organizer} • {e.location}
                      </div>
                      <div className="mt-2 inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        {e.date} • Fee: {e.fee} Tk
                      </div>
                    </Motion.div>
                  ))}
                </Motion.div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
