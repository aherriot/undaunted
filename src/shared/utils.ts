import { Ctx } from "boardgame.io";
import { GameState, Team } from "./types";

export const playerIdToTeam = (playerId: string | undefined): Team => {
  return playerId === "0" ? Team.German : Team.American;
};

export const teamToString = (team: Team): string => {
  return team === Team.German ? "german" : "american";
};

export const getOtherTeam = (team: Team): Team => {
  return team === Team.German ? Team.American : Team.German;
};

export const getOtherPlayerId = (playerId: string): string => {
  return playerId === "0" ? "1" : "0";
};

export const drawCard = (g: GameState, ctx: Ctx, team: Team) => {
  if (g[team].deck.length === 0) {
    g[team].deck = g[team].deck.concat(g[team].discard);
    g[team].discard = [];
  }
  if (g[team].deck.length === 0) {
    console.error("Deck still empty after recycling discard");
    return;
  }
  const randomIndex = ctx.random?.Die?.(g[team].deck.length)! - 1;
  const [cardId] = g[team].deck.splice(randomIndex, 1);
  g[team].hand.push(cardId);
};

export const playCard = (g: GameState, ctx: Ctx, cardId: string) => {
  const team = playerIdToTeam(ctx.playerID);

  const index = g[team].hand.findIndex((card) => card === cardId);
  if (index >= 0) {
    g[team].hand.splice(index, 1);
    g[team].played.push(cardId);
  } else {
    console.error(`Could not find card "${cardId}" in hand`);
  }
};

export const discardCard = (g: GameState, ctx: Ctx, cardId: string) => {
  const team = playerIdToTeam(ctx.playerID);

  const index = g[team].hand.findIndex((card) => card === cardId);
  if (index >= 0) {
    g[team].hand.splice(index, 1);
    g[team].discard.push(cardId);
  } else {
    console.error(`Could not find card "${cardId}" in hand`);
  }
};

export const checkEndOfStage = (g: GameState, ctx: Ctx) => {
  const team = playerIdToTeam(ctx.playerID);
  const otherTeam: Team = getOtherTeam(team);

  if (g[team].hand.length === 0) {
    if (g[otherTeam].hand.length === 0) {
      g[team].discard = g[team].discard.concat(g[team].played);
      g[team].played = [];
      g[otherTeam].discard = g[otherTeam].discard.concat(g[otherTeam].played);
      g[otherTeam].played = [];
      ctx.events?.endTurn?.();
      // ctx.events?.setActivePlayers?.({ all: "initiative" });
    } else {
      ctx.events?.setActivePlayers?.({
        value: { [otherTeam]: "order" },
      });
    }
  }
};
