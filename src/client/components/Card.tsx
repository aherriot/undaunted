import classnames from "classnames";
import cardTypes from "shared/cardTypes";
import actionMap from "shared/actionMap";
import { teamToString } from "shared/utils";
import { Card as CardType } from "shared/types";

interface Props {
  card: CardType;
  selected: boolean;
  onSelect: () => void;
}

const Card = ({ card, onSelect, selected }: Props) => {
  const typeInfo = cardTypes[card.type];
  console.log(typeInfo);
  return (
    <div
      className={classnames([
        "card",
        teamToString(card.team),
        { selected: selected },
      ])}
      onClick={onSelect}
    >
      <div className="img"></div>
      <div className="cardId">{card.id}</div>
      <div className="initiative">{typeInfo.initiative}</div>
      <div className="name">{card.name}</div>
      <div className="type">
        {card.squad && (
          <span className="squad">{card.squad?.toUpperCase()}</span>
        )}
        <span className="type-label">{typeInfo.label}</span>
      </div>
      <div className="actions">
        {typeInfo.actions.map(({ type, amount }) => (
          <div
            className="action"
            key={type}
            title={actionMap[type].description(amount)}
          >
            {type}
            {amount ? `(${amount})` : ""}
          </div>
        ))}
        {typeInfo.actions.length % 2 === 1 && <div className="action" />}
      </div>
    </div>
  );
};

export default Card;
