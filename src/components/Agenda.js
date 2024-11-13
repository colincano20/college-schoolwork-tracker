import React from 'react';

function Agenda() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  // Get today's date and one week from today, formatted as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  const oneWeekFromToday = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Filter tasks to include those due today or within the next 7 days
  const weeklyTasks = tasks.filter(task => {
    const taskDate = new Date(task.date).toISOString().split('T')[0];

    // Include tasks due today or within the next 7 days
    return (
      !task.completed &&
      taskDate >= today &&
      taskDate <= oneWeekFromToday
    );
  });

  const markAsCompleted = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: true } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    window.location.reload();
  };

  const editTask = (id) => {
    const task = tasks.find(task => task.id === id);
    const updatedTitle = prompt("Edit Task Title", task.title);
    const updatedDate = prompt("Edit Task Date (YYYY-MM-DD)", task.date);
    const updatedTime = prompt("Edit Task Time (HH:MM)", task.time);
    if (updatedTitle && updatedDate && updatedTime) {
      const updatedTasks = tasks.map(task =>
        task.id === id ? { ...task, title: updatedTitle, date: updatedDate, time: updatedTime } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      window.location.reload();
    }
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    window.location.reload();
  };

  return (
    <div>
      <h2>This Week's Agenda</h2>
      {weeklyTasks.length > 0 ? (
        weeklyTasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3 className="task-title">{task.title} - {task.type}</h3>
            <p className="task-due-date">Due: {task.date} at {task.time}</p>
            <div className="task-buttons">
              <button onClick={() => markAsCompleted(task.id)}>Mark as Completed</button>
              <button onClick={() => editTask(task.id)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks due this week.</p>
      )}
    </div>
  );
}

export default Agenda;
