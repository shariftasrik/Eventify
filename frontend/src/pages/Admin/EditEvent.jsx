import React from "react";
import { useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Edit Event</h1>
      <p>Editing event with ID: {id}</p>
      <form>
        <input type="text" placeholder="Event Title" /><br />
        <textarea placeholder="Event Description"></textarea><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditEvent;
