// Kafka consumer setup and event handling for stats updates
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'websocket-server',
  brokers: ['localhost:9092'],
});

const consumerStats = kafka.consumer({ groupId: 'player-stats-group' });

const runStatsConsumer = async (io) => {
  // Establishing connection and subscription to the 'nba_events' topic
  await consumerStats.connect();
  await consumerStats.subscribe({ topic: 'nba_events' });

  await consumerStats.run({
    eachMessage: async ({ message }) => {
      // Handling incoming events and emitting stats updates
      const event = JSON.parse(message.value.toString());
      await handleEvent(io, event);
    },
  });
};


const handleEvent = async (io, event) => {
  let events = [];
  const parsedEvents = ['score', 'foul', 'turnover']

  // Format any "score"/"foul"/"turnover" event
  if (parsedEvents.includes(event.event_type)) {
    events.push({
      player: event.player,
      quantity: event.event_type === 'score'  ? event.points : 1,
      type: event.event_type
    });
  }

  // If a "score" event, also format an "assist" event
  if (event.event_type === 'score') {
    events.push({
      player: event.assist,
      quantity: 1,
      type: 'assist'
    });
  }

  // Forward all events to the frontend
  events.forEach(event => {
    io.emit('statsUpdate', event);
  });
}

module.exports = runStatsConsumer;
