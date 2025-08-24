import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAllEvents } from "../../data/events";
import EventsCarousel from "../../components/EventCarousel";

export default function Home() {
  const Motion = motion;
  const all = getAllEvents();
  return (
    <div className="min-h-screen">
      <Motion.section
        className="relative px-4 md:px-8 pt-12 pb-16"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-indigo-50/40 to-purple-50/40" />
        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                Organize. Register.{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                  Celebrate.
                </span>
              </h1>
              <p className="mt-4 text-slate-600 max-w-xl">
                Eventify is your university’s hub for club events—hackathons,
                design jams, workshops and more. Discover what’s happening,
                register in seconds, and keep track of everything in one place.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/events"
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700 shadow"
                >
                  Explore Events
                </Link>
                <Link
                  to="/about-us"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 font-semibold hover:bg-slate-50"
                >
                  Learn More
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
                {[
                  { k: "15+", v: "Clubs" },
                  { k: "50+", v: "Events" },
                  { k: "900+", v: "Registrations" },
                ].map((s) => (
                  <div
                    key={s.v}
                    className="rounded-2xl bg-white border border-slate-200 p-4 text-center shadow-sm"
                  >
                    <div className="text-xl md:text-2xl font-extrabold text-slate-900">
                      {s.k}
                    </div>
                    <div className="text-xs uppercase tracking-wide text-slate-500 mt-1">
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Motion.div
              className="relative rounded-3xl border border-slate-200 bg-white p-4 shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <div className="relative aspect-[11/9] w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 ">
                <div className="absolute inset-0 bg-black/15" />
                <div className=" inset-0 flex items-center justify-center p-5">
                  <div className="w-full max-w-3xl rounded-xl bg-white/95 backdrop-blur border border-white/60 p-4 shadow">
                    <EventsCarousel events={all} autoPlay interval={3500}/>
                  </div>
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </Motion.section>

      <section className="py-8">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
            Why Eventify?
          </h2>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "One‑click Registration",
                desc: "Clean forms, autofill profile, instant confirmations.",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Smart Filtering",
                desc: "Find events by topic, date, fee, seats, or newest.",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 5h18v2H3zM7 11h10v2H7zM10 17h4v2h-4z" />
                  </svg>
                ),
              },
              {
                title: "Capacity Tracking",
                desc: "Real‑time seats left, waitlist and finished state.",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 3h14v18H5zM9 7h6v2H9zM9 11h6v2H9zM9 15h6v2H9z" />
                  </svg>
                ),
              },
              {
                title: "Club‑first Design",
                desc: "Built with organizers: simple to publish & manage.",
                icon: (
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" />
                  </svg>
                ),
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5"
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-xs font-semibold">
                  {f.icon} <span>Feature</span>
                </div>
                <div className="mt-3 font-semibold text-slate-900">
                  {f.title}
                </div>
                <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Tech & Hackathons",
                desc: "ML, AI, Web, DevOps and more.",
                icon: "🤖",
                kicker: "Technology",
                image:
                  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
              },
              {
                title: "Design & Creativity",
                desc: "UI/UX jams, design sprints, product workshops.",
                icon: "🎨",
                kicker: "Design",
                image:
                  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop",
              },
              {
                title: "Business & Startups",
                desc: "Pitch days, fintech meets, founder talks.",
                icon: "🚀",
                kicker: "Startups",
                image:
                  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.title}
                    className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="text-white text-xl drop-shadow">
                      {c.icon}
                    </span>
                    {c.kicker && (
                      <span className="text-white/90 text-xs font-semibold uppercase tracking-wide drop-shadow">
                        {c.kicker}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {c.desc}
                  </p>

                  <Link
                    to="/events"
                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow hover:opacity-95 transition"
                  >
                    Browse Events
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 text-center text-white">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                Ready to discover your next event?
              </h3>
              <p className="mt-2 text-white/90">
                Filter by topic, check seats, and register instantly.
              </p>
              <Link
                to="/events"
                className="mt-5 inline-flex items-center rounded-xl bg-white/95 text-slate-900 px-5 py-2 font-semibold hover:bg-white"
              >
                Explore Events
              </Link>
            </div>

            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-pink-400 mix-blend-screen blur-3xl opacity-30" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo-400 mix-blend-screen blur-3xl opacity-30" />
          </div>
        </div>
      </section>
    </div>
  );
}
