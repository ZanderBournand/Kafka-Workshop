import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { initialScoreboardState } from '../util';

const ScoreboardPage = () => {
  // State variable initialization
  const [gameData, setGameData] = useState(initialScoreboardState);

  // Establish a WebSocket connection
  useEffect(() => {
    const socket = io('http://localhost:3001/scoreboard');

    // Listen for 'scoreboardUpdate' event from the WebSocket server
    socket.on('scoreboardUpdate', (data) => {
      // Update game data based on received event type
      if (data.type === 'score') {
        const { game_id, team, points } = data;

        // Update scores for respective teams
        setGameData((prevData) => {
          const updatedData = { ...prevData };

          if (team === updatedData[game_id].team1.name) {
            updatedData[game_id].team1.score += points;
          } else if (team === updatedData[game_id].team2.name) {
            updatedData[game_id].team2.score += points;
          }

          return updatedData;
        });
      } else if (data.type === 'time') {
        const { game_id, quarter, action } = data;

        // Update game status based on received action
        setGameData((prevData) => {
          const updatedData = { ...prevData };

          if (action === 'start') {
            updatedData[game_id].status = `Q${quarter}'`;
          } else if (action === 'end') {
            updatedData[game_id].status = `Q${quarter} ended!`;
          }

          return updatedData;
        });
      }
    });

    // Clean up the WebSocket connection
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Scoreboards</h2>
      <div style={{ width: '80%', maxWidth: '600px', marginTop: '2%' }}>
        {Object.keys(gameData).map((gameId, index) => (
          <>
          <div key={gameId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <img src={gameData[gameId].team1.logo} alt={`Team ${gameId.substring(5)} Logo`} style={{ width: 'auto', height: '100px', marginBottom: '5px' }} />
              <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{gameData[gameId].team1.name}</p>
              <p>{gameData[gameId].team1.score}</p>
            </div>

            <div style={{display: 'flex', alignItems: 'center'}}>
              <p style={{fontWeight: '600', fontSize: '18px'}}>
                {gameData[gameId].status}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <img src={gameData[gameId].team2.logo} alt={`Team ${gameId.substring(5)} Logo`} style={{ width: 'auto', height: '100px', marginBottom: '5px' }} />
              <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{gameData[gameId].team2.name}</p>
              <p>{gameData[gameId].team2.score}</p>
            </div>
          </div>
          {index !== Object.keys(gameData).length - 1 && <hr style={{ width: '100%', margin: '30px 0' }} />}
          </>
        ))}
      </div>
    </div>
  );
};
export default ScoreboardPage;
