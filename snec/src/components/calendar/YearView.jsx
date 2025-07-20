import React, { useState } from "react";
import { useIsDesktop } from '../../App';

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Generate a matrix representing the days of a month
function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const firstDayIndex = firstDay.getDay();
  const lastDay = new Date(year, month + 1, 0);
  const numberOfDays = lastDay.getDate();

  const matrix = [];
  let week = Array(firstDayIndex).fill(null);

  for (let day = 1; day <= numberOfDays; day++) {
    week.push(day);
    if (week.length === 7) {
      matrix.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    matrix.push(week);
  }

  return matrix;
}

export default function YearView({
  initialYear = new Date().getFullYear(),
  setViewDate,
  setCalendarView
}) {
  const [year, setYear] = useState(initialYear);
  const isDesktop = useIsDesktop(1024);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const isCurrentYear = year === currentYear;

  const handlePrevQuarter = () => {
    if (quarter === 0) {
      setQuarter(2);
      setYear(prev => prev - 1);
      setViewDate(prev => ({ ...prev, year: prev.year - 1 }));
    } else {
      setQuarter(prev => prev - 1);
    }
  };

  const handlePrevYear = () => {
    setYear(prev => prev - 1);
    setViewDate(prev => ({ ...prev, year: prev.year - 1 }));
  };

  const handleNextQuarter = () => {
    if (quarter === 2) {
      setQuarter(0);
      setYear(prev => prev + 1);
      setViewDate(prev => ({ ...prev, year: prev.year + 1 }));
    } else {
      setQuarter(prev => prev + 1);
    }
  };

  const handleNextYear = () => {
    setYear(prev => prev + 1);
    setViewDate(prev => ({ ...prev, year: prev.year + 1 }));
  };

  const handleMonthClick = (monthIndex) => {
    setViewDate(prev => ({ ...prev, year: year, month: monthIndex }));
    setCalendarView("month");
  };

  // --- MOBILE/TABLET: iOS-style Year View ---
  if (!isDesktop) {
    return (
      <div style={{ background: '#111', minHeight: '100vh', color: '#fff', paddingBottom: 32 }}>
        <div style={{ textAlign: 'center', fontSize: 32, fontWeight: 700, color: '#e53935', margin: '24px 0 8px 0' }}>{year}</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
        }}>
          {MONTHS.map((month, monthIdx) => {
            const monthMatrix = getMonthMatrix(year, monthIdx);
            return (
              <div
                key={month}
                style={{ padding: '8px 0', cursor: 'pointer' }}
                onClick={() => handleMonthClick(monthIdx)}
              >
                <div style={{
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: 18,
                  color: isCurrentYear && monthIdx === currentMonth ? '#e53935' : '#fff',
                  marginBottom: 2,
                  letterSpacing: 1,
                }}>{month.slice(0, 3)}</div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 13 }}>
                  {monthMatrix.map((week, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                      {week.map((day, j) => {
                        const isToday = isCurrentYear && monthIdx === currentMonth && day === today.getDate();
                        return (
                          <span
                            key={j}
                            style={{
                              width: 18,
                              height: 18,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '50%',
                              background: isToday ? '#e53935' : 'transparent',
                              color: isToday ? '#fff' : '#fff',
                              fontWeight: isToday ? 700 : 400,
                              fontSize: 13,
                            }}
                          >
                            {day ? day : ''}
                          </span>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // --- DESKTOP: Keep existing layout ---
  const [quarter, setQuarter] = useState(0); // 0: Jan-Apr, 1: May-Aug, 2: Sep-Dec

  const monthsToShow = [quarter * 4, quarter * 4 + 1, quarter * 4 + 2, quarter * 4 + 3];

  return (
    <div className="yearview-container">
      <div
        className="yearview-topbar"
        style={window.innerWidth <= 900 ? {
          height:60,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'var(--color-bg)', // match app background color
          borderRadius: 8,
          marginTop: 0,
        } : {}}
      >
        <button className="calendar-nav-btn" onClick={handlePrevQuarter}>{"<"}</button>
        <span className="calendar-month-label">{year}</span>
        <button className="calendar-nav-btn" onClick={handleNextQuarter}>{">"}</button>
      </div>

      <div className="yearview-grid">
        {monthsToShow.map((monthIdx) => (
          <div
            className="yearview-month-block"
            key={monthIdx}
            onClick={() => handleMonthClick(monthIdx)}
          >
            <div className="yearview-month-title">{MONTHS[monthIdx]}</div>
            <div className="yearview-month-calendar">
              <div className="yearview-weekdays">
                {WEEKDAYS.map((day) => (
                  <span key={day} className="yearview-weekday">{day}</span>
                ))}
              </div>
              <div className="yearview-days">
                {getMonthMatrix(year, monthIdx).map((week, i) => (
                  <div className="yearview-week" key={i}>
                    {week.map((day, j) => (
                      <span
                        key={j}
                        className={`yearview-day ${day === null ? "yearview-day-empty" : ""}`}
                      >
                        {day !== null ? day : ""}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
