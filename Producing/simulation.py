import threading
from kafka import KafkaProducer
import random
import time
import json

# NBA Teams for each game with 5 players each
teams = {
    # Define NBA teams for each game
    'game_1': [
        {'team_name': 'Lakers', 'players': [f"Player{idx}" for idx in range(1, 6)]},
        {'team_name': 'Bucks', 'players': [f"Player{idx}" for idx in range(6, 11)]}
    ],
    'game_2': [
        {'team_name': 'Warriors', 'players': [f"Player{idx}" for idx in range(11, 16)]},
        {'team_name': 'Nets', 'players': [f"Player{idx}" for idx in range(16, 21)]}
    ],
    'game_3': [
        {'team_name': 'Celtics', 'players': [f"Player{idx}" for idx in range(21, 26)]},
        {'team_name': 'Rockets', 'players': [f"Player{idx}" for idx in range(26, 31)]}
    ],
    'game_4': [
        {'team_name': 'Heat', 'players': [f"Player{idx}" for idx in range(31, 36)]},
        {'team_name': 'Clippers', 'players': [f"Player{idx}" for idx in range(36, 41)]}
    ]
}

class NBAEventProducer:
    def __init__(self, bootstrap_servers):
        # Initialize the NBAEventProducer with necessary attributes
        self.bootstrap_servers = bootstrap_servers
        self.producer = self._create_producer()

    def _create_producer(self):
        # Create a KafkaProducer for this game
        return KafkaProducer(
            bootstrap_servers=self.bootstrap_servers,
            key_serializer=str.encode,
            value_serializer=lambda v: json.dumps(v).encode('utf-8'),
            acks='all'
        )

    def send_event(self, key, value):
        # Send the event to the 'nba_events' topic
        self.producer.send('nba_events', key=key, value=value)
        print(f"Produced event for Game {key}: {value}")

    def generate_events(self, game_id, team1, team2):
        # Generate events for a game
        quarter_duration = 180  # 3 minutes per quarter
        quarters = 4
        current_quarter = 1

        while current_quarter <= quarters:
            # Generate events for each quarter
            quarter_start_event = {
                # Create a quarter start event
                'game_id': game_id,
                'event_type': 'quarter_start',
                'quarter_number': current_quarter,
                'timestamp': int(time.time())
            }
            self.send_event(game_id, quarter_start_event)
            print(f"Quarter {current_quarter} started for Game {game_id}")

            # Logic to generate random events during a quarter
            time_elapsed = 0
            while time_elapsed < quarter_duration:
                event_type = random.choices(['score', 'foul', 'turnover'], weights=[0.75, 0.1, 0.15])[0]
                team = team1['team_name'] if random.choice([True, False]) else team2['team_name']

                if event_type == 'score':
                    # Logic for scoring event
                    player = random.choice(team1['players'] if team == team1['team_name'] else team2['players'])
                    assist_player = random.choice(team1['players'] if team == team1['team_name'] else team2['players'])
                    while assist_player == player:
                        assist_player = random.choice(team1['players'] if team == team1['team_name'] else team2['players'])

                    event = {
                        'game_id': game_id,
                        'event_type': event_type,
                        'team': team,
                        'player': player,
                        'assist': assist_player,
                        'points': random.choice([2, 3]),
                        'timestamp': int(time.time())
                    }

                elif event_type == 'foul':
                    # Logic for foul event
                    player = random.choice(team1['players'] if team == team1['team_name'] else team2['players'])
                    event = {
                        'game_id': game_id,
                        'event_type': event_type,
                        'team': team,
                        'player': player,
                        'timestamp': int(time.time())
                    }

                else:  # event_type == 'turnover'
                    # Logic for turnover event
                    player = random.choice(team1['players'] if team == team1['team_name'] else team2['players'])
                    event = {
                        'game_id': game_id,
                        'event_type': event_type,
                        'team': team,
                        'player': player,
                        'timestamp': int(time.time())
                    }

                self.send_event(game_id, event)
                print(f"Produced event for Game {game_id}: {event}")

                # Simulate time between events
                time_elapsed += random.uniform(5, 15)
                time.sleep(random.uniform(1, 3))
                if time_elapsed >= quarter_duration:
                    break

            # Create a quarter end event
            quarter_end_event = {
                'game_id': game_id,
                'event_type': 'quarter_end',
                'quarter_number': current_quarter,
                'timestamp': int(time.time())
            }
            self.send_event(game_id, quarter_end_event)
            print(f"Quarter {current_quarter} ended for Game {game_id}")

            # Wait 30 seconds before starting the next quarter
            current_quarter += 1
            time.sleep(30)

# Kafka broker address
bootstrap_servers = 'localhost:9092'

# Create NBAEventProducer instances for each game
producers = {game_id: NBAEventProducer(bootstrap_servers) for game_id in teams.keys()}

# Start threads for each game
threads = []
for game_id, team_players in teams.items():
    team1, team2 = team_players
    thread = threading.Thread(target=producers[game_id].generate_events, args=(game_id, team1, team2))
    threads.append(thread)
    thread.start()

# Wait for all threads to complete
for thread in threads:
    thread.join()
