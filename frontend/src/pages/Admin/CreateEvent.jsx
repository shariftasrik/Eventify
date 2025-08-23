import React from "react";

const CreateEvent = () => {
  return (
    <div>
      <h1>Create Event</h1>
      <form>
        <input type="text" placeholder="Event Title" /><br />
        <textarea placeholder="Event Description"></textarea><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateEvent;
