import React from "react"
import StatsCard from "./StatsCard"

export default function AdminStats({ events }) {
    const parseDMY = (dmy) => {
        if (!dmy) return new Date(0)
        const [d, m, y] = String(dmy).split(".").map(Number)
        return new Date(y || 0, (m || 1) - 1, d || 1)
    }

    const calculateStats = () => {
        const now = new Date()

        const totalEvents = events.length
        const upcomingEvents = events.filter(
            (event) => parseDMY(event.date) > now
        ).length
        const totalAttendees = events.reduce(
            (sum, event) => sum + (event.perticipant || 0),
            0
        )
        const todayEvents = events.filter((event) => {
            const eventDate = parseDMY(event.date)
            return eventDate.toDateString() === now.toDateString()
        }).length

        return {
            totalEvents,
            upcomingEvents,
            totalAttendees,
            todayEvents,
        }
    }

    const stats = calculateStats()

    const statsData = [
        {
            title: "Total Events",
            value: stats.totalEvents,
            icon: "📋",
            color: "indigo",
        },
        {
            title: "Upcoming Events",
            value: stats.upcomingEvents,
            icon: "📅",
            color: "green",
        },
        {
            title: "Total Attendees",
            value: stats.totalAttendees,
            icon: "👥",
            color: "blue",
        },
        {
            title: "Today's Events",
            value: stats.todayEvents,
            icon: "🎯",
            color: "orange",
        },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
                <StatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                />
            ))}
        </div>
    )
}
