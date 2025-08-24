import React, { useState, useEffect } from "react";
import AnalyticsChart from "../../components/Admin/AnalyticsChart";
import { getAllEvents } from "../../data/events";

const Analytics = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Get events from mock data
        const allEvents = getAllEvents();
        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate analytics data
  const totalEvents = events.length;
  const totalParticipants = events.reduce((sum, event) => sum + (event.perticipant || 0), 0);
  const totalRevenue = events.reduce((sum, event) => sum + (event.fee || 0) * (event.perticipant || 0), 0);
  const newEvents = events.filter(event => event.newest).length;
  const averageFee = totalEvents > 0 ? (totalRevenue / totalParticipants).toFixed(2) : 0;

  // Category distribution
  const categoryData = events.reduce((acc, event) => {
    const category = event.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData).map(([category, count]) => ({
    label: category,
    value: count,
  }));

  // Monthly event distribution (mock data for demonstration)
  const monthlyData = [
    { label: "Jan", value: 3 },
    { label: "Feb", value: 5 },
    { label: "Mar", value: 4 },
    { label: "Apr", value: 6 },
    { label: "May", value: 8 },
    { label: "Jun", value: 7 },
    { label: "Jul", value: 9 },
    { label: "Aug", value: 12 },
    { label: "Sep", value: 10 },
    { label: "Oct", value: 8 },
    { label: "Nov", value: 6 },
    { label: "Dec", value: 4 },
  ];

  // Top performing events
  const topEvents = [...events]
    .sort((a, b) => (b.perticipant || 0) - (a.perticipant || 0))
    .slice(0, 5)
    .map(event => ({
      label: event.title.substring(0, 20) + "...",
      value: event.perticipant || 0,
    }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Comprehensive insights into your events and platform performance.
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Period:</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Time</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">{totalEvents}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Participants</p>
              <p className="text-2xl font-bold text-gray-900">{totalParticipants.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New Events</p>
              <p className="text-2xl font-bold text-gray-900">{newEvents}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Events Trend */}
        <AnalyticsChart
          title="Monthly Events Trend"
          data={monthlyData}
          type="line"
        />

        {/* Event Categories */}
        <AnalyticsChart
          title="Events by Category"
          data={categoryChartData}
          type="pie"
        />

        {/* Top Performing Events */}
        <AnalyticsChart
          title="Top Performing Events"
          data={topEvents}
          type="bar"
        />

        {/* Additional Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Event Fee</span>
              <span className="font-semibold text-gray-900">${averageFee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Participants per Event</span>
              <span className="font-semibold text-gray-900">
                {totalEvents > 0 ? Math.round(totalParticipants / totalEvents) : 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Events with Full Capacity</span>
              <span className="font-semibold text-gray-900">
                {events.filter(e => e.perticipant >= 80).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Most Popular Category</span>
              <span className="font-semibold text-gray-900">
                {Object.entries(categoryData).sort(([,a], [,b]) => b - a)[0]?.[0] || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
