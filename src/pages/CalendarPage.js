import { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US")
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

function CalendarPage() {
  const [events, setEvents] = useState([
    {
      title: "Team Meeting",
      start: new Date(),
      end: new Date(new Date().getTime() + 60 * 60 * 1000)
    },
    {
      title: "Project Deadline",
      start: new Date(2026, 0, 25, 10, 0),
      end: new Date(2026, 0, 25, 12, 0)
    }
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Enter Event Title:");
    if (title) {
      setEvents([...events, { title, start, end }]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Event Calendar</h2>

      <div className="card shadow">
        <div className="card-body">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            selectable
            onSelectSlot={handleSelectSlot}
          />
        </div>
      </div>

      <p className="text-muted mt-3 text-center">
        ✅ Click and drag on calendar to add a new event
      </p>
    </div>
  );
}

export default CalendarPage;
