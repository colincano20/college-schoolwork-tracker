import React, { useState, useEffect } from 'react';

function AddTask() {
  const [task, setTask] = useState({ title: '', type: '', date: '', time: '', classCode: '' });
  const [classes, setClasses] = useState(JSON.parse(localStorage.getItem('classes') || '[]'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const newTask = { ...task, completed: false, id: Date.now() }; // Add unique ID with Date.now()
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTask({ title: '', type: '', date: '', time: '', classCode: '' });
    alert('Task added successfully!');
  };

  return (
    <div>
      <h2>Add New Task</h2>
      <input name="title" placeholder="Task Title" onChange={handleChange} value={task.title} />
      <select name="type" onChange={handleChange} value={task.type}>
        <option value="">Select Type</option>
        <option value="assignment">Assignment</option>
        <option value="quiz">Quiz</option>
        <option value="exam">Exam</option>
      </select>
      <input type="date" name="date" onChange={handleChange} value={task.date} />
      <input type="time" name="time" onChange={handleChange} value={task.time} />
      
      <select name="classCode" onChange={handleChange} value={task.classCode}>
        <option value="">Select Class</option>
        {classes.map((cls, index) => (
          <option key={index} value={cls.code}>
            {cls.name}
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Add Task</button>
    </div>
  );
}

export default AddTask;
