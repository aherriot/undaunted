import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import cardMap from "./cardMap";
import cardTypes from "./cardTypes";
import {
  playCard,
  discardCard,
  playerIdToTeam,
  checkEndOfStage,
} from "./utils";
import { GameState, Team, CardId } from "./types";

export const selectInitiative = (g: GameState, ctx: Ctx, cardId: CardId) => {
  const card = cardMap[cardId];
  const cardInfo = cardTypes[card.type];

  const team = playerIdToTeam(ctx.playerID);

  if (!g[team].hand.includes(cardId)) {
    return INVALID_MOVE;
  }

  discardCard(g, ctx, cardId);
  g[team].selectedInitiative = cardInfo.initiative;

  ctx.events?.endStage?.();
  if (Object.keys(ctx.activePlayers!).length === 1) {
    if (
      g[Team.German].selectedInitiative! > g[Team.American].selectedInitiative!
    ) {
      g.initiative = Team.German;
    } else if (
      g[Team.German].selectedInitiative! < g[Team.American].selectedInitiative!
    ) {
      g.initiative = Team.American;
    }
    ctx.events?.setActivePlayers?.({
      value: { [g.initiative]: "order" },
    });
  }
};

export const bolster = (g: GameState, ctx: Ctx, cardIds: Array<CardId>) => {
  const team = playerIdToTeam(ctx.playerID);

  cardIds.forEach((cardId) => {
    const index = g[team].supply.findIndex((card) => card === cardId);
    if (index >= 0) {
      g[team].supply.splice(index, 1);
      g[team].discard.push(cardId);
    }
  });

  checkEndOfStage(g, ctx);
};

export const discard = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);
  checkEndOfStage(g, ctx);
};

export const scout = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);
  console.log("scout");
  checkEndOfStage(g, ctx);
};

export const move = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("move");
  checkEndOfStage(g, ctx);
};

export const conceal = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("conceal");
  checkEndOfStage(g, ctx);
};

export const attack = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("attack");
  checkEndOfStage(g, ctx);
};

export const suppress = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("suppress");
  checkEndOfStage(g, ctx);
};

export const recon = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("recon");
  checkEndOfStage(g, ctx);
};

export const control = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("control");
  checkEndOfStage(g, ctx);
};

export const command = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("command");
  checkEndOfStage(g, ctx);
};

export const inspire = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("inspire");
  checkEndOfStage(g, ctx);
};

export const blast = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("blast");
  checkEndOfStage(g, ctx);
};

export const target = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("target");
  checkEndOfStage(g, ctx);
};

export const stalk = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("stalk");
  checkEndOfStage(g, ctx);
};

export const guide = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("guide");
  checkEndOfStage(g, ctx);
};
