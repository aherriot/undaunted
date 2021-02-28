// import cardMap from "./cardMap";

// type CardId =
//   | "aps"
//   | "gps"
//   | "apg"
//   | "gpg"
//   | "asla"
//   | "aslb"
//   | "aslc"
//   | "gsla"
//   | "gslb"
//   | "gslc"
//   | "gra1"
//   | "gra2"
//   | "gra3"
//   | "gra4"
//   | "gra5"
//   | "ara1"
//   | "ara2"
//   | "ara3"
//   | "ara4"
//   | "ara5";

export type Stage = "initiative" | "order" | null;

export type PlayerId = "0" | "1";

export enum Team {
  German = "0",
  American = "1",
}

export type CardType =
  | "scout"
  | "rifleman"
  | "sniper"
  | "gunner"
  | "mortar"
  | "platoon_sergeant"
  | "platoon_guide"
  | "squad_leader"
  | "fog_of_war";

export type Squad = "a" | "b" | "c";

export type Unit = "1" | "2" | "3" | "4" | "5";

export type Card = {
  id: string;
  team: Team;
  type: CardType;
  squad?: Squad;
  unit?: Unit;
  name?: string;
};

export type CardTypeInfo = {
  actions: Array<CardAction>;
  initiative: number;
  label: string;
  defense?: number;
};

export type CardActionType =
  | "scout"
  | "move"
  | "attack"
  | "recon"
  | "conceal"
  | "control"
  | "suppress"
  | "bolster"
  | "inspire"
  | "blast"
  | "target"
  | "stalk"
  | "guide"
  | "command"
  | "discard";

export type CardAction = {
  type: CardActionType;
  amount?: number;
};

export type CardActionInfo = {
  description: (amount: number | undefined) => string;
};

export type TileId =
  | "1a"
  | "1b"
  | "2a"
  | "2b"
  | "3a"
  | "3c"
  | "4a"
  | "4b"
  | "5a"
  | "5b"
  | "6a"
  | "6b";

export type Tile = {
  id: TileId;
  defense: number;
  scouted: {
    american: boolean;
    german: boolean;
  };
};

export type Flag = {
  tile: TileId;
  amount: number;
  control: Team | null;
};

export type MarkerId =
  | "ara"
  | "arb"
  | "arc"
  | "asa"
  | "asb"
  | "asc"
  | "aga"
  | "agb"
  | "agc"
  | "as"
  | "am"
  | "gra"
  | "grb"
  | "grc"
  | "gsa"
  | "gsb"
  | "gsc"
  | "gga"
  | "ggb"
  | "ggc"
  | "gs"
  | "gm";

export type Marker = {
  id: MarkerId;
  tile: TileId | null;
};

export type PlayerState = {
  selectedInitiative: number | null;
  supply: Array<string>;
  deck: Array<string>;
  hand: Array<string>;
  played: Array<string>;
  discard: Array<string>;
  dead: Array<string>;
};

export type GameState = {
  initiative: Team;
  [Team.American]: PlayerState;
  [Team.German]: PlayerState;
  markers: Array<Marker>;
  flags: Array<Flag>;
  board: Array<Array<TileId>>;
  tiles: Partial<Record<TileId, Tile>>;
};