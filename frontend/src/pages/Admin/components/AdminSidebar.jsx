import React from "react"
import { Link, useLocation } from "react-router-dom"

export default function AdminSidebar() {
    const location = useLocation()

    const navItems = [
        { path: "/admin", label: "Dashboard", icon: "📊" },
        { path: "/admin/create-event", label: "Create Event", icon: "➕" },
        { path: "/admin/manage-events", label: "Manage Events", icon: "📋" },
        { path: "/admin/analytics", label: "Analytics", icon: "📈" },
    ]

    const handleLogout = () => {
        // TODO: Implement logout logic
        console.log("Logout clicked")
    }

    return (
        <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-1">
                            Admin Panel
                        </h2>
                        <p className="text-sm text-slate-600">
                            Manage your events
                        </p>
                    </div>

                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    location.pathname === item.path
                                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                }`}>
                                <span className="text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="my-4 h-px bg-slate-200" />

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors">
                        <span className="text-lg">🚪</span>
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    )
}
