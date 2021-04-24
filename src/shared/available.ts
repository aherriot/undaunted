import { Ctx } from "boardgame.io";
import { GameState, CardActionType, PlayerId, CardId, MarkerId } from "./types";
import cardMap from "./cardMap";
import {
  playerIdToTeam,
  getOtherTeam,
  teamToString,
  cardToMarkerId,
} from "./utils";

const available: Record<
  CardActionType,
  (g: GameState, ctx: Ctx, playerId: PlayerId, cardId: CardId) => boolean
> = {
  recon: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    const team = playerIdToTeam(playerId);

    if (g[team].hand.find((cardId) => cardMap[cardId].type === "fog_of_war")) {
      return true;
    }

    if (
      g[team].played.find((cardId) => cardMap[cardId].type === "fog_of_war")
    ) {
      return true;
    }

    return false;
  },
  scout: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  move: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  attack: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  conceal: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    const otherTeam = getOtherTeam(playerIdToTeam(playerId));
    return !!g[otherTeam].supply.find(
      (cardId) => cardMap[cardId].type === "fog_of_war"
    );
  },
  control: (g: GameState, ctx: Ctx, playerId: PlayerId, cardId: CardId) => {
    const team = playerIdToTeam(playerId);
    const card = cardMap[cardId];
    const cardMarkerId = cardToMarkerId(card);

    const tile = Object.values(g.tiles).find((tile) =>
      tile?.markers.find((markerId) => markerId === cardMarkerId)
    );

    // if there is no flag or it is already controlled by this team
    if (!tile?.flag || tile.flag.control === team) {
      return false;
    }

    return true;
  },
  suppress: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  bolster: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  inspire: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  blast: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  target: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  stalk: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  guide: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  command: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
  discard: (g: GameState, ctx: Ctx, playerId: PlayerId) => {
    return true;
  },
};

export default available;
