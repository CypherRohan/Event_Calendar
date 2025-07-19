import React from "react";
import { getEventsForDate } from "../../utils/eventUtils";

export default function EventDetails({ dateStr, getEventColor, events = [] }) {
  const dayEvents = getEventsForDate(dateStr, events);
  if (!dayEvents.length) return <p style={{ textAlign: "center", opacity: 0.7 }}>No events for this date.</p>;

  return (
    <div
      id="event-list"
      style={{
        padding: window.innerWidth <= 1024 ? '16px 12px' : 16,
        boxSizing: 'border-box',
      }}
    >
      {dayEvents.map(ev => (
        <div
          key={ev.title}
          className="event-item"
          style={{ borderLeftColor: getEventColor(ev.type) }}
        >
          <div className="event-title"
            style={{ borderLeftColor: getEventColor(ev.type), color: '#111' }}
          >
            {ev.title}
            <span className={`event-dot ${ev.type}`} style={{ marginLeft: 5 }} />
          </div>
          <div className="event-time">{ev.time || "Time not specified"}</div>
          <div className="event-desc">
            {ev.club && <>By <strong>{ev.club}</strong><br /></>}
            {ev.results && <><strong>Results:</strong> {ev.results}<br /></>}
            {ev.desc || "No description provided."}
          </div>
        </div>
      ))}
    </div>
  );
}
