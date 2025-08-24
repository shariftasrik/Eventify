import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/frame.svg"; 

export default function AuthLayout({ title, subtitle, children, footer }) {
  const MotionDiv = motion.div;
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30">
      {/* soft glows */}
      <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl" />

      <header className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Eventify" className="h-8 w-8" />
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
              EVENTIFY
            </span>
          </Link>
          <Link
            to="/events"
            className="rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Browse Events
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <div className="container mx-auto max-w-7xl px-4 py-6 md:py-12 grid md:grid-cols-2 gap-10 items-center">
          {/* Left: Card */}
          <MotionDiv
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mx-auto w-full max-w-md"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-6 shadow-xl">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-2xl" />
              <div className="absolute -bottom-8 -left-10 h-28 w-28 rounded-3xl bg-gradient-to-r from-fuchsia-500 to-amber-400 opacity-20 blur-2xl" />

              <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
              {subtitle && <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p>}

              <div className="mt-5">{children}</div>
            </div>

            {footer && (
              <div className="mt-4 text-center text-sm text-slate-600">{footer}</div>
            )}
          </MotionDiv>

          {/* Right: Illustration */}
          <MotionDiv
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="hidden md:block"
          >
            <div className="relative rounded-3xl border border-white/60 bg-white/70 backdrop-blur p-2 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop"
                alt="Students collaborating"
                className="h-[430px] w-full rounded-2xl object-cover"
                loading="lazy"
              />
              <div className="absolute right-6 -bottom-4 rounded-xl bg-white px-3 py-2 text-xs font-semibold shadow border border-slate-200">
                ⚡ Seamless registrations
              </div>
            </div>
          </MotionDiv>
        </div>
      </main>
    </div>
  );
}
