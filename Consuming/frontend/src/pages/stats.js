import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { initialStats } from '../util';

const StatsPage = () => {
  // State variables initialization
  const [playerStatsData, setPlayerStatsData] = useState(initialStats);
  const [topPoints, setTopPoints] = useState([]);
  const [topAssists, setTopAssists] = useState([]);
  const [topFouls, setTopFouls] = useState([]);
  const [topTurnovers, setTopTurnovers] = useState([]);

  // Establish a WebSocket connection
  useEffect(() => {
    const socketStats = io('http://localhost:3001/stats');
    
    // Listen for 'statsUpdate' event from the WebSocket server
    socketStats.on('statsUpdate', (data) => {
      const { player, quantity, type } = data;

      // Update player statistics based on the received event type
      setPlayerStatsData((prevData) => {
        const updatedData = { ...prevData };

        // Handle different event types and update corresponding stats
        if (type === 'score') {
          updatedData[player].points += quantity;
        } else if (type === 'assist') {
          updatedData[player].assists += quantity;
        } else if (type === 'foul') {
          updatedData[player].fouls += quantity;
        } else if (type === 'turnover') {
          updatedData[player].turnovers += quantity;
        }

        return updatedData;
      });
    });

    // Clean up the WebSocket connection
    return () => {
      socketStats.disconnect();
    };
  }, []);

  // Update top players in each category when playerStatsData changes
  useEffect(() => {
    // Sorting and updating top players by different stats categories
    const updateTopPlayers = (stat, setTopStat) => {
      const sortedStat = Object.entries(playerStatsData)
        .sort(([, a], [, b]) => b[stat] - a[stat])
        .slice(0, 10);
      setTopStat(sortedStat);
    };

    updateTopPlayers('points', setTopPoints);
    updateTopPlayers('assists', setTopAssists);
    updateTopPlayers('fouls', setTopFouls);
    updateTopPlayers('turnovers', setTopTurnovers);
  }, [playerStatsData]);

  // Function to group players by team
  const groupPlayersByTeam = () => {
    const groupedByTeam = {};
    for (const [player, stats] of Object.entries(playerStatsData)) {
      if (!groupedByTeam[stats.team]) {
        groupedByTeam[stats.team] = {
          logo: stats.teamLogo,
          players: []
        };
      }
      groupedByTeam[stats.team].players.push({ player, stats });
    }
    return groupedByTeam;
  };

  // Get data grouped by team
  const teamsData = groupPlayersByTeam();


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Player Stats</h2>

      {/* Top Leaderboards */}
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%' }}>
        <div>
          <h3>Top 10 Players by Points</h3>
          <div>
            {topPoints.map(([player, stats]) => (
              <div key={player} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={playerStatsData[player].teamLogo} alt={"player team icon"} style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'contain' }} />
                <p>{`${player} - ${stats.points} points`}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>Top 10 Players by Assists</h3>
          <div>
            {topAssists.map(([player, stats]) => (
              <div key={player} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={playerStatsData[player].teamLogo} alt={"player team icon"} style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'contain' }} />
                <p>{`${player} - ${stats.assists} assists`}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>Top 10 Players by Fouls</h3>
          <div>
            {topFouls.map(([player, stats]) => (
              <div key={player} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={playerStatsData[player].teamLogo} alt="player team icon" style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'contain' }} />
                <p>{`${player} - ${stats.fouls} fouls`}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3>Top 10 Players by Turnovers</h3>
          <div>
            {topTurnovers.map(([player, stats]) => (
              <div key={player} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={playerStatsData[player].teamLogo} alt="player team icon" style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'contain' }} />
                <p>{`${player} - ${stats.turnovers} turnovers`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr style={{ width: '60%', margin: '40px 0' }} />

      {/* Table for all player stats grouped by team */}
      <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%', flexWrap: 'wrap' }}>
        {Object.entries(teamsData).map(([team, obj]) => (
          <div key={team} style={{ marginBottom: '20px', width: '45%', minWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={obj.logo} alt="player team icon" style={{ width: '75px', height: '75px', marginRight: '10px', objectFit: 'contain' }} />
              <h2 style={{ textAlign: 'left' }}>{team}</h2>
            </div>
            <table style={{ width: '100%', margin: 'auto' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'center', padding: '8px' }}>Name</th>
                  <th style={{ textAlign: 'center', padding: '8px' }}>Points</th>
                  <th style={{ textAlign: 'center', padding: '8px' }}>Assists</th>
                  <th style={{ textAlign: 'center', padding: '8px' }}>Fouls</th>
                  <th style={{ textAlign: 'center', padding: '8px' }}>Turnovers</th>
                </tr>
              </thead>
              <tbody>
                {obj.players.map(({ player, stats }) => (
                  <tr key={player}>
                    <td style={{ textAlign: 'center', padding: '8px' }}>{player}</td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>{stats.points}</td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>{stats.assists}</td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>{stats.fouls}</td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>{stats.turnovers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPage;