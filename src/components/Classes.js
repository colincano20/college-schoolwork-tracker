import React, { useState } from 'react';

function Classes() {
  const [classes, setClasses] = useState(JSON.parse(localStorage.getItem('classes') || '[]'));
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks') || '[]'));
  const [newClass, setNewClass] = useState({ name: '', code: '' });

  const handleClassChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  const addClass = () => {
    const updatedClasses = [...classes, newClass];
    setClasses(updatedClasses);
    localStorage.setItem('classes', JSON.stringify(updatedClasses));
    setNewClass({ name: '', code: '' });
    alert('Class added successfully!');
  };

  const editClass = (index) => {
    const cls = classes[index];
    const updatedName = prompt("Edit Class Name", cls.name);
    const updatedCode = prompt("Edit Class Code", cls.code);
    if (updatedName && updatedCode) {
      const updatedClasses = [...classes];
      updatedClasses[index] = { name: updatedName, code: updatedCode };
      setClasses(updatedClasses);
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      window.location.reload();
    }
  };

  const deleteClass = (index) => {
    const updatedClasses = classes.filter((_, i) => i !== index);
    const updatedTasks = tasks.filter(task => task.classCode !== classes[index].code);
    setClasses(updatedClasses);
    setTasks(updatedTasks);
    localStorage.setItem('classes', JSON.stringify(updatedClasses));
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    window.location.reload();
  };

  return (
    <div className="classes-container">
      <h2>Classes</h2>
      <div>
        <input
          name="name"
          placeholder="Class Name"
          onChange={handleClassChange}
          value={newClass.name}
        />
        <input
          name="code"
          placeholder="Class Code"
          onChange={handleClassChange}
          value={newClass.code}
        />
        <button onClick={addClass}>Add Class</button>
      </div>
      
      <div>
        {classes.length > 0 ? (
          classes.map((cls, index) => (
            <div key={index} className="class-item">
              <h3>{cls.name} ({cls.code})</h3>
              <ul>
                {tasks
                  .filter(task => task.classCode === cls.code && !task.completed)
                  .map((task, idx) => (
                    <li key={idx}>
                      {task.title} - Due: {task.date} at {task.time}
                    </li>
                  ))}
              </ul>
              <button onClick={() => editClass(index)}>Edit Class</button>
              <button onClick={() => deleteClass(index)}>Delete Class</button>
            </div>
          ))
        ) : (
          <p>No classes added yet.</p>
        )}
      </div>
    </div>
  );
}

export default Classes;
