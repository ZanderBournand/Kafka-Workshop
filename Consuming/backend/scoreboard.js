// Kafka consumer setup and event handling for scoreboard updates
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'websocket-server',
  brokers: ['localhost:9092'],
});

const consumerScoreboard = kafka.consumer({ groupId: 'scoreboard-group' });

const runScoreboardConsumer = async (io) => {
  // Establishing connection and subscription to the 'nba_events' topic
  await consumerScoreboard.connect();
  await consumerScoreboard.subscribe({ topic: 'nba_events' });

  await consumerScoreboard.run({
    eachMessage: async ({ message }) => {
      // Handling incoming events and emitting scoreboard updates
      const event = JSON.parse(message.value.toString());
      await handleEvent(io, event);
    },
  });
};


const handleEvent = async (io, event) => {
  let events = [];

  // Format any "score" events
  if (event.event_type === 'score') {
    events.push({
      game_id: event.game_id,
      team: event.team,
      points: event.points,
      type: 'score'
    });
  } 

  // Format any "quarter/time" related events
  else if (event.event_type === 'quarter_start' || event.event_type === 'quarter_end') {
    events.push({
      game_id: event.game_id,
      quarter: event.quarter_number,
      action: event.event_type === 'quarter_start' ? 'start' : 'end',
      type: 'time'
    });
  }

  // Forward event to frontend
  events.forEach(event => {
    io.emit('scoreboardUpdate', event);
  });
}

module.exports = runScoreboardConsumer;
