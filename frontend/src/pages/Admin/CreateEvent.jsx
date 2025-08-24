import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../../components/Admin/EventForm";

const CreateEvent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically make an API call to create the event
      console.log("Creating event:", formData);
      
      // Show success message and redirect
      alert("Event created successfully!");
      navigate("/admin/manage-events");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Creating event...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
        <p className="text-gray-600 mt-1">
          Fill out the form below to create a new event for your platform.
        </p>
      </div>
      
      <EventForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateEvent;
