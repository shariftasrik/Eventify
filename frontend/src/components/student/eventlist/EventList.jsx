import { useState } from "react";
import { getAllEvents } from "../../../data/events.js";
import EventCard from "./EventCard";
import RegisteredEvents from "./RegisteredEvents";
import EventDetailsModal from "./EventDetailsModal";

export default function EventList() {
  const [events, setEvents] = useState(getAllEvents());
  const [registered, setRegistered] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // open/close modal
  const handleOpenModal = (event) => setSelectedEvent(event);
  const handleCloseModal = () => setSelectedEvent(null);

  // submit registration from modal
  const handleSubmitRegistration = (event, formData) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === event.id
          ? {
              ...e,
              perticipant: Math.max(0, e.perticipant - 1), 
              isRegistered: true,
            }
          : e
      )
    );


    setRegistered((prev) => {
      const exists = prev.find((item) => item.id === event.id);
      if (exists) return prev; 
      return [...prev, { ...event, formData, isRegistered: true }];
    });

    handleCloseModal();
  };


  const handleRemoveRegistration = (id) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              perticipant: e.perticipant + 1, 
              isRegistered: false,
            }
          : e
      )
    );

    setRegistered((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
          <div className="lg:col-span-2">
            <div className="event-grid grid gap-6 sm:gap-7 grid-cols-1 sm:grid-cols-2">
              {events.slice(0, 6).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onOpenModal={handleOpenModal}
                  onRemove={handleRemoveRegistration}
                  isAddEvent={event.isRegistered} 
                />
              ))}
            </div>
          </div>

          {/* Registered events sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow">
            <RegisteredEvents events={registered} />
          </div>
        </div>
        </div>
      </div>

      {/* Registration modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={handleCloseModal}
          onSubmit={handleSubmitRegistration}
        />
      )}
    </section>
  );
}
