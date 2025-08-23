import { useState } from "react";
import getAllEvents from "../../../../utils/event_utils" 
import EventCard from "./EventCard";
import RegisteredEvents from "../RegisteredEvents";

export default function EventList() {
  const events = getAllEvents();

  const [registerData, setRegisterData] = useState([]);
  const [perticipateAmount, setPerticipateAmount] = useState(events);

  const incPerticipant = (id, n = 1) => {
    setPerticipateAmount((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, perticipant: p.perticipant + n } : p
      )
    );
  };

  const decPerticipant = (id, n = 1) => {
    setPerticipateAmount((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, perticipant: p.perticipant - n } : p
      )
    );
  };

  const handleAddCart = (event) => {
    const current = perticipateAmount.find((p) => p.id === event.id);
    if (!current || current.perticipant <= 0) return;

    decPerticipant(event.id, 1);

    setRegisterData((prev) => {
      const exists = prev.find((item) => item.id === event.id);
      if (exists) {
        return prev.map((item) =>
          item.id === event.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...event, quantity: 1 }];
      }
    });
  };

  const handleRemoveCart = (id) => {
    incPerticipant(id, 1);

    setRegisterData((prev) => {
      return prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  return (
    <section className="py-8">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="event-grid grid gap-6 sm:gap-7 grid-cols-1 sm:grid-cols-2">
              {perticipateAmount.slice(0, 3).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onAdd={handleAddCart}
                  onRemove={handleRemoveCart}
                  isAddCart={registerData.some((item) => item.id === event.id)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <RegisteredEvents events={registerData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
