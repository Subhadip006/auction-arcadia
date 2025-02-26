import React, { useState, useEffect } from 'react';

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

  // Get top 5 teams
  const topFiveTeams = teams.slice(0, 5);

  // Trophy icons based on position
  const getTrophyIcon = (position) => {
    if (position === 0) {
      return (
        <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 00-2 0v1H4a2 2 0 110-4h1.17A3 3 0 015 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
          <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Team Scoreboard</h1>
          <p className=" text-xl font-mono text-gray-300">See who's leading the competition</p>
        </div>
        
        <button 
          className="mb-10 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 mx-auto block shadow-lg"
          onClick={fetchTeamScores}
        >
          Refresh Scores
        </button>
        
        {loading ? (
          <div className="text-center my-16">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-300">Loading scoreboard...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-400 my-12 p-6 bg-gray-800 rounded-lg shadow-lg">
            <p className="text-xl">{error}</p>
            <p className="mt-2 text-gray-400">Please try again later</p>
          </div>
        ) : (
          <div>
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-center mb-8 pb-2 border-b border-gray-700">Top 5 Teams</h2>
              
              <div className="space-y-4">
                {topFiveTeams.map((team, index) => {
                  let cardBg, scoreBg, rankStyle;
                  
                  // Set gradient styles based on ranking
                  if (index === 0) {
                    // Gold - 1st place
                    cardBg = "bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400";
                    scoreBg = "bg-yellow-900 bg-opacity-30";
                    rankStyle = "bg-yellow-400 text-yellow-900 ring-2 ring-yellow-300 shadow-md";
                  } else if (index === 1) {
                    // Silver - 2nd place
                    cardBg = "bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300";
                    scoreBg = "bg-gray-700 bg-opacity-30";
                    rankStyle = "bg-gray-300 text-gray-800 ring-2 ring-gray-200 shadow-md";
                  } else if (index === 2) {
                    // Bronze - 3rd place
                    cardBg = "bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500";
                    scoreBg = "bg-orange-900 bg-opacity-30";
                    rankStyle = "bg-orange-400 text-orange-900 ring-2 ring-orange-300 shadow-md";
                  } else {
                    // Other positions
                    cardBg = "bg-gradient-to-r from-gray-800 to-gray-700";
                    scoreBg = "bg-gray-900 bg-opacity-50";
                    rankStyle = "bg-gray-600 text-gray-200 ring-2 ring-gray-500";
                  }
                  
                  return (
                    <div 
                      key={index} 
                      className={`${cardBg} rounded-xl p-5 shadow-lg transform transition-all duration-300 hover:scale-102 hover:shadow-xl`}
                    >
                      <div className="flex items-center">
                        <div className={`${rankStyle} w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg mr-4`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <div className="flex items-center">
                            {getTrophyIcon(index)}
                            <div className="ml-2">
                              <div className="font-bold text-xl">{team.name}</div>
                              <div className="text-sm opacity-80">Team ID #{index + 1}</div>
                            </div>
                          </div>
                          <div className={`${scoreBg} py-2 px-4 rounded-lg font-bold text-xl`}>
                            {team.score} <span className="text-sm opacity-75">points</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">All Teams</h3>
            <div className="overflow-hidden shadow-lg rounded-xl bg-gradient-to-r from-gray-800 to-gray-700">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-900 bg-opacity-40">
                    <th className="py-4 px-6 text-left font-semibold text-gray-300">Team Name</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-300">Score</th>
                    <th className="py-4 px-6 text-left font-semibold text-gray-300">Budget</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {teams.map((team, index) => (
                    <tr key={index} className="hover:bg-gray-700 hover:bg-opacity-40 transition-colors">
                      <td className="py-4 px-6 text-gray-100">{team.name}</td>
                      <td className="py-4 px-6 text-gray-100">{team.score}</td>
                      <td className="py-4 px-6 text-gray-100">{team.budget}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;