import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ScoreboardPage from './pages/scoreboard';
import StatsPage from './pages/stats';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/scoreboard" />}/>
        <Route path="/scoreboard" element={<ScoreboardPage />} />
        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

