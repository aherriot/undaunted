// import cardTypes from "shared/cardTypes";
// import actionMap from "shared/actionMap";
import { Marker as MarkerType } from "shared/types";

interface Props {
  marker: MarkerType;
  onClick: () => void;
}

const Marker = ({ marker, onClick }: Props) => {
  return <div onClick={onClick}>Marker: {marker.id}</div>;
};

export default Marker;
