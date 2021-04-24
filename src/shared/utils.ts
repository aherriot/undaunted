import { Ctx } from "boardgame.io";
import { GameState, Team, CardId, CardType, Card, MarkerId } from "./types";

export const playerIdToTeam = (playerId: string | null | undefined): Team => {
  switch (playerId) {
    case "0":
      return Team.German;
    case "1":
      return Team.American;
  }
  throw new Error("playerIdToTeam: playerId undefined");
};

export const teamToString = (team: Team | null): string => {
  if (team === Team.German) {
    return "german";
  } else if (team === Team.American) {
    return "american";
  } else {
    return "";
  }
};

export const getOtherTeam = (team: Team): Team => {
  return team === Team.German ? Team.American : Team.German;
};

export const cardToMarkerId = (card: Card): MarkerId => {
  return (teamToString(card.team)[0] + card.type[0] + card.squad) as MarkerId;
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

export const playCard = (g: GameState, ctx: Ctx, cardId: CardId) => {
  const team = playerIdToTeam(ctx.playerID);

  const index = g[team].hand.findIndex((card) => card === cardId);
  if (index >= 0) {
    g[team].hand.splice(index, 1);
    g[team].played.push(cardId);
  } else {
    console.error(`Could not find card "${cardId}" in hand`);
  }
};

export const discardCard = (g: GameState, ctx: Ctx, cardId: CardId) => {
  const team = playerIdToTeam(ctx.playerID);

  const index = g[team].hand.findIndex((card) => card === cardId);
  if (index >= 0) {
    g[team].hand.splice(index, 1);
    g[team].discard.push(cardId);
  } else {
    console.error(`Could not find card "${cardId}" in hand`);
  }
};

export const supplyCard = (
  g: GameState,
  ctx: Ctx,
  team: Team,
  cardId: CardId
) => {
  const index = g[team].supply.findIndex((card) => card === cardId);
  if (index >= 0) {
    g[team].supply.splice(index, 1);
    g[team].discard.push(cardId);
  } else {
    console.error(`Could not find card "${cardId}" in hand`);
  }
};

export const killCard = (g: GameState, team: Team, cardId: CardId) => {
  let found = false;
  let index = -1;

  if (!found) {
    index = g[team].hand.findIndex((card) => card === cardId);
    if (index >= 0) {
      found = true;
      g[team].hand.splice(index, 1);
    }
  }

  if (!found) {
    index = g[team].played.findIndex((card) => card === cardId);
    if (index >= 0) {
      g[team].played.splice(index, 1);
      found = true;
    }
  }

  if (!found) {
    index = g[team].discard.findIndex((card) => card === cardId);
    if (index >= 0) {
      g[team].discard.splice(index, 1);
      found = true;
    }
  }

  if (!found) {
    index = g[team].deck.findIndex((card) => card === cardId);
    if (index >= 0) {
      g[team].deck.splice(index, 1);
      found = true;
    }
  }

  if (!found) {
    console.error(`Could not kill card "${cardId}"`);
  } else {
    g[team].dead.push(cardId);
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
