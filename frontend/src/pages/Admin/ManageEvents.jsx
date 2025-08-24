import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventTable from "../../components/Admin/EventTable";
import { getAllEvents } from "../../data/events";

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get events from mock data
        const allEvents = getAllEvents();
        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to fetch events.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Here you would typically make an API call to delete the event
      console.log("Deleting event:", eventId);
      
      // Remove event from local state
      setEvents(prev => prev.filter(event => event.id !== eventId));
      
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/admin/edit-event/${eventId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Events</h1>

          </div>
          
          <button
            onClick={() => navigate("/admin/create-event")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create New Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            All Events ({events.length})
          </h2>
        </div>
        
        <EventTable
          events={events}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default ManageEvents;
