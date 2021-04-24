import { Ctx } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";
import cardMap from "./cardMap";
import cardTypes from "./cardTypes";
import {
  playCard,
  discardCard,
  playerIdToTeam,
  cardToMarkerId,
  getOtherTeam,
  checkEndOfStage,
  killCard,
  drawCard,
  supplyCard,
} from "./utils";
import { GameState, Team, CardId, MarkerId, TileId } from "./types";
import markerMap from "./markerMap";

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

export const conceal = (
  g: GameState,
  ctx: Ctx,
  { cardId }: { cardId: CardId }
) => {
  const team = playerIdToTeam(ctx.playerID);
  const otherTeam = getOtherTeam(team);

  const fogCardId = g[otherTeam].supply.find((cardId) => {
    return cardMap[cardId].type === "fog_of_war";
  });

  if (fogCardId) {
    supplyCard(g, ctx, otherTeam, fogCardId);
    playCard(g, ctx, cardId);
  } else {
    console.error(`Could not play recon with card: ${cardId}`);
    return;
  }

  checkEndOfStage(g, ctx);
};

export const attack = (
  g: GameState,
  ctx: Ctx,
  { cardId, selectedMarker }: { cardId: CardId; selectedMarker: MarkerId }
) => {

  const attackingCard = cardTypes[cardMap[cardId].type];
  const attackAction = attackingCard.actions.find(
    (action) => action.type === "attack"
  );

  const markerInfo = markerMap[selectedMarker];
  const defendingCard = cardTypes[markerInfo.type];
  const marker = g.markers[selectedMarker];

  // marker.
  const { defense } = cardType;

  const dice = [];
  for (let i = 0; i < attackAction?.amount!; i++) {
    dice.push(ctx.random?.D10());
  }

  // playCard(g, ctx, cardId);


  console.log(dice, );
  checkEndOfStage(g, ctx);
};

export const suppress = (g: GameState, ctx: Ctx, cardId: CardId) => {
  playCard(g, ctx, cardId);

  console.log("suppress");
  checkEndOfStage(g, ctx);
};

export const recon = (g: GameState, ctx: Ctx, cardId: CardId) => {
  const team = playerIdToTeam(ctx.playerID);

  let fogCardId = g[team].hand.find((cardId) => {
    return cardMap[cardId].type === "fog_of_war";
  });

  if (!fogCardId) {
    fogCardId = g[team].played.find((cardId) => {
      return cardMap[cardId].type === "fog_of_war";
    });
  }

  if (fogCardId) {
    playCard(g, ctx, cardId);
    killCard(g, team, fogCardId);
    drawCard(g, ctx, team);
  } else {
    console.error(`Could not play recon with card: ${cardId}`);
    return;
  }

  checkEndOfStage(g, ctx);
};

export const control = (g: GameState, ctx: Ctx, cardId: CardId) => {
  const team = playerIdToTeam(ctx.playerID);
  const card = cardMap[cardId];
  const cardMarkerId = cardToMarkerId(card);

  const tile = Object.values(g.tiles).find((tile) =>
    tile?.markers.find((markerId) => markerId === cardMarkerId)
  );

  if (tile && tile.flag) {
    tile.flag.control = team;
    playCard(g, ctx, cardId);
  } else {
    console.error(`control: could not find tile for ${cardId}`);
  }

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
