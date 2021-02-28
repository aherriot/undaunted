import classnames from "classnames";
import actionMap from "shared/actionMap";
import cardMap from "shared/cardMap";
import cardTypes from "shared/cardTypes";
import { Stage, CardId } from "shared/types";

interface Props {
  selectedCard: CardId | null;
  setSelectedCard: (selectedCard: CardId | null) => void;
  stage: Stage;
  moves: Record<string, any>;
}

const Card = ({ stage, selectedCard, setSelectedCard, moves }: Props) => {
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
              key={type}
              onClick={() => {
                moves[type](selectedCard);
                setSelectedCard(null);
              }}
            >
              {type}
            </button>
          ))}
          <button
            onClick={() => {
              moves.discard(selectedCard);
              setSelectedCard(null);
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

export default Card;
