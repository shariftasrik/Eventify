import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { getAllEvents } from "../../data/events.js"
import { AdminSidebar, AdminHeader } from "./components"

const ManageEvents = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setEvents(getAllEvents())
            setLoading(false)
        }, 500)
    }, [])

    const handleDeleteEvent = (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            setEvents((prev) => prev.filter((event) => event.id !== eventId))
        }
    }

    const parseDMY = (dmy) => {
        if (!dmy) return new Date(0)
        const [d, m, y] = String(dmy).split(".").map(Number)
        return new Date(y || 0, (m || 1) - 1, d || 1)
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading events...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <AdminHeader
                title="Manage Events"
                description="View, edit, and delete all events on your platform. Manage event details and monitor their status."
            />

            {/* Main Content */}
            <section className="py-6">
                <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <AdminSidebar />

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-slate-900">
                                    All Events ({events.length})
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Event
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Fee
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Participants
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {events.map((event) => {
                                            const eventDate = parseDMY(
                                                event.date
                                            )
                                            const isUpcoming =
                                                eventDate > new Date()
                                            const isToday =
                                                eventDate.toDateString() ===
                                                new Date().toDateString()

                                            let status = "Past"
                                            let statusClass =
                                                "bg-gray-100 text-gray-800"

                                            if (isToday) {
                                                status = "Today"
                                                statusClass =
                                                    "bg-orange-100 text-orange-800"
                                            } else if (isUpcoming) {
                                                status = "Upcoming"
                                                statusClass =
                                                    "bg-green-100 text-green-800"
                                            }

                                            return (
                                                <tr
                                                    key={event.id}
                                                    className="hover:bg-slate-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <img
                                                                className="h-10 w-10 rounded-lg object-cover mr-3"
                                                                src={
                                                                    event.photo
                                                                }
                                                                alt={
                                                                    event.title
                                                                }
                                                            />
                                                            <div>
                                                                <div className="text-sm font-medium text-slate-900">
                                                                    {
                                                                        event.title
                                                                    }
                                                                </div>
                                                                {event.newest && (
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                                                                        New
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        {event.date}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        ${event.fee}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                                                        {event.perticipant || 0}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClass}`}>
                                                            {status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/admin/edit-event/${event.id}`
                                                                    )
                                                                }
                                                                className="text-indigo-600 hover:text-indigo-900">
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteEvent(
                                                                        event.id
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-900">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ManageEvents
