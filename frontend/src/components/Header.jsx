import { useState } from "react";
import { useNavigate } from "react-router-dom"; // NEW
import Logo from "../assets/Logo/frame.svg";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e?.preventDefault();
    const q = searchTerm.trim();
    navigate(q ? `/events?q=${encodeURIComponent(q)}` : "/events");
  };

  return (
    <>
      <header className="py-4 px-4 md:px-8 relative">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-indigo-50/30 to-purple-50/30" />

        <div className="container mx-auto relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 rounded-xl hover:bg-white/80"
              aria-label="Open menu"
              aria-controls="mobile-sidebar"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <a
              href="#"
              className="flex items-center gap-3 font-extrabold tracking-tight"
            >
              <span className="relative inline-flex">
                <img
                  src={Logo}
                  alt="Eventify Logo"
                  className="h-8 w-8 md:h-10 md:w-10 object-contain"
                />
              </span>
              <span className="text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                EVENTIFY
              </span>
            </a>
          </div>

          <nav className="hidden md:block">
            <Navbar />
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <form
              className="relative hidden md:block w-64"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSearchTerm("");
                }}
                placeholder="Search for events..."
                className="w-full bg-white/90 backdrop-blur-sm rounded-2xl py-3 pl-5 pr-12 text-sm border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                  />
                </svg>
              </button>
            </form>

            <button
              type="button"
              className="md:hidden p-2.5 rounded-xl hover:bg-white/80"
              aria-label="Search"
              onClick={() => handleSearch()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                />
              </svg>
            </button>

            <a
              href="#"
              aria-label="User Profile"
              className="p-2.5 rounded-xl hover:bg-white/80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"
                />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* sidebar  */}
      <div
        id="mobile-sidebar"
        className={`fixed inset-0 z-50 md:hidden ${
          isMenuOpen ? "" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[85%] bg-white/95 backdrop-blur-xl shadow-2xl flex flex-col border-r border-white/20
                      transition-transform duration-300 ${
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                      }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/30">
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Menu
            </span>
            <button
              type="button"
              aria-label="Close sidebar"
              className="p-2 rounded-xl hover:bg-white/80"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="px-4 py-4 overflow-y-auto flex-1">
            <div className="[&_*]:block [&_a]:py-3 [&_a]:px-3 [&_a]:text-gray-700 [&_a:hover]:text-indigo-600 [&_a]:rounded-lg [&_a:hover]:bg-indigo-50/50">
              <Navbar />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
