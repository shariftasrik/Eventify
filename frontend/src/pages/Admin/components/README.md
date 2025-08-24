# Admin Components

This directory contains all the reusable components for the admin dashboard.

## Components Overview

### Core Components

#### `AdminSidebar.jsx`

-   **Purpose**: Sticky left navigation sidebar for admin pages
-   **Features**:
    -   Navigation links (Dashboard, Create Event, Manage Events, Analytics)
    -   Active state highlighting
    -   Logout functionality
    -   Sticky positioning like FilterSidebar
-   **Props**: None (uses React Router hooks internally)

#### `AdminHeader.jsx`

-   **Purpose**: Page header component with title, description, and optional actions
-   **Features**:
    -   Animated entrance
    -   Gradient background
    -   Flexible children slot for action buttons
-   **Props**:
    -   `title`: Page title
    -   `description`: Page description (optional)
    -   `children`: Action buttons or other elements (optional)

#### `StatsCard.jsx`

-   **Purpose**: Individual statistics card with icon and value
-   **Features**:
    -   Color-coded themes
    -   Optional change percentage
    -   Responsive design
-   **Props**:
    -   `title`: Stat title
    -   `value`: Stat value
    -   `icon`: Emoji or icon
    -   `color`: Theme color (indigo, green, blue, purple, orange)
    -   `change`: Percentage change (optional)

### Event Management Components

#### `AdminEventCard.jsx`

-   **Purpose**: Card display for events in admin view
-   **Features**:
    -   Event image, title, date, fee, participants
    -   Status badges (Today, Upcoming, Past)
    -   New event indicator
    -   Edit/Delete action buttons
-   **Props**:
    -   `event`: Event object
    -   `onEdit`: Edit event handler
    -   `onDelete`: Delete event handler

#### `AdminEventList.jsx`

-   **Purpose**: Paginated list of events with grid layout
-   **Features**:
    -   Responsive grid layout
    -   Pagination integration
    -   Loading states
    -   Empty state handling
-   **Props**:
    -   `events`: Array of events
    -   `onEdit`: Edit event handler
    -   `onDelete`: Delete event handler

### Analytics Components

#### `AdminStats.jsx`

-   **Purpose**: Statistics overview section
-   **Features**:
    -   Calculates key metrics from events data
    -   Displays total events, upcoming events, total attendees, today's events
    -   Uses StatsCard components
-   **Props**:
    -   `events`: Array of events to calculate stats from

## Usage Examples

### Basic Admin Page Structure

```jsx
import { AdminSidebar, AdminHeader } from "./components"

const AdminPage = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            <AdminHeader title="Page Title" description="Page description" />

            <section className="py-6">
                <div className="container mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <AdminSidebar />
                    <div className="lg:col-span-3">{/* Main content */}</div>
                </div>
            </section>
        </div>
    )
}
```

### Using Stats Cards

```jsx
import { StatsCard } from "./components"

;<StatsCard
    title="Total Events"
    value={42}
    icon="📋"
    color="indigo"
    change={12}
/>
```

### Event List with Actions

```jsx
import { AdminEventList } from "./components"

;<AdminEventList
    events={events}
    onEdit={(event) => handleEdit(event)}
    onDelete={(eventId) => handleDelete(eventId)}
/>
```

## Styling

All components use Tailwind CSS classes and follow the same design system as the rest of the application:

-   Color scheme: Indigo primary, with semantic colors for different states
-   Spacing: Consistent 6-unit spacing system
-   Shadows: Subtle shadows for depth
-   Border radius: Rounded corners (xl for cards, lg for buttons)
-   Transitions: Smooth hover and focus states

## Responsiveness

Components are designed to be responsive:

-   Mobile-first approach
-   Grid layouts that adapt to screen size
-   Sidebar collapses on smaller screens
-   Cards stack vertically on mobile

## Accessibility

Components include:

-   Proper ARIA labels
-   Keyboard navigation support
-   Screen reader friendly structure
-   High contrast color schemes
-   Focus indicators
