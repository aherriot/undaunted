import { useState } from "react";
import cardMap from "shared/cardMap";
import cardTypes from "shared/cardTypes";
import {
  Stage,
  CardId,
  GameState,
  PlayerId,
  CardActionType,
} from "shared/types";
import available from "shared/available";
import { Ctx } from "boardgame.io";

interface Props {
  selectedCard: CardId | null;
  setSelectedCard: (selectedCard: CardId | null) => void;
  selectedAction: CardActionType | null;
  setSelectedAction: (selectedAction: CardActionType) => void;
  stage: Stage;
  moves: Record<string, any>;
  g: GameState;
  ctx: Ctx;
  playerId: PlayerId;
}

const PickAction = ({
  stage,
  selectedCard,
  setSelectedCard,
  setSelectedAction,
  moves,
  g,
  ctx,
  playerId,
}: Props) => {
  if (stage === "initiative") {
    return (
      <div className="actions">
        <button
          disabled={!selectedCard}
          onClick={() => {
            moves.selectInitiative(selectedCard);
            setSelectedCard(null);
          }}
        >
          Select Card
        </button>
      </div>
    );
  } else if (stage === "order") {
    if (selectedCard) {
      const card = cardMap[selectedCard];
      const cardInfo = cardTypes[card.type];

      return (
        <div className="actions">
          {cardInfo.actions.map(({ type }) => (
            <button
              disabled={!available[type](g, ctx, playerId, card.id)}
              key={type}
              onClick={() => {
                setSelectedAction(type);
              }}
            >
              {type}
            </button>
          ))}
          <button
            onClick={() => {
              setSelectedAction("discard");
            }}
          >
            discard
          </button>
        </div>
      );
    } else {
      return <div>Please select a card</div>;
    }
  } else {
    return <div>Not your turn</div>;
  }
};

export default PickAction;
