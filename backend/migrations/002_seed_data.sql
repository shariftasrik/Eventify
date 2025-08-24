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

INSERT INTO faqs (question, answer, category, keywords, is_active)
VALUES
('How can I register for an event?', 
 'You can register for any active event through the event registration page on our platform. Make sure you are logged in.', 
 'Event Registration', 
 ARRAY['register','signup','event','participate'], 
 TRUE),

('Can I cancel my event registration?', 
 'Yes, you can cancel your registration before the event registration deadline from your profile.', 
 'Event Registration', 
 ARRAY['cancel','registration','withdraw','event'], 
 TRUE),

('How can I get my participation certificate?', 
 'After attending an event, you can download your participation certificate from your profile under "My Certificates".', 
 'Certificates', 
 ARRAY['certificate','download','participation','event'], 
 TRUE),

('How do I reset my password?', 
 'Click on "Forgot Password" on the login page and follow the instructions to reset your password.', 
 'Account', 
 ARRAY['reset','password','forgot','account'], 
 TRUE),

('How can I become a club member?', 
 'You can apply to join a club by visiting the club page and clicking on "Join Club". Approval depends on the club admin.', 
 'Clubs', 
 ARRAY['club','membership','join','apply'], 
 TRUE),

('Who can generate certificates for an event?', 
 'Only the club admin can generate certificates for event attendees after the event is completed.', 
 'Certificates', 
 ARRAY['generate','certificate','admin','event'], 
 TRUE),

('Is there any fee to attend events?', 
 'Some events may require a fee. Check the event details for information about fees and payment methods.', 
 'Event Details', 
 ARRAY['fee','cost','price','event'], 
 TRUE),

('How do I update my profile information?', 
 'Go to your profile page and click on "Edit Profile" to update your personal information.', 
 'Account', 
 ARRAY['update','profile','edit','account'], 
 TRUE),

('Can I attend multiple events at the same time?', 
 'No, you can only register for events that do not overlap in timing with your other registered events.', 
 'Event Registration', 
 ARRAY['multiple','events','time','overlap'], 
 TRUE),

('How do I contact the club for queries?', 
 'You can contact the club using the email or phone number provided on the club page.', 
 'Clubs', 
 ARRAY['contact','club','query','help'], 
 TRUE);

