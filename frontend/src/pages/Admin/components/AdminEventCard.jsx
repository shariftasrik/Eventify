import React from "react"
import { useNavigate } from "react-router-dom"

export default function AdminEventCard({ event, onEdit, onDelete }) {
    const navigate = useNavigate()
    const parseDMY = (dmy) => {
        if (!dmy) return new Date(0)
        const [d, m, y] = String(dmy).split(".").map(Number)
        return new Date(y || 0, (m || 1) - 1, d || 1)
    }

    const isUpcoming = parseDMY(event.date) > new Date()
    const isToday =
        parseDMY(event.date).toDateString() === new Date().toDateString()

    const getStatusBadge = () => {
        if (isToday) return "bg-orange-100 text-orange-800 border-orange-200"
        if (isUpcoming) return "bg-green-100 text-green-800 border-green-200"
        return "bg-gray-100 text-gray-800 border-gray-200"
    }

    const getStatusText = () => {
        if (isToday) return "Today"
        if (isUpcoming) return "Upcoming"
        return "Past"
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
                <img
                    src={event.photo}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                    <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadge()}`}>
                        {getStatusText()}
                    </span>
                </div>
                {event.newest && (
                    <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 text-xs font-medium bg-indigo-600 text-white rounded-full">
                            New
                        </span>
                    </div>
                )}
            </div>

            <div className="p-5">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                    {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>📅</span>
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>💰</span>
                        <span>${event.fee}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <span>👥</span>
                        <span>{event.perticipant || 0} participants</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() =>
                            navigate(`/admin/edit-event/${event.id}`)
                        }
                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(event.id)}
                        className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
