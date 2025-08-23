import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import EventList from "./components/eventlist/EventList";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer/Footer";

const StudentDashboard = () => {
  return (
    <div>
      <Header />
      <Banner />
      <main className="app-content">
        {/* <Outlet /> nested public routes thakbe */}
        <EventList />
      </main>
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default StudentDashboard;
