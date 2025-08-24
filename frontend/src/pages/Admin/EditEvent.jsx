import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router-dom"
import { getAllEvents } from "../../data/events.js"
import { AdminSidebar, AdminHeader } from "./components"

const EditEvent = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [events, setEvents] = useState([])
    const [event, setEvent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        fee: "",
        description: "",
        photo: "",
    })

    useEffect(() => {
        setLoading(true)
        const allEvents = getAllEvents()
        setEvents(allEvents)

        // Find the event to edit
        const eventToEdit = allEvents.find((e) => e.id === id)
        if (eventToEdit) {
            setEvent(eventToEdit)
            // Convert date from DD.MM.YYYY to YYYY-MM-DD for input
            const [day, month, year] = eventToEdit.date.split(".")
            const formattedDate = `${year}-${month.padStart(
                2,
                "0"
            )}-${day.padStart(2, "0")}`

            setFormData({
                title: eventToEdit.title || "",
                date: formattedDate,
                fee: eventToEdit.fee || "",
                description: eventToEdit.description || "",
                photo: eventToEdit.photo || "",
            })
        }
        setLoading(false)
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Convert date back to DD.MM.YYYY format
        const [year, month, day] = formData.date.split("-")
        const formattedDate = `${day}.${month}.${year}`

        const updatedEvent = {
            ...event,
            ...formData,
            date: formattedDate,
            fee: Number(formData.fee),
        }

        // Update the events array
        const updatedEvents = events.map((e) =>
            e.id === id ? updatedEvent : e
        )
        setEvents(updatedEvents)

        // TODO: Save to backend
        console.log("Updated event:", updatedEvent)

        // Navigate back to manage events
        navigate("/admin/manage-events")
    }

    const handleCancel = () => {
        navigate("/admin/manage-events")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading event...</p>
                </div>
            </div>
        )
    }

    if (!event) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">
                        Event Not Found
                    </h2>
                    <p className="text-slate-600 mb-4">
                        The event you're looking for doesn't exist.
                    </p>
                    <button
                        onClick={() => navigate("/admin/manage-events")}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                        Back to Events
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <AdminHeader
                title="Edit Event"
                description="Update the event details below. Make sure all information is accurate before saving.">
                <button
                    onClick={handleCancel}
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                    Cancel
                </button>
            </AdminHeader>

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
                            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Event Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter event title..."
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Event Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Event Fee *
                                    </label>
                                    <input
                                        type="number"
                                        name="fee"
                                        value={formData.fee}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        min="0"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Event Photo URL
                                    </label>
                                    <input
                                        type="url"
                                        name="photo"
                                        value={formData.photo}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                        Event Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Describe your event..."
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                                        Update Event
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditEvent
