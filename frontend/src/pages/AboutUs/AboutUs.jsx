import { motion } from "framer-motion";
import { Rocket, Sparkles, TrendingUp } from "lucide-react";

export default function AboutUs() {
  const Motion = motion;


  const fadeUp = {
    hidden: { opacity: 0, y: 14 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut", delay: i * 0.06 },
    }),
  };


  const tlContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };
  const tlItem = {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 120, damping: 16 },
    },
  };
  const milestones = [
    {
      date: "Q1 2025",
      title: "Born at a Hackathon",
      desc: "We prototyped Eventify to end registration chaos.",
      Icon: Sparkles,
    },
    {
      date: "Q2 2025",
      title: "Beta with 5 Clubs",
      desc: "Shipped clean cards, modal registration, admin tools.",
      Icon: Rocket,
    },
    {
      date: "Q3 2025",
      title: "Campus‑wide Rollout",
      desc: "Added analytics, filtering, pagination & a11y upgrades.",
      Icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/20 to-purple-50/20">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-[-10%] h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl" />

        <div className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="relative z-10"
            >
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                About{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                  Eventify
                </span>
              </h1>
              <p className="mt-4 text-slate-600 max-w-xl">
                A student‑built platform that makes campus events effortless—
                for organizers and attendees. Create, discover, register, and
                celebrate.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Clubs", value: "15+" },
                  { label: "Events", value: "50+" },
                  { label: "Registrations", value: "900+" },
                  { label: "Satisfaction", value: "98%" },
                ].map((s, i) => (
                  <Motion.div
                    key={s.label}
                    custom={i}
                    variants={fadeUp}
                    className="rounded-xl bg-white/90 backdrop-blur border border-slate-200 p-4 text-center shadow-sm"
                  >
                    <div className="text-xl md:text-2xl font-extrabold text-slate-900">
                      {s.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-wide text-slate-500 mt-0.5">
                      {s.label}
                    </div>
                  </Motion.div>
                ))}
              </div>
            </Motion.div>

            <Motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="relative"
            >
              <div className="relative mx-auto w-full max-w-lg rounded-3xl border border-white/60 bg-white/80 backdrop-blur p-2 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop"
                  alt="Students collaborating"
                  className="h-72 w-full rounded-2xl object-cover"
                  loading="lazy"
                />
                <div className="absolute -bottom-4 right-6 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow-md border border-slate-200">
                  ⚡ Live registrations
                </div>
              </div>
            </Motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-6">
          <Motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="group relative rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-slate-200 shadow-md p-6 md:p-8 overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-indigo-400/20 blur-2xl group-hover:opacity-70 transition-opacity" />

            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 text-xs font-semibold shadow">
              🚀 Mission
            </div>

            <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
              Make campus events delightful for everyone
            </h2>

            <p className="mt-3 text-slate-600 leading-relaxed">
              From hackathons to meetups—Eventify helps clubs plan, publish and
              track events end-to-end, while students discover and register in
              seconds.
            </p>

            <ul className="mt-6 space-y-3 text-slate-700">
              {[
                "Simple publishing & approvals",
                "Smooth registration & on-site check-in",
                "Real-time capacity and insights",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm">
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Motion.div>

          <Motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            custom={1}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="h-40 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
            <div className="p-6 md:p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold">
                ✨ Values
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Clarity",
                    desc: "Clean UX that stays out of your way.",
                  },
                  {
                    title: "Reliability",
                    desc: "Stable, predictable, and fast.",
                  },
                  { title: "Community", desc: "Built with clubs, for clubs." },
                  {
                    title: "Accessibility",
                    desc: "Inclusive on every screen.",
                  },
                ].map((v) => (
                  <div
                    key={v.title}
                    className="rounded-xl bg-white border border-slate-200 p-4 hover:shadow-md transition"
                  >
                    <div className="font-semibold text-slate-900">
                      {v.title}
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <Motion.div
            variants={tlContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-xl backdrop-blur p-6 md:p-10"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/30 [mask-image:radial-gradient(900px_450px_at_50%_-10%,black,transparent)]" />

            <Motion.div
              variants={tlItem}
              className="inline-flex items-center gap-2 rounded-full bg-purple-50 text-purple-700 px-3 py-1 text-xs font-semibold shadow-sm"
            >
              🗓️ Our Journey
            </Motion.div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {milestones.map(({ date, title, desc, Icon }) => (
                <Motion.article
                  key={title}
                  variants={tlItem}
                  className="relative h-full rounded-xl border border-slate-200/70 bg-white/90 p-5 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-slate-900/90 p-2 text-white shadow">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-slate-500">
                        {date}
                      </div>
                      <h3 className="mt-0.5 font-semibold text-slate-900 leading-tight">
                        {title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mt-3">{desc}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                      Milestone
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 px-2.5 py-1 text-[11px] font-medium">
                      {date}
                    </span>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100 [background:linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.5)_40%,transparent_60%)]" />
                </Motion.article>
              ))}
            </div>
          </Motion.div>
        </div>
      </section>

      {/* Team  */}
      <section className="py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 md:p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 text-pink-700 px-3 py-1 text-xs font-semibold">
              👥 The Team
            </div>

            <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Tasrik", role: "Frontend", initials: "TS" },
                { name: "Arnob", role: "Backend", initials: "AR" },
                { name: "Alif", role: "Frontend", initials: "AL" },
              ].map((m, i) => (
                <Motion.div
                  key={m.name}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="rounded-xl border border-slate-200 p-5 bg-white hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold">
                      {m.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {m.name}
                      </div>
                      <div className="text-sm text-slate-500">{m.role}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a
                      href="#"
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                    >
                      Portfolio
                    </a>
                    <a
                      href="#"
                      className="rounded-lg bg-slate-900 text-white px-3 py-1.5 text-xs hover:opacity-95"
                    >
                      Connect
                    </a>
                  </div>
                </Motion.div>
              ))}
            </div>

            {/* FAQ  */}
            <div className="mt-10 grid md:grid-cols-2 gap-4">
              {[
                {
                  q: "Is Eventify free for clubs?",
                  a: "Yes, for campus clubs. We may add optional premium analytics later.",
                },
                {
                  q: "Can we approve/limit registrations?",
                  a: "Organizers can set capacity, waitlists and close registrations anytime.",
                },
                {
                  q: "Do you support check‑in?",
                  a: "Yep—export lists or use QR codes (beta).",
                },
                {
                  q: "How do we get started?",
                  a: "Reach out to the team and we’ll onboard your club within a day.",
                },
              ].map((f) => (
                <details
                  key={f.q}
                  className="rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm"
                >
                  <summary className="cursor-pointer list-none select-none font-semibold text-slate-900">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
              <div className="text-slate-700">
                Want to collaborate or bring Eventify to your club?
              </div>
              <a
                href="/contact"
                className="inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-4 md:px-8 pb-14">
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 text-center text-white">
              <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">
                Join the community. Build unforgettable events.
              </h3>
              <p className="mt-2 text-white/90">
                Eventify is open to clubs across departments—tech, design,
                robotics, and more.
              </p>
              <a
                href="/events"
                className="mt-5 inline-flex items-center rounded-xl bg-white/95 text-slate-900 px-5 py-2 font-semibold hover:bg-white"
              >
                Explore Events
              </a>
            </div>
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-pink-400 mix-blend-screen blur-3xl opacity-30" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo-400 mix-blend-screen blur-3xl opacity-30" />
          </div>
        </div>
      </section>
    </div>
  );
}
