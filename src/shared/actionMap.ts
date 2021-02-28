import { CardActionType, CardActionInfo } from "./types";

const actionMap: Record<CardActionType, CardActionInfo> = {
  scout: {
    description: (amount) =>
      `Move the unit’s combat counter up to (${amount}) tiles. If either tile you move onto does not have one of your control markers on it, place a control marker there on its scouted side. For each control marker placed, take a Fog of War card from your supply and place it in your discard pile.`,
  },
  move: {
    description: (amount) =>
      `Move the unit’s combat counter up to (${amount}) tiles. The tile you move onto must be scouted or controlled by your side.`,
  },
  conceal: {
    description: () =>
      "Take a Fog of War card from your opponent’s supply and place it in their discard pile. ",
  },
  attack: {
    description: (amount) => `Role (${amount}) dice to hit a target.`,
  },
  suppress: {
    description: (amount) => `Role (${amount}) dice to suppress a target.`,
  },
  recon: {
    description: () =>
      "Choose a Fog of War card from your hand and remove it from the game. Then draw a card from your deck. That card can be played as normal this turn.",
  },
  control: {
    description: () =>
      "Take control of the tile that the unit’s combat counter is on by flipping the control marker to the controlled side. ",
  },
  bolster: {
    description: (amount) =>
      `Take up to (${amount}) cards from your supply and add them to your discard pile. If the card specifies a squad, only cards from that squad in your supply may be taken.`,
  },
  command: {
    description: (amount) =>
      `Draw up to (${amount}) cards from your deck and add them to your hand. Those cards can be played as normal this turn.`,
  },
  inspire: {
    description: (amount) =>
      `Choose up to (${amount}) cards from your play area and add them to your hand. Those cards can be played as normal this turn.`,
  },
  blast: {
    description: (amount) =>
      `Attack every unit on the targetted tile with (${amount}) dice. Range defense does not apply.`,
  },
  target: {
    description: () =>
      "Place your target marker on a tile that is three or more tiles away from your Mortar combat counter.",
  },
  stalk: {
    description: (amount) =>
      `Move the unit’s combat counter up to (${amount}) tiles. The tile you move onto does not need to be scouted by your side.`,
  },
  guide: {
    description: (amount) =>
      `Move any combat counter up to (${amount}) tiles. The tile you move onto must be scouted or controlled by your side.`,
  },
  discard: {
    description: (amount) => `Discard this card into the discard pile.`,
  },
};

export default actionMap;
