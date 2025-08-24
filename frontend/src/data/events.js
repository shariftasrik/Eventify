const events = [
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    title: "AI & Machine Learning Hackathon 2025",
    fee: 650,
    date: "30.08.2025",
    perticipant: 72,
    newest: true,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    title: "Blockchain for Beginners Bootcamp",
    fee: 400,
    date: "27.08.2025",
    perticipant: 38,
    newest: false,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    title: "Competitive Programming Challenge",
    fee: 300,
    date: "05.08.2025",
    perticipant: 64,
    newest: true,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    title: "UI/UX Design Sprint Workshop",
    fee: 550,
    date: "12.08.2025",
    perticipant: 47,
    newest: false,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    title: "Full-Stack Web Dev Expo",
    fee: 600,
    date: "01.09.2025",
    perticipant: 58,
    newest: true,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    title: "Data Science & Analytics Conference",
    fee: 750,
    date: "22.07.2025",
    perticipant: 81,
    newest: false,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    title: "Generative AI in Design Meetup",
    fee: 420,
    date: "30.08.2025",
    perticipant: 29,
    newest: true,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
    title: "Python Competitive Coding Marathon",
    fee: 280,
    date: "09.07.2025",
    perticipant: 54,
    newest: false,
    isRegistered: true
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    title: "AI for Startups Pitch Day",
    fee: 700,
    date: "14.09.2025",
    perticipant: 33,
    newest: true,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    title: "Cloud Computing Essentials Workshop",
    fee: 350,
    date: "24.08.2025",
    perticipant: 44,
    newest: false,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    title: "Next.js & React Dev Summit",
    fee: 620,
    date: "03.09.2025",
    perticipant: 61,
    newest: true,
    isRegistered: true
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop",
    title: "Kubernetes & DevOps Bootcamp",
    fee: 800,
    date: "19.07.2025",
    perticipant: 76,
    newest: false,
    isRegistered: false
  },
  
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    title: "Mobile App Hackathon for Social Good",
    fee: 260,
    date: "06.07.2025",
    perticipant: 57,
    newest: false,
    isRegistered: true
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&h=400&fit=crop",
    title: "Deep Learning Research Summit",
    fee: 780,
    date: "11.09.2025",
    perticipant: 88,
    newest: true,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
    title: "UI/UX Accessibility Design Jam",
    fee: 320,
    date: "17.08.2025",
    perticipant: 26,
    newest: false,
    isRegistered: true
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    title: "FinTech Blockchain Meetup",
    fee: 480,
    date: "21.09.2025",
    perticipant: 49,
    newest: true,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    title: "Cybersecurity & Ethical Hacking Workshop",
    fee: 730,
    date: "13.07.2025",
    perticipant: 91,
    newest: false,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    title: "AI-Powered Robotics Showcase",
    fee: 610,
    date: "26.08.2025",
    perticipant: 62,
    newest: true,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
    title: "IoT & Smart Devices Hackathon",
    fee: 420,
    date: "02.09.2025",
    perticipant: 41,
    newest: false,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
    title: "Big Data & Cloud Infrastructure Fair",
    fee: 790,
    date: "31.07.2025",
    perticipant: 73,
    newest: true,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    title: "AI Ethics & Responsible Innovation Forum",
    fee: 360,
    date: "08.08.2025",
    perticipant: 24,
    newest: false,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&h=400&fit=crop",
    title: "Blockchain Smart Contracts Workshop",
    fee: 690,
    date: "10.09.2025",
    perticipant: 66,
    newest: true,
    isRegistered: true
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=400&fit=crop",
    title: "Design Thinking for Developers",
    fee: 250,
    date: "20.07.2025",
    perticipant: 39,
    newest: false,
    isRegistered: false
  },
  {
    id: crypto.randomUUID(),
    photo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=400&fit=crop",
    title: "AI Hackathon: Building the Future",
    fee: 720,
    date: "07.09.2025",
    perticipant: 95,
    newest: true,
    isRegistered: false
  },
];

function getAllEvents() {
  return events;
}

export { getAllEvents };
