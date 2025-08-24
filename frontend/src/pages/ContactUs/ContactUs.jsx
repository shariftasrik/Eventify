import { motion } from "framer-motion";

export default function ContactUs() {
  const MotionDiv = motion.div;
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30">
      {/* Header */}
      <motion.section
        className="relative px-4 md:px-8 pt-12 pb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Contact Us
          </h1>
          <p className="mt-3 text-slate-600 text-sm md:text-base">
            Have questions about our University Club? We’d love to hear from
            you!
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="py-10">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          <MotionDiv
            className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            {/* Decorative gradient strip */}
            <div className="absolute -top-10 -right-16 h-32 w-56 rotate-12 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 opacity-20 blur-2xl" />
            <div className="absolute -bottom-8 -left-16 h-24 w-40 -rotate-6 rounded-3xl bg-gradient-to-r from-fuchsia-500 to-amber-400 opacity-20 blur-2xl" />

            {/* Header */}
            <div className="flex items-center justify-between gap-3 p-6 pb-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-indigo-600 text-xl">
                  💬
                </div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900">
                  Get in Touch
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                We reply fast
              </span>
            </div>

            <div className="px-6 pb-6">
              <div className="h-px bg-slate-200/70 mb-4" />

              {/* Rows */}
              <ul className="space-y-3 text-slate-700">
                {/* Email */}
                <li className="group flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 hover:border-indigo-200 hover:bg-indigo-50/40 transition">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-100 text-indigo-700">
                      📧
                    </span>
                    <a
                      href="mailto:club@aust.edu"
                      className="font-medium hover:underline"
                    >
                      club@aust.edu
                    </a>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText("club@aust.edu");
                      } catch (err) {
                        console.error("Failed to copy to clipboard:", err);
                      }
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    aria-label="Copy email"
                    title="Copy email"
                  >
                    Copy
                  </button>
                </li>

                {/* Phone */}
                <li className="group flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2 hover:border-indigo-200 hover:bg-indigo-50/40 transition">
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-100 text-indigo-700">
                      📞
                    </span>
                    <a
                      href="tel:+8801234567890"
                      className="font-medium hover:underline"
                    >
                      +880 1234-567890
                    </a>
                  </div>
                  <button
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText("+8801234567890");
                      } catch (err) {
                        console.error("Failed to copy to clipboard:", err);
                      }
                    }}
                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 hover:bg-slate-50"
                    aria-label="Copy phone"
                    title="Copy phone"
                  >
                    Copy
                  </button>
                </li>

                {/* Address */}
                <li className="flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white/80 px-3 py-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-indigo-100 text-indigo-700">
                    📍
                  </span>
                  <div>
                    <div className="font-medium">
                      University Campus, Block D, AUST
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Open: Sun–Thu, 9:00–17:00
                    </p>
                  </div>
                </li>
              </ul>

              {/* CTA buttons */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:club@aust.edu"
                  className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-white font-semibold shadow hover:bg-indigo-700"
                >
                  Email Us
                </a>
                <a
                  href="tel:+8801234567890"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 font-semibold hover:bg-slate-50"
                >
                  Call Now
                </a>
              </div>
            </div>
          </MotionDiv>

          <MotionDiv
            className="rounded-2xl bg-white p-6 shadow-lg border border-slate-200"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Send us a Message
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                required
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-600 text-white font-semibold py-2 hover:bg-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
