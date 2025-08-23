export default function NewsLetter() {
  return (
    <section className="bg-slate-900 text-white py-12 px-4 md:px-8 mt-12">
      <div className="container mx-auto max-w-4xl text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          STAY UP TO DATE ABOUT
          <br />
          OUR LATEST EVENTS
        </h2>
        <p className="mt-3 text-slate-300 text-sm md:text-base">
          Join our newsletter and never miss exciting events.
        </p>

        {/* Input and Button */}
        <div className="flex flex-col md:flex-row items-center mt-8 gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 w-full md:w-auto bg-white text-black rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg px-6 py-3 transition-all">
            Subscribe
          </button>
        </div>

        {/* Privacy Note */}
        <p className="mt-4 text-xs text-slate-400">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
