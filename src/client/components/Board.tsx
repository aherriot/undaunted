import { useState } from "react";
import { BoardProps } from "boardgame.io/react";
// import cardMap from "shared/cardMap";
// import cardTypes from "shared/cardTypes";
import { playerIdToTeam, teamToString } from "shared/utils";
import { Stage, GameState, Team } from "shared/types";

import Cards from "./Cards";
import Marker from "./Marker";
import Actions from "./Actions";

const Board = ({ G, ctx, moves, playerID }: BoardProps<GameState>) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  if (!playerID) {
    return null;
  }

  const team: Team = playerIdToTeam(playerID);
  let stage: Stage = (ctx.activePlayers?.[playerID] as Stage) ?? null;

  const onSelect = (cardId: string) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  const onClickMarker = (markerId: string) => {
    console.log("marker clicked ", markerId);
  };

  if (!stage) {
    <div>waiting for other player</div>;
  }

  let winner = null;
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  const { deck, hand, played, supply, discard, dead } = G[team];

  return (
    <div>
      <h1 className="title">
        {teamToString(playerIdToTeam(playerID))}, Stage: {stage}
      </h1>
      <div>Initiative: {teamToString(playerIdToTeam(G.initiative))}</div>
      {G.markers.map((marker) => (
        <Marker
          key={marker.id}
          marker={marker}
          onClick={() => onClickMarker(marker.id)}
        />
      ))}
      <Cards
        title="Deck"
        cards={deck}
        onSelect={onSelect}
        selectedCard={selectedCard}
      />
      <Cards
        title="Supply"
        cards={supply}
        onSelect={onSelect}
        selectedCard={selectedCard}
      />
      <Cards
        title="Hand"
        cards={hand}
        onSelect={onSelect}
        defaultShow
        selectedCard={selectedCard}
      />
      <Cards
        title="Played"
        cards={played}
        onSelect={onSelect}
        defaultShow
        selectedCard={selectedCard}
      />
      <Cards
        title="Discard"
        cards={discard}
        onSelect={onSelect}
        selectedCard={selectedCard}
      />
      <Cards
        title="Dead"
        cards={dead}
        onSelect={onSelect}
        selectedCard={selectedCard}
      />
      <br />
      <br />
      <Actions
        stage={stage}
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
        moves={moves}
      />
      {winner}
    </div>
  );
};

export default Board;
