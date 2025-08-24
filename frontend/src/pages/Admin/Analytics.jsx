import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getAllEvents } from "../../data/events.js";
import { AdminSidebar, AdminHeader, StatsCard } from "./components";

const Analytics = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEvents(getAllEvents());
      setLoading(false);
    }, 500);
  }, []);

  const calculateAnalytics = () => {
    const now = new Date();
    const parseDMY = (dmy) => {
      if (!dmy) return new Date(0);
      const [d, m, y] = String(dmy).split(".").map(Number);
      return new Date(y || 0, (m || 1) - 1, d || 1);
    };

    const totalEvents = events.length;
    const upcomingEvents = events.filter(
      (event) => parseDMY(event.date) > now
    ).length;
    const pastEvents = events.filter(
      (event) => parseDMY(event.date) < now
    ).length;
    const totalAttendees = events.reduce(
      (sum, event) => sum + (event.perticipant || 0),
      0
    );
    const totalRevenue = events.reduce(
      (sum, event) => sum + (event.fee || 0) * (event.perticipant || 0),
      0
    );
    const averageAttendees =
      totalEvents > 0 ? Math.round(totalAttendees / totalEvents) : 0;
    const averageFee =
      totalEvents > 0
        ? Math.round(
            events.reduce((sum, event) => sum + (event.fee || 0), 0) /
              totalEvents
          )
        : 0;

    return {
      totalEvents,
      upcomingEvents,
      pastEvents,
      totalAttendees,
      totalRevenue,
      averageAttendees,
      averageFee,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const analytics = calculateAnalytics();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <AdminHeader
        title="Analytics"
        description="Track your platform's performance with detailed insights and metrics."
      />

      {/* Main Content */}
      <section className="py-6">
        <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <AdminSidebar />

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Key Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatsCard
                  title="Total Events"
                  value={analytics.totalEvents}
                  icon="📋"
                  color="indigo"
                />
                <StatsCard
                  title="Upcoming Events"
                  value={analytics.upcomingEvents}
                  icon="📅"
                  color="green"
                />
                <StatsCard
                  title="Past Events"
                  value={analytics.pastEvents}
                  icon="📚"
                  color="blue"
                />
                <StatsCard
                  title="Total Attendees"
                  value={analytics.totalAttendees}
                  icon="👥"
                  color="purple"
                />
                <StatsCard
                  title="Total Revenue"
                  value={`$${analytics.totalRevenue.toLocaleString()}`}
                  icon="💰"
                  color="green"
                />
                <StatsCard
                  title="Avg. Attendees"
                  value={analytics.averageAttendees}
                  icon="📊"
                  color="orange"
                />
              </div>
            </motion.div>

            {/* Charts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Event Distribution
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Event Status Chart */}
                <div>
                  <h3 className="text-lg font-medium text-slate-700 mb-4">
                    Event Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Upcoming</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (analytics.upcomingEvents /
                                  analytics.totalEvents) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {analytics.upcomingEvents}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Past</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                (analytics.pastEvents / analytics.totalEvents) *
                                100
                              }%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-900">
                          {analytics.pastEvents}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Revenue Chart */}
                <div>
                  <h3 className="text-lg font-medium text-slate-700 mb-4">
                    Revenue Overview
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        Total Revenue
                      </span>
                      <span className="text-lg font-bold text-green-600">
                        ${analytics.totalRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        Average Fee
                      </span>
                      <span className="text-sm font-medium text-slate-900">
                        ${analytics.averageFee}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">
                        Total Attendees
                      </span>
                      <span className="text-sm font-medium text-slate-900">
                        {analytics.totalAttendees}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
