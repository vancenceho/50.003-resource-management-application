import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AdminCalendarView.css';

const localizer = momentLocalizer(moment);

const AdminCalendarView = () => {
  const [events] = useState([
    {
      title: 'Workshop 1',
      start: new Date(2019, 1, 14), // 14 Feb 2019
      end: new Date(2019, 1, 14),
      type: 'Type A',
      status: 'Accepted',
    },
    {
      title: 'Workshop 2',
      start: new Date(2019, 1, 14),
      end: new Date(2019, 1, 14),
      type: 'Type B',
      status: 'Pending',
    },
    // Add more events as needed
  ]);

  return (
    <div className="admin-calendar-view">
      <h1>Workshop Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default AdminCalendarView;
