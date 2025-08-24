import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import CreateEvent from "./CreateEvent";
import EditEvent from "./EditEvent";
import ManageEvents from "./ManageEvents";
import Analytics from "./Analytics";
import LoadingSpinner from "../../components/Admin/LoadingSpinner";

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();

  // Simulate loading for navigation
  const handleNavigation = (section) => {
    setIsLoading(true);
    setCurrentSection(section);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/admin/${section}`);
    }, 500);
  };

  // Set initial section based on current route
  useEffect(() => {
    const path = location.pathname.split("/").pop();
    if (path && path !== "admin") {
      setCurrentSection(path);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar Navigation */}
      <div className="fixed top-0 left-0">
        <AdminSidebar 
          currentSection={currentSection}
          onNavigation={handleNavigation}
        />

      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {/* <header className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Eventify Admin Panel
          </h1>
          <p className="text-gray-600 mt-1">
            Manage events, analytics, and system settings
          </p>
        </header> */}

        {/* Content */}
        <main className="flex-1 p-6">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Routes>
              <Route path="/" element={<DashboardOverview />} />
              <Route path="create-event" element={<CreateEvent />} />
              <Route path="edit-event/:id" element={<EditEvent />} />
              <Route path="manage-events" element={<ManageEvents />} />
              <Route path="analytics" element={<Analytics />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
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
              <p className="text-2xl font-bold text-gray-900">1,247</p>
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
              <p className="text-2xl font-bold text-gray-900">$12,450</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Events</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-600">New event "AI Hackathon 2025" created</span>
            <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm text-gray-600">Event "Blockchain Workshop" updated</span>
            <span className="text-xs text-gray-400 ml-auto">5 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="text-sm text-gray-600">New registration for "Data Science Conference"</span>
            <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
