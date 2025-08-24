import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { getAllEvents } from "../../data/events.js"
import {
    AdminSidebar,
    AdminHeader,
    AdminStats,
    AdminEventList,
} from "./components"

const AdminHome = () => {
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading
        setLoading(true)
        setTimeout(() => {
            setEvents(getAllEvents())
            setLoading(false)
        }, 500)
    }, [])

    const handleEditEvent = (event) => {
        // TODO: Navigate to edit page or open edit modal
        console.log("Edit event:", event)
    }

    const handleDeleteEvent = (eventId) => {
        // TODO: Show confirmation dialog
        if (window.confirm("Are you sure you want to delete this event?")) {
            setEvents((prev) => prev.filter((event) => event.id !== eventId))
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading admin dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <AdminHeader
                title="Admin Dashboard"
                description="Manage your events, view statistics, and monitor your platform's performance.">
                <button
                    onClick={() => navigate("/admin/create-event")}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Create New Event
                </button>
            </AdminHeader>

            {/* Main Content */}
            <section className="py-6">
                <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <AdminSidebar />

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Statistics */}
                        <AdminStats events={events} />

                        {/* Events Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-semibold text-slate-900">
                                    Recent Events
                                </h2>
                                <span className="text-sm text-slate-500">
                                    {events.length} total events
                                </span>
                            </div>

                            <AdminEventList
                                events={events}
                                onEdit={handleEditEvent}
                                onDelete={handleDeleteEvent}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminHome
