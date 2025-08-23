import React from "react";
import { Outlet } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div>
      <h1>Student Dashboard</h1>
      <Outlet />
    </div>
  );
};

export default StudentDashboard;
