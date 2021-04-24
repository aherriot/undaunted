import classnames from "classnames";
import markerMap from "shared/markerMap";
import cardTypes from "shared/cardTypes";
import { Marker as MarkerType, Squad, Team } from "shared/types";

interface Props {
  marker: MarkerType;
  selected: boolean;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Marker = ({ marker, selected, onClick }: Props) => {
  const { squad, type, team } = markerMap[marker.id];
  const { defense } = cardTypes[type];
  const teamClass = team === Team.German ? "german" : "american";
  return (
    <div
      className={classnames("marker", teamClass, { selected })}
      onClick={onClick}
    >
      <div className="type">{type}</div>
      {squad && <div className="squad">{squad}</div>}
      {defense && <div className="defense">{defense}</div>}
    </div>
  );
};

export default Marker;
