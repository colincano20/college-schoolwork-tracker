import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Agenda from './components/Agenda';
import AddTask from './components/AddTask';
import CalendarView from './components/CalendarView';
import StudyResources from './components/StudyResources';
import Classes from './components/Classes';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>College Schoolwork Tracker</h1>
          <nav>
            <Link to="/">This Week's Agenda</Link>
            <Link to="/add-task">Add Task</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/study-resources">Study Resources</Link>
            <Link to="/classes">Classes</Link> {/* New Classes Tab */}
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Agenda />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/study-resources" element={<StudyResources />} />
          <Route path="/classes" element={<Classes />} /> {/* Route for Classes Tab */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
