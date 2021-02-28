import { useState } from "react";
import cardMap from "shared/cardMap";

import Card from "./Card";

interface Props {
  title: string;
  cards: Array<string>;
  defaultShow?: boolean;
  selectedCard: string | null;
  onSelect: (cardId: string) => void;
}

const Cards = ({
  title,
  cards,
  selectedCard,
  onSelect,
  defaultShow = false,
}: Props) => {
  const [showCards, setShowCards] = useState<boolean>(defaultShow);

  return (
    <div>
      {!showCards && (
        <div>
          <button onClick={() => setShowCards(true)}>
            Show {title} ({cards.length})
          </button>
          {JSON.stringify(cards)}
        </div>
      )}
      {showCards && (
        <>
          <button onClick={() => setShowCards(false)}>
            Hide {title} ({cards.length})
          </button>
          {cards.length === 0 && <div>no {title} to show</div>}
          <div className="cards">
            {cards.map((cardId) => {
              return (
                <Card
                  key={cardId}
                  card={cardMap[cardId]}
                  onSelect={() => onSelect(cardId)}
                  selected={selectedCard === cardId}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;
