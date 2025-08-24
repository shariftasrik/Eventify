import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function Banner() {
  return (
    <section className="relative rounded-2xl text-white py-10 px-4 md:px-8 mt-12 overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-16 -left-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-16 -right-16 w-40 h-40 bg-white/10 rounded-full blur-2xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-72 md:h-64 flex flex-col items-center justify-center text-center"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            University Club
            <br />
            <span className="text-yellow-300">Event Management</span>
          </motion.h1>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {[
              { text: "Organize", icon: "🎯" },
              { text: "Collaborate", icon: "🤝" },
              { text: "Celebrate", icon: "🎉" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.7 + index * 0.2,
                  duration: 0.5,
                }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.25)",
                }}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-white font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
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
