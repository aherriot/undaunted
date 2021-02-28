import { CardType, CardTypeInfo } from "./types";

const cardTypes: Record<CardType, CardTypeInfo> = {
  scout: {
    actions: [
      { type: "scout", amount: 2 },
      { type: "attack", amount: 1 },
      { type: "recon" },
      { type: "conceal" },
    ],
    initiative: 6,
    label: "Scout",
    defense: 5,
  },
  rifleman: {
    actions: [
      { type: "move", amount: 1 },
      { type: "attack", amount: 1 },
      { type: "control" },
    ],
    initiative: 5,
    label: "Rifleman",
    defense: 4,
  },
  gunner: {
    actions: [
      { type: "move", amount: 1 },
      { type: "attack", amount: 2 },
      { type: "suppress", amount: 4 },
    ],
    initiative: 3,
    label: "Gunner",
    defense: 4,
  },
  sniper: {
    actions: [
      { type: "stalk", amount: 1 },
      { type: "attack", amount: 3 },
    ],
    initiative: 4,
    label: "Sniper",
    defense: 5,
  },
  mortar: {
    actions: [
      { type: "move", amount: 1 },
      { type: "blast", amount: 1 },
      { type: "target" },
    ],
    initiative: 2,
    label: "Mortar",
    defense: 3,
  },
  squad_leader: {
    actions: [
      { type: "bolster", amount: 2 },
      { type: "inspire", amount: 1 },
    ],
    initiative: 7,
    label: "Squad Leader",
  },
  platoon_guide: {
    actions: [
      { type: "bolster", amount: 1 },
      { type: "guide", amount: 1 },
    ],
    initiative: 8,
    label: "Platoon Guide",
  },
  platoon_sergeant: {
    actions: [
      { type: "bolster", amount: 3 },
      { type: "command", amount: 2 },
    ],
    initiative: 9,
    label: "Platoon Sergeant",
  },
  fog_of_war: {
    actions: [],
    initiative: 1,
    label: "Fog of War",
  },
};

export default cardTypes;
