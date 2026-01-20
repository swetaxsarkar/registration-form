import { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";


import { calendarEvents } from "../data/calendarEvents";

const locales = {
  "en-US": enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

function CalendarPage() {
  const events = useMemo(() => {
    return calendarEvents.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    }));
  }, []);

  return (
    <div className="container-fluid mt-3 px-3">
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView="month"
            views={["month"]}                 // ✅ remove extra buttons
            toolbar={true}                    // ✅ keep top toolbar (Jan 2026 + Today + arrows)
            popup={false}                     // ✅ avoid popup extra UI
            style={{ height: "88vh" }}         // ✅ full big calendar like screenshot
            defaultDate={new Date("2026-01-01")} // ✅ open January 2026
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: event.color,
                borderRadius: "2px",
                color: "#111",
                border: "none",
                paddingLeft: "6px",
                fontSize: "12px",
                fontWeight: "500"
              }
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
