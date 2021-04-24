import {
  Tile as TileType,
  TileId,
  MarkerId,
  Marker as MarkerType,
} from "shared/types";

import Tile from "./Tile";

interface Props {
  markers: Partial<Record<MarkerId, MarkerType>>;
  tiles: Partial<Record<TileId, TileType>>;
  board: Array<Array<TileId>>;
  selectedTiles: Array<TileId>;
  selectedMarker: MarkerId | null;
  onClickMarker: (markerId: MarkerId) => void;
  onClickTile: (tileId: TileId) => void;
}

const Tiles = ({
  tiles,
  board,
  markers,
  selectedTiles,
  selectedMarker,
  onClickMarker,
  onClickTile,
}: Props) => {
  return (
    <div className="tiles">
      {board.map((tileRow) => {
        return tileRow.map((tileId) => {
          const tileInfo = tiles[tileId];
          if (!tileInfo) {
            return null;
          }
          return (
            <Tile
              key={tileId}
              tile={tileInfo}
              markers={markers}
              selectedMarker={selectedMarker}
              selected={selectedTiles.includes(tileId)}
              onClick={() => onClickTile(tileId)}
              onClickMarker={onClickMarker}
            />
          );
        });
      })}
    </div>
  );
};

export default Tiles;
