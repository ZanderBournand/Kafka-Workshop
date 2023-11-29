import LakersLogo from './images/lakers.png'
import BucksLogo from './images/bucks.png'
import WarriorsLogo from './images/warriors.png'
import NetsLogo from './images/nets.png'
import CelticsLogo from './images/celtics.png'
import RocketsLogo from './images/rockets.png'
import HeatLogo from './images/heat.png'
import ClippersLogo from './images/clippers.png'

export const initialScoreboardState = {
    game_1: { 
      team1: {
        name: 'Lakers', 
        logo: LakersLogo,
        score: 0
      },
      team2: {
        name: 'Bucks', 
        logo: BucksLogo,
        score: 0
      },
      status: "Begins soon..."
    },
    game_2: { 
      team1: {
        name: 'Warriors', 
        logo: WarriorsLogo,
        score: 0
      },
      team2: {
        name: 'Nets', 
        logo: NetsLogo,
        score: 0
      },
      status: "Begins soon..."
    },
    game_3: { 
      team1: {
        name: 'Celtics', 
        logo: CelticsLogo,
        score: 0
      },
      team2: {
        name: 'Rockets', 
        logo: RocketsLogo,
        score: 0
      },
      status: "Begins soon..."
    },
    game_4: {
      team1: {
        name: 'Heat', 
        logo: HeatLogo,
        score: 0
      },
      team2: {
        name: 'Clippers', 
        logo: ClippersLogo,
        score: 0
      },
      status: "Begins soon..."
    },
}

export const initialStats = {
    Player1: { team:  "Lakers", teamLogo: LakersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player2: {team:  "Lakers", teamLogo: LakersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player3: {team:  "Lakers", teamLogo: LakersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player4: {team:  "Lakers", teamLogo: LakersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player5: {team:  "Lakers", teamLogo: LakersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player6: {team:  "Bucks", teamLogo: BucksLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player7: {team:  "Bucks", teamLogo: BucksLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player8: {team:  "Bucks", teamLogo: BucksLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player9: {team:  "Bucks", teamLogo: BucksLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player10: {team:  "Bucks", teamLogo: BucksLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player11: {team:  "Warriors", teamLogo: WarriorsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player12: {team:  "Warriors", teamLogo: WarriorsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player13: {team:  "Warriors", teamLogo: WarriorsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player14: {team:  "Warriors", teamLogo: WarriorsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player15: {team:  "Warriors", teamLogo: WarriorsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player16: {team:  "Nets", teamLogo: NetsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player17: {team:  "Nets", teamLogo: NetsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player18: {team:  "Nets", teamLogo: NetsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player19: {team:  "Nets", teamLogo: NetsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player20: {team:  "Nets", teamLogo: NetsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player21: {team:  "Celtics", teamLogo: CelticsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player22: {team:  "Celtics", teamLogo: CelticsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player23: {team:  "Celtics", teamLogo: CelticsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player24: {team:  "Celtics", teamLogo: CelticsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player25: {team:  "Celtics", teamLogo: CelticsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player26: {team:  "Rockets", teamLogo: RocketsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player27: {team:  "Rockets", teamLogo: RocketsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player28: {team:  "Rockets", teamLogo: RocketsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player29: {team:  "Rockets", teamLogo: RocketsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player30: {team:  "Rockets", teamLogo: RocketsLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player31: {team:  "Heat", teamLogo: HeatLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player32: {team:  "Heat", teamLogo: HeatLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player33: {team:  "Heat", teamLogo: HeatLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player34: {team:  "Heat", teamLogo: HeatLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player35: {team:  "Heat", teamLogo: HeatLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player36: {team:  "Clippers", teamLogo: ClippersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player37: {team:  "Clippers", teamLogo: ClippersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player38: {team:  "Clippers", teamLogo: ClippersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player39: {team:  "Clippers", teamLogo: ClippersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
    Player40: {team:  "Clippers", teamLogo: ClippersLogo, points: 0, assists: 0, fouls: 0, turnovers: 0},
}