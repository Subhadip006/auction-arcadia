import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeamScores();
  }, []);

  const fetchTeamScores = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/scores');
      const data = await response.json();
      setTeams(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching team scores:', err);
      setError('Failed to load team scores');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Team Scoreboard</h1>
      
      <button className="refresh-btn" onClick={fetchTeamScores}>
        Refresh Scores
      </button>
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <table className="score-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{team.name}</td>
                <td>{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;