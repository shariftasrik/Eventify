import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function NewsLetter() {
  return (
    <section
      className="relative text-white py-16 px-6 md:px-12 mt-12 overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl">
      <div className="absolute inset-0 bg-black/40" />

      <div className="container mx-auto max-w-3xl text-center relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight drop-shadow-lg">
            STAY UP TO DATE ABOUT
            <br />
            OUR LATEST EVENTS
          </h2>
          <p className="mt-3 text-slate-200 text-sm md:text-base">
            Join our newsletter and never miss exciting events.
          </p>

          {/* Input + Button */}
          <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 w-full md:w-auto bg-white/90 text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-lg"
            />
            <button
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg px-6 py-3 transition-all shadow-lg"
            >
              Subscribe
            </button>
          </div>

          <p className="mt-4 text-xs text-slate-300">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </MotionDiv>
      </div>


      <motion.div
        className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-white/40 rounded-tl-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />

      <motion.div
        className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-white/40 rounded-br-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      />
    </section>
  );
}
