import { NavLink } from "react-router-dom";
import { LayoutDashboard, User2, CalendarCheck, Users, Settings } from "lucide-react";

const itemBase =
  "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-indigo-50/60 hover:text-indigo-700";
const activeClass =
  "bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white";

export default function ProfileSidebar() {
  const linkClass = ({ isActive }) =>
    isActive ? `${itemBase} ${activeClass}` : `${itemBase} text-slate-700`;

  return (
    <aside className="sticky top-4 self-start rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-4 shadow-sm">
      <nav className="space-y-1">
        <NavLink to="/profile" className={linkClass} end>
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink to="/profile/details" className={linkClass}>
          <User2 className="h-4 w-4" />
          My Profile
        </NavLink>
        <NavLink to="/my-events" className={linkClass}>
          <CalendarCheck className="h-4 w-4" />
          My Events
        </NavLink>
        <NavLink to="/profile/clubs" className={linkClass}>
          <Users className="h-4 w-4" />
          My Clubs
        </NavLink>
        <NavLink to="/profile/settings" className={linkClass}>
          <Settings className="h-4 w-4" />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
