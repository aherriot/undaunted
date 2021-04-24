import { useState } from "react";
import { BoardProps } from "boardgame.io/react";
import { playerIdToTeam, teamToString } from "shared/utils";
import {
  Stage,
  GameState,
  Team,
  CardId,
  TileId,
  MarkerId,
  PlayerId,
  CardActionType,
} from "shared/types";

import Cards from "./Cards";
import Tiles from "./Tiles";
import Actions from "./PickAction";
import PerformAction from "./PerformAction";

const Board = ({ G: g, ctx, moves, playerID }: BoardProps<GameState>) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [selectedAction, setSelectedAction] = useState<CardActionType | null>(
    null
  );
  const [selectedTiles, setSelectedTiles] = useState<Array<TileId>>([]);
  const [selectedMarker, setSelectedMarker] = useState<MarkerId | null>(null);

  if (!playerID) {
    return null;
  }
  const playerId = playerID as PlayerId;

  const team: Team = playerIdToTeam(playerID);
  let stage: Stage = (ctx.activePlayers?.[playerID] as Stage) ?? null;

  const onSelectCard = (cardId: CardId) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  const onClickMarker = (markerId: MarkerId) => {
    if (selectedMarker === markerId) {
      setSelectedMarker(null);
    } else {
      setSelectedMarker(markerId);
    }
  };

  const onClickTile = (tileId: TileId) => {
    if (selectedTiles.find((tile) => tile === tileId)) {
      setSelectedTiles(selectedTiles.filter((tile) => tile !== tileId));
    } else {
      setSelectedTiles([...selectedTiles, tileId]);
    }
    console.log("tile Clicked", tileId);
  };

  const onConfirmAction = () => {
    if (!selectedAction) {
      return;
    }
    moves[selectedAction](selectedCard);
    setSelectedCard(null);
    setSelectedAction(null);
  };

  const onCancelAction = () => {
    setSelectedAction(null);
  };

  const { deck, hand, played, supply, discard, dead } = g[team];

  return (
    <div className="board">
      <h1 className="title">
        {teamToString(playerIdToTeam(playerID))}, Stage: {stage}
      </h1>
      <div>Initiative: {teamToString(playerIdToTeam(g.initiative))}</div>

      <Tiles
        markers={g.markers}
        board={g.board}
        tiles={g.tiles}
        onClickMarker={onClickMarker}
        onClickTile={onClickTile}
        selectedTiles={selectedTiles}
        selectedMarker={selectedMarker}
      />
      <Cards
        title="Deck"
        cards={deck}
        onSelect={onSelectCard}
        selectedCard={selectedCard}
      />
      <Cards
        title="Supply"
        cards={supply}
        onSelect={onSelectCard}
        selectedCard={selectedCard}
      />
      <Cards
        title="Hand"
        cards={hand}
        onSelect={onSelectCard}
        defaultShow
        selectedCard={selectedCard}
      />
      <Cards
        title="Played"
        cards={played}
        onSelect={onSelectCard}
        defaultShow
        selectedCard={selectedCard}
      />
      <Cards
        title="Discard"
        cards={discard}
        onSelect={onSelectCard}
        selectedCard={selectedCard}
      />
      <Cards
        title="Dead"
        cards={dead}
        onSelect={onSelectCard}
        selectedCard={selectedCard}
      />
      <br />
      {!selectedAction && (
        <Actions
          stage={stage}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          moves={moves}
          g={g}
          ctx={ctx}
          playerId={playerId}
        />
      )}
      {stage === "order" && (
        <PerformAction
          selectedAction={selectedAction}
          setSelectedCard={setSelectedCard}
          selectedCard={selectedCard}
          setSelectedAction={setSelectedAction}
          selectedMarker={selectedMarker}
          selectedTiles={selectedTiles}
          moves={moves}
          g={g}
          ctx={ctx}
          playerId={playerId}
        />
      )}
    </div>
  );
};

export default Board;
