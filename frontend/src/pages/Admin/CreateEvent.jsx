import React from "react";
import { motion } from "framer-motion";
import { AdminSidebar, AdminHeader } from "./components";

const CreateEvent = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <AdminHeader
        title="Create Event"
        description="Add a new event to your platform. Fill in the details below to create an engaging event for your users."
      >
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Save Draft
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
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Event Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter event title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Event Fee
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Event Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your event..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Create Event
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateEvent;
