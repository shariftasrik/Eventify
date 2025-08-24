import Banner from "../../components/Banner";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import NewsLetter from "../../components/NewsLetter";
import EventList from "../../components/student/eventlist/EventList";

const StudentDashboard = () => {
  return (
    <div>
      <Header />
      <Banner />
      <EventList />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default StudentDashboard;
