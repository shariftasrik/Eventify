import { useState } from "react";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="py-4 px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="md:hidden p-2 rounded hover:bg-gray-100"
              aria-label="Open sidebar"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-sidebar"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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

            <a href="#" className="text-2xl font-extrabold tracking-tight">
              EVENTIFY
            </a>
          </div>

          <div className="hidden md:block">
            <Navbar />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="relative hidden md:block w-64">
              <input
                type="text"
                placeholder="Search for events..."
                className="w-full bg-gray-100 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <span className="absolute right-3 top-2.5 text-gray-500">
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
              </span>
            </div>

            <button
              type="button"
              className="md:hidden p-2 rounded hover:bg-gray-100"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              className="p-2 rounded hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          className={`
            absolute left-0 top-0 h-full w-72 max-w-[85%] bg-white shadow-xl
            transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }
            flex flex-col
          `}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <span className="text-lg font-semibold">Menu</span>
            <button
              type="button"
              aria-label="Close sidebar"
              className="p-2 rounded hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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

          <div className="px-4 py-3 overflow-y-auto">
            <div className="[&_*]:block [&_a]:py-2 [&_a]:text-gray-700 [&_a:hover]:text-gray-900">
              <Navbar />
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
