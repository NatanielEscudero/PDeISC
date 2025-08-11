import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Form from './pages/Form';
import Detail from './pages/Detail';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = (task) => setTasks([...tasks, task]);

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const selectTask = (task) => setSelectedTask(task);

  const completeTask = (index) => {
    setTasks(tasks.map((t, i) =>
      i === index ? { ...t, completed: true } : t
    ));
  };

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                tasks={tasks}
                deleteTask={deleteTask}
                selectTask={selectTask}
                completeTask={completeTask}
              />
            }
          />
          <Route path="/form" element={<Form addTask={addTask} />} />
          <Route path="/detail" element={<Detail task={selectedTask} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;