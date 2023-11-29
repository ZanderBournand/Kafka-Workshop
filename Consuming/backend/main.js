// Importing modules and setting up WebSocket server
const http = require('http');
const runScoreboardConsumer = require('./scoreboard');
const runStatsConsumer = require('./stats');

const server = http.createServer();
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// Configuring namespaces for different functionalities
const ioScoreboard = io.of('/scoreboard');
const ioStats = io.of('/stats');

// Socket connection handling for scoreboard and stats
ioScoreboard.on('connection', (socket) => {
  console.log('Client connected to /scoreboard:', socket.id);
});

ioStats.on('connection', (socket) => {
  console.log('Client connected to /stats:', socket.id);
});

server.listen(3001, () => {
  console.log('WebSocket server listening on port 3001');
});

// Starting Kafka consumers for scoreboard and stats
runScoreboardConsumer(ioScoreboard).catch(console.error);
runStatsConsumer(ioStats).catch(console.error);