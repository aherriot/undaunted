import { Team, CardType, Squad, Unit, Card } from "./types";

const addCards = (
  map: Record<string, Card>,
  team: Team,
  type: CardType,
  squad: Squad | null,
  names: Array<string>
) => {
  names.forEach((name, index) => {
    const unit = (index + 1).toString() as Unit;
    const teamIndicator = team === Team.American ? "a" : "g";
    const id = teamIndicator + type[0] + (squad || "") + unit;
    map[id] = {
      id,
      team,
      type,
      unit,
      name: name,
    };

    if (squad) {
      map[id].squad = squad;
    }
  });
};

const cardMap: Record<string, Card> = {
  aps: {
    id: "aps",
    team: Team.American,
    type: "platoon_sergeant",
    name: "Manuel Becker",
  },
  gps: {
    id: "gps",
    team: Team.German,
    type: "platoon_sergeant",
    name: "Dominik Sauerbrunn",
  },
  apg: {
    id: "apg",
    team: Team.American,
    type: "platoon_guide",
    name: "Jonathan Hayden",
  },
  gpg: {
    id: "gpg",
    team: Team.German,
    type: "platoon_guide",
    name: "Benjamin Brenner",
  },
  asla: {
    id: "asla",
    team: Team.American,
    type: "squad_leader",
    squad: "a",
    name: "Raymond Shepherd",
  },
  aslb: {
    id: "aslb",
    team: Team.American,
    type: "squad_leader",
    squad: "b",
    name: "Allan Tillman",
  },
  aslc: {
    id: "aslc",
    team: Team.American,
    type: "squad_leader",
    squad: "c",
    name: "Steve Foster",
  },
  gsla: {
    id: "gsla",
    team: Team.German,
    type: "squad_leader",
    squad: "a",
    name: "Lennart Scheider",
  },
  gslb: {
    id: "gslb",
    team: Team.German,
    type: "squad_leader",
    squad: "b",
    name: "Elias Bohn",
  },
  gslc: {
    id: "gslc",
    team: Team.German,
    type: "squad_leader",
    squad: "c",
    name: "Hans Idelson",
  },
};

// add fog of war cards
for (let i = 1; i <= 10; i++) {
  let id = "af" + i;
  cardMap[id] = {
    id,
    team: Team.American,
    type: "fog_of_war",
  };

  id = "gf" + i;
  cardMap[id] = {
    id,
    team: Team.German,
    type: "fog_of_war",
  };
}

addCards(cardMap, Team.American, "rifleman", "a", [
  "Billy Barrett",
  "Tony Larsen",
  "Alex Herman",
  "George Baldwin",
  "Anthony McLean",
]);
addCards(cardMap, Team.American, "rifleman", "b", [
  "Gordon Vinson",
  "James Huber",
  "Kevin Hanson",
  "Marco Franklin",
  "Francisco Gilliam",
]);
addCards(cardMap, Team.American, "rifleman", "c", [
  "Wesley O'Donnell",
  "Bernard Hampton",
  "Jose Norris",
  "Joseph Todd",
  "Franklin Watts",
]);
addCards(cardMap, Team.American, "scout", "a", [
  "Roger Hicks",
  "Daniel Hart",
  "Timothy Griffith",
]);
addCards(cardMap, Team.American, "scout", "b", [
  "Ray Gamble",
  "Stephen Parks",
  "Elmer Alford",
]);
addCards(cardMap, Team.American, "scout", "c", [
  "Troy Bonner",
  "Colin Weeks",
  "Vincent Moss",
]);
addCards(cardMap, Team.American, "gunner", "a", [
  "Jay York",
  "Darryl Richards",
  "Ronald Knowles",
]);
addCards(cardMap, Team.American, "gunner", "b", [
  "Alan Kidd",
  "Norman Fowler",
  "Lonnie O'Donnell",
]);
addCards(cardMap, Team.American, "gunner", "c", [
  "Joseph Roy",
  "Phillip Hodges",
  "Richard Hardy",
]);
addCards(cardMap, Team.American, "sniper", null, [
  "Freddie May",
  "Harry Browning",
  "Reginald Navarro",
]);
addCards(cardMap, Team.American, "mortar", null, [
  "Robert Hines",
  "Harry Kidd",
  "Russell Nolan",
]);

addCards(cardMap, Team.German, "rifleman", "a", [
  "Pascal Stelzner",
  "Arnold Klebs",
  "Eduard Stuhr",
  "Thorsten Dreyfuss",
  "Johan Spitzer",
]);
addCards(cardMap, Team.German, "rifleman", "b", [
  "Laurin Preiszner",
  "Casper Outman",
  "Henry Hardt",
  "Tillmann Beckmann",
  "Alexander Drexler",
]);
addCards(cardMap, Team.German, "rifleman", "c", [
  "Thorsten Mueller",
  "Philip Wimpffen",
  "Sandro Fittkau",
  "Henry Ahrendt",
  "Richard Kruspe",
]);
addCards(cardMap, Team.German, "scout", "a", [
  "Armin Hildebrandt",
  "Maxi Pauli",
  "Dirk Neuhaus",
]);
addCards(cardMap, Team.German, "scout", "b", [
  "Luis Marks",
  "Georg Hoenigberg",
  "Timon Aach",
]);
addCards(cardMap, Team.German, "scout", "c", [
  "Jeremias Heiner",
  "Eduard Gerhardt",
  "Stephen Conzelmann",
]);
addCards(cardMap, Team.German, "gunner", "a", [
  "Erik Schimscheiner",
  "Lucas Prager",
  "Kevin Wimpffen",
]);
addCards(cardMap, Team.German, "gunner", "b", [
  "Marko Stadler",
  "Daniel Heck",
  "Falko Weinberg",
]);
addCards(cardMap, Team.German, "gunner", "c", [
  "Jens Ahrendt",
  "Leo Boettcher",
  "Timon Ganzfried",
]);
addCards(cardMap, Team.German, "sniper", null, [
  "Ole Auerbach",
  "Timo Haeusser",
  "Marc Kiesinger",
]);
addCards(cardMap, Team.German, "mortar", null, [
  "Milo Jahn",
  "Peter Boehm",
  "David Freisler",
]);

export default cardMap;
