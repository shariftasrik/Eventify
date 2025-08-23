import getImgUrl from "../../../utils/event_utils";

export default function RegisteredEvents({ events }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">My Events</h2>

      {events.length === 0 && (
        <p className="text-2xl text-red-500">Register an event</p>
      )}

      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-start space-x-4 pb-4 border-b border-gray-200 mb-4"
        >
          <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
            <img
              src={getImgUrl(`${event.photo}`)}
              alt="Gradient Graphic T-shirt"
              className="h-full w-auto object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-center mt-2">
              <p className="font-bold">{event.fee}</p>
              <p className="text-green-500">{event.date}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
