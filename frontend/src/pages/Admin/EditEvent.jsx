import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../../components/Admin/EventForm";
import { getAllEvents } from "../../data/events";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get event from mock data
        const allEvents = getAllEvents();
        const foundEvent = allEvents.find(e => e.id === id);
        
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          alert("Event not found!");
          navigate("/admin/manage-events");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        alert("Failed to fetch event details.");
        navigate("/admin/manage-events");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to update the event
      console.log("Updating event:", { id, ...formData });
      
      // Show success message and redirect
      alert("Event updated successfully!");
      navigate("/admin/manage-events");
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Updating event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Event not found</h3>
        <p className="text-gray-500 mt-1">The event you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate("/admin/manage-events")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Event</h1>
        <p className="text-gray-600 mt-1">
          Update the event information below.
        </p>
      </div>
      
      <EventForm 
        event={event} 
        onSubmit={handleSubmit} 
        isEditing={true} 
      />
    </div>
  );
};

export default EditEvent;
