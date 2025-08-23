-- =====================================
-- Enable required extensions
-- =====================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================
-- Create custom types
-- =====================================
CREATE TYPE user_role AS ENUM ('student', 'admin');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'cancelled', 'completed');
CREATE TYPE attendance_status AS ENUM ('registered', 'attended', 'no_show', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'waived', 'refunded');
CREATE TYPE notification_type AS ENUM ('event_reminder', 'registration_confirmation', 'event_update', 'event_cancellation', 'general');
CREATE TYPE entity_type AS ENUM ('event', 'user', 'club', 'registration');

-- =====================================
-- 1. USERS TABLE
-- =====================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    student_id VARCHAR(20),
    phone VARCHAR(15),
    department VARCHAR(100),
    year_of_study INTEGER,
    profile_image VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_uuid ON users(uuid);

-- =====================================
-- 2. CLUBS TABLE
-- =====================================
CREATE TABLE clubs (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    club_type VARCHAR(50),
    logo_url VARCHAR(255),
    contact_email VARCHAR(100),
    contact_phone VARCHAR(15),
    website_url VARCHAR(255),
    social_links JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_clubs_name ON clubs(name);
CREATE INDEX idx_clubs_active ON clubs(is_active);
CREATE INDEX idx_clubs_uuid ON clubs(uuid);

-- =====================================
-- 3. CLUB_ADMINS TABLE
-- =====================================
CREATE TABLE club_admins (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    club_id INTEGER NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT unique_user_club UNIQUE (user_id, club_id)
);

CREATE INDEX idx_club_admins_user ON club_admins(user_id);
CREATE INDEX idx_club_admins_club ON club_admins(club_id);

-- =====================================
-- 4. EVENT CATEGORIES TABLE
-- =====================================
CREATE TABLE event_categories (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    color_code VARCHAR(7) DEFAULT '#007bff',
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_event_categories_name ON event_categories(name);
CREATE INDEX idx_event_categories_active ON event_categories(is_active);

-- =====================================
-- 5. EVENTS TABLE
-- =====================================
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    location VARCHAR(200) NOT NULL,
    venue_details TEXT,
    max_participants INTEGER DEFAULT 0,
    current_participants INTEGER DEFAULT 0,
    registration_deadline TIMESTAMP,
    event_image VARCHAR(255),
    category_id INTEGER REFERENCES event_categories(id) ON DELETE SET NULL,
    club_id INTEGER NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
    created_by INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status event_status DEFAULT 'published',
    is_featured BOOLEAN DEFAULT FALSE,
    registration_required BOOLEAN DEFAULT TRUE,
    event_fee DECIMAL(10, 2) DEFAULT 0.00,
    tags TEXT[],
    external_link VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_club ON events(club_id);
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_events_created_by ON events(created_by);
CREATE INDEX idx_events_featured ON events(is_featured);
CREATE INDEX idx_events_deadline ON events(registration_deadline);
CREATE INDEX idx_events_date_status ON events(event_date, status);
CREATE INDEX idx_events_club_date ON events(club_id, event_date);
CREATE INDEX idx_events_uuid ON events(uuid);
CREATE INDEX idx_events_tags ON events USING GIN(tags);

-- =====================================
-- 6. EVENT REGISTRATIONS TABLE
-- =====================================
CREATE TABLE event_registrations (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attendance_status attendance_status DEFAULT 'registered',
    special_requirements TEXT,
    emergency_contact VARCHAR(100),
    payment_status payment_status DEFAULT 'pending',
    certificate_generated BOOLEAN DEFAULT FALSE,
    certificate_download_count INTEGER DEFAULT 0,
    notes TEXT,
    metadata JSONB,
    CONSTRAINT unique_event_user UNIQUE (event_id, user_id)
);

CREATE INDEX idx_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_registrations_user ON event_registrations(user_id);
CREATE INDEX idx_registrations_attendance ON event_registrations(attendance_status);
CREATE INDEX idx_registrations_date ON event_registrations(registration_date);
CREATE INDEX idx_registrations_user_event ON event_registrations(user_id, event_id);
CREATE INDEX idx_registrations_uuid ON event_registrations(uuid);

-- =====================================
-- 7. NOTIFICATIONS TABLE
-- =====================================
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type notification_type NOT NULL,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP,
    metadata JSONB
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_notifications_read ON notifications(is_read);
CREATE INDEX idx_notifications_sent_at ON notifications(sent_at);
CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read);

-- =====================================
-- 8. CERTIFICATES TABLE
-- =====================================
CREATE TABLE certificates (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    registration_id INTEGER NOT NULL REFERENCES event_registrations(id) ON DELETE CASCADE,
    certificate_id VARCHAR(50) UNIQUE NOT NULL,
    participant_name VARCHAR(100) NOT NULL,
    event_title VARCHAR(200) NOT NULL,
    event_date DATE NOT NULL,
    club_name VARCHAR(100) NOT NULL,
    template_used VARCHAR(100),
    file_path VARCHAR(255),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    downloaded_at TIMESTAMP,
    download_count INTEGER DEFAULT 0,
    metadata JSONB
);

CREATE INDEX idx_certificates_registration ON certificates(registration_id);
CREATE INDEX idx_certificates_certificate_id ON certificates(certificate_id);
CREATE INDEX idx_certificates_generated_at ON certificates(generated_at);

-- =====================================
-- 9. ACTIVITY LOGS TABLE
-- =====================================
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type entity_type NOT NULL,
    entity_id INTEGER NOT NULL,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_action ON activity_logs(action);
CREATE INDEX idx_activity_logs_entity ON activity_logs(entity_type, entity_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- =====================================
-- 10. FAQ TABLE
-- =====================================
CREATE TABLE faqs (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(50),
    keywords TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_active ON faqs(is_active);
CREATE INDEX idx_faqs_keywords ON faqs USING GIN(keywords);
CREATE INDEX idx_faqs_search ON faqs USING GIN(to_tsvector('english', question || ' ' || answer));
