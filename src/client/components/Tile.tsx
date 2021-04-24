import classnames from "classnames";

import {
  Team,
  Tile as TileType,
  MarkerId,
  Marker as MarkerType,
} from "shared/types";
import { teamToString, playerIdToTeam } from "shared/utils";
import Marker from "./Marker";

interface Props {
  markers: Partial<Record<MarkerId, MarkerType>>;
  tile: TileType;
  selectedMarker: MarkerId | null;
  selected: boolean;
  onClick: () => void;
  onClickMarker: (markerId: MarkerId) => void;
}

const Tile = ({
  tile,
  markers,
  selected,
  selectedMarker,
  onClick,
  onClickMarker,
}: Props) => {
  return (
    <div className={classnames("tile", { selected })} onClick={onClick}>
      {tile.id}

      <div className="defense">{tile.defense}</div>
      {tile.flag && (
        <>
          <div className={`flag ${teamToString(tile?.flag.control)}`}>
            {tile.flag?.amount}
          </div>
        </>
      )}
      {tile.scouted[Team.German] && (
        <div className="scouted german">German Scouted</div>
      )}

      {tile.scouted[Team.American] && (
        <div className="scouted american">American Scouted</div>
      )}

      {tile.markers.map((markerId) => {
        const marker = markers[markerId];
        if (!marker) {
          return null;
        }
        return (
          <Marker
            key={markerId}
            marker={marker}
            selected={selectedMarker === markerId}
            onClick={(e) => {
              e.stopPropagation();
              onClickMarker(markerId);
            }}
          />
        );
      })}
    </div>
  );
};

export default Tile;
