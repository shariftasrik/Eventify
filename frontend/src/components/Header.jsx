import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo/frame.svg";
import Navbar from "./Navbar/Navbar";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Simple auth + role persisted in localStorage
  const [isAuthed, setIsAuthed] = useState(
    typeof window !== "undefined" && localStorage.getItem("authed") === "1"
  );
  const [role, setRole] = useState(
    (typeof window !== "undefined" && localStorage.getItem("role")) || "student"
  );

  const login = () => {
    setIsAuthed(true);
    localStorage.setItem("authed", "1");
  };
  const logout = () => {
    setIsAuthed(false);
    localStorage.removeItem("authed");
  };
  const handleRoleChange = (next) => {
    setRole(next);
    localStorage.setItem("role", next);
  };

  // Profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    const onEsc = (e) => e.key === "Escape" && setProfileOpen(false);
    document.addEventListener("mousedown", onDocClick);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <>

      <header className="py-4 px-4 md:px-8 relative z-40">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white via-indigo-50/30 to-purple-50/30" />

        <div className="container mx-auto relative flex items-center justify-between">
          {/* Left: burger + logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="md:hidden p-2 rounded-xl hover:bg-white/80"
              aria-label="Open menu"
              aria-controls="mobile-sidebar"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <a href="/" className="flex items-center gap-3 font-extrabold tracking-tight">
              <span className="relative inline-flex">
                <img src={Logo} alt="Eventify Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
              </span>
              <span className="text-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                EVENTIFY
              </span>
            </a>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:block">
            <Navbar variant="desktop" role={role} onRoleChange={handleRoleChange} />
          </nav>

          {/* Right: profile + Login/Logout button */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Profile dropdown trigger */}
            <div className="relative z-50" ref={profileRef}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((v) => !v)}
                className="p-2.5 rounded-xl hover:bg-white/80"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {profileOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-2 w-56 z-[9999] rounded-xl border border-slate-200 bg-white shadow-2xl p-2"
                >
                  <Link
                    to="/"
                    role="menuitem"
                    className="block w-full rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/"
                    role="menuitem"
                    className="block w-full rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Events
                  </Link>

                  <div className="my-2 h-px bg-slate-200" />
                  <div className="py-1 flex justify-center">
                    <button
                      role="menuitem"
                      onClick={() => {
                        isAuthed ? logout() : login();
                        setProfileOpen(false);
                      }}
                      className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:opacity-95"
                    >
                      {isAuthed ? "Logout" : "Login"}
                    </button>
                  </div>
                </div>
              )}
            </div>

            
            <button
              onClick={isAuthed ? logout : login}
              className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-95"
            >
              {isAuthed ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </header>

      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Mobile sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed inset-0 z-50 md:hidden ${isMenuOpen ? "" : "pointer-events-none"}`}
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
                      transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-4 py-4 overflow-y-auto flex-1">
            <Navbar variant="mobile" role={role} onRoleChange={handleRoleChange} />

            <div className="mt-4">
              <button
                onClick={() => {
                  isAuthed ? logout() : login();
                  setIsMenuOpen(false);
                }}
                className="w-full rounded-xl bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:opacity-95"
              >
                {isAuthed ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
