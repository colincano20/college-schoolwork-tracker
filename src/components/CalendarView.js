import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

function CalendarView() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  return (
    <div>
      <h2>Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={tasks.map(task => ({
          title: task.title,
          date: task.date,
          backgroundColor: task.completed ? 'lightgray' : '#3f51b5', // Completed tasks in gray
          borderColor: task.completed ? 'gray' : '#3f51b5',
          textColor: task.completed ? 'darkgray' : 'white'
        }))}
      />
    </div>
  );
}

export default CalendarView;
