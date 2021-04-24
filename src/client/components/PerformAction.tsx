import { useState } from "react";
import cardMap from "shared/cardMap";
import cardTypes from "shared/cardTypes";
import {
  Stage,
  CardId,
  GameState,
  PlayerId,
  CardActionType,
  MarkerId,
  TileId,
} from "shared/types";
import available from "shared/available";
import { Ctx } from "boardgame.io";

interface Props {
  selectedCard: CardId | null;
  setSelectedCard: (selectedCard: CardId | null) => void;
  selectedAction: CardActionType | null;
  setSelectedAction: (selectedAction: CardActionType | null) => void;
  selectedMarker: MarkerId | null;
  selectedTiles: Array<TileId> | null;
  moves: Record<string, any>;
  g: GameState;
  ctx: Ctx;
  playerId: PlayerId;
}

const PerformAction = ({
  selectedCard,
  setSelectedAction,
  selectedAction,
  selectedMarker,
  selectedTiles,
  moves,
}: Props) => {
  let instructions;

  const moveData = { cardId: selectedCard, selectedMarker, selectedTiles };

  let ready = false;

  switch (selectedAction) {
    case "scout":
      // select up to n tiles in order to move
      // mark tiles as scouted
      // add fog cards to discard pile
      if (!selectedMarker) {
        instructions = "select up to n tiles in order to move";
      } else {
        instructions = "Confirm action";
      }
      break;
    case "move":
      // select up to n tiles in order to move
      // must be scouted
      instructions = "select up to n scouted tiles in order to move";
      break;
    case "attack":
      // select enemy marker
      // role dice based on defense
      // remove enemy card
      if (selectedMarker) {
        instructions = "Confirm to Attack.";
        ready = true;
      } else {
        instructions = "select enemy marker to attack";
      }
      break;
    case "recon":
      // discard fog and draw another
      instructions =
        "This action will discard a fog of war card and draw another card from your deck.";
      break;
    case "conceal":
      instructions =
        // add enemy fog to enemy discard
        "This action will add a fog of war card to your opponents discard pile.";
      break;
    case "control":
      // control current tile
      //  only if no enemies exist
      instructions = "Take control of the flag on this tile.";
      break;
    case "suppress":
      // select enemy marker
      // must not already be suppressed
      // role dice based on defense
      // remove enemy card
      instructions = "select enemy marker to suppress them";
      break;
    case "bolster":
      // select up to n cards from supply
      // add to discard pile
      instructions =
        "select up to n cards from your supply and add them to your discard.";
      break;
    case "inspire":
      // play a "played" card again.
      // must belong to same squad
      instructions = "Play a card again.";
      break;
    case "blast":
      // select a tile
      // hit all targets on tile
      instructions = "Attack all units on the targetted tile with mortars.";
      break;
    case "target":
      // move mortar target to selected tile
      instructions = "Select a tile for the mortar to aim at.";
      break;
    case "stalk":
      instructions =
        // select up to n tiles in order to move
        "Select an adjacent tile to move to. It does not have to be scouted.";
      break;
    case "guide":
      // select a marker
      // select tile to move marker
      instructions = "Select a marker and a tile to move it to";
      break;
    case "command":
      instructions = "Draw n additional cards from deck to hand.";
      break;
    case "discard":
      // move card from hand to played pile
      instructions = "Skip playing this card and discard it instead.";
      break;
  }
  if (selectedAction && selectedCard) {
    return (
      <div>
        <h2>{selectedAction}</h2>
        <p>{instructions}</p>
        <button
          onClick={() => moves[selectedAction](moveData)}
          disabled={!ready}
        >
          Confirm
        </button>
        <button onClick={() => setSelectedAction(null)}>Cancel</button>
      </div>
    );
  }
  return null;
};

export default PerformAction;
