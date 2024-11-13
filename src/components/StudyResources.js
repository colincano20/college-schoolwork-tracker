import React, { useState } from 'react';

function StudyResources() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]').filter(
    task => (task.type === 'quiz' || task.type === 'exam') && !task.completed // Exclude completed tasks
  );

  const [resources, setResources] = useState(
    JSON.parse(localStorage.getItem('resources') || '{}')
  );

  const addResource = (taskId) => {
    const resource = prompt('Enter resource:');
    const updatedResources = { ...resources, [taskId]: [...(resources[taskId] || []), resource] };
    setResources(updatedResources);
    localStorage.setItem('resources', JSON.stringify(updatedResources));
  };

  return (
    <div>
      <h2>Study Resources</h2>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index}>
            <h3>{task.title} - {task.type}</h3>
            <ul>
              {(resources[task.title] || []).map((res, idx) => <li key={idx}>{res}</li>)}
            </ul>
            <button onClick={() => addResource(task.title)}>Add Resource</button>
          </div>
        ))
      ) : (
        <p>No study resources available.</p>
      )}
    </div>
  );
}

export default StudyResources;
