-- ===============================
-- Seed: Club Roles
-- ===============================
INSERT INTO clubs (name, description, club_type, contact_email, contact_phone) VALUES
('Tech Club', 'A club for tech enthusiasts', 'Technical', 'techclub@example.com', '+880123456789'),
('Music Club', 'Club for music lovers', 'Cultural', 'musicclub@example.com', '+880987654321'),
('Debate Club', 'Debating society', 'Academic', 'debate@example.com', '+880112233445');

-- Now insert roles (roles are per club, so include club_id)
INSERT INTO club_roles (id, club_id, name) VALUES
(1, 1, 'admin'),
(2, 3, 'president'),
(3, 3, 'vice_president'),
(4, 1, 'executive_member'),
(5, 2, 'general_member');

-- ===============================
-- Seed: Permissions
-- ===============================
INSERT INTO permissions (code, description) VALUES
('CREATE_EVENT', 'Create new events'),
('EDIT_EVENT', 'Edit existing events'),
('DELETE_EVENT', 'Delete events'),
('VIEW_ATTENDEES', 'View attendees of an event'),
('MANAGE_USERS', 'Add/edit/remove users'),
('VIEW_REPORTS', 'View analytics and reports'),
('JOIN_EVENT', 'Join an event');

-- ===============================
-- Seed: Role ↔ Permissions
-- ===============================
INSERT INTO role_permissions (club_role_id, permission_id) VALUES
-- Admin (id=1) has all permissions
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
-- President (id=2) can create/edit events, view attendees
(2, 1), (2, 2), (2, 4),
-- Vice President (id=3) can create/edit events
(3, 1), (3, 2),
-- Executive Member (id=4) can view attendees
(4, 4),
-- General Member (id=5) can only join events
(5, 7);

-- ===============================
-- Seed: Users
-- ===============================
INSERT INTO users (username, email, password_hash, first_name, last_name, student_id, department, year_of_study, role)
VALUES
('admin01', 'admin@example.com', crypt('password123', gen_salt('bf')), 'Alice', 'Admin', NULL, NULL, NULL, 'admin'),
('student01', 'student1@example.com', crypt('studentpass', gen_salt('bf')), 'Bob', 'Student', 'S12345', 'Computer Science', 2, 'student'),
('student02', 'student2@example.com', crypt('studentpass', gen_salt('bf')), 'Charlie', 'Student', 'S12346', 'Electrical Engineering', 3, 'student'),
('president01', 'president@example.com', crypt('presidentpass', gen_salt('bf')), 'David', 'President', 'S10001', 'Business', 4, 'club_member');

-- ===============================
-- Seed: Club Members
-- ===============================
INSERT INTO club_members (user_id, club_id, club_role_id) VALUES
(2, 1, 5), -- student01 in Tech Club as general member
(3, 2, 5), -- student02 in Music Club as general member
(4, 3, 2); -- president01 in Debate Club as president



-- ===============================
-- Seed: Events
-- ===============================
INSERT INTO events (title, description, event_date, start_time, end_time, location, club_id, created_by, status) VALUES
('Intro to AI Workshop', 'Learn AI basics', '2025-09-15', '10:00', '12:00', 'Room 101',  1, 1, 'published'),
('Annual Music Concert', 'Join us for music performances', '2025-09-20', '18:00', '21:00', 'Auditorium',  2, 1, 'published'),
('Debate Championship', 'Inter-university debate', '2025-10-05', '14:00', '17:00', 'Conference Hall',  3, 4, 'published');

-- ===============================
-- Seed: FAQs
-- ===============================
INSERT INTO faqs (question, answer, category, keywords) VALUES
('How do I register for an event?', 'Go to the event page and click "Register"', 'Registration', ARRAY['register', 'event', 'signup']),
('Can I cancel my registration?', 'Yes, click "Unregister" on your registered events page', 'Registration', ARRAY['cancel', 'unregister', 'event']),
('Who can create events?', 'Only club admins or presidents can create events', 'Event Management', ARRAY['create', 'event', 'admin']);
