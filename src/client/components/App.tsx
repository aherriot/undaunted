import { Client } from "boardgame.io/react";
import { SocketIO } from "boardgame.io/multiplayer";
import { Scenario1 } from "../../shared/Game";

import "./App.scss";
import Board from "./Board";

const App = Client({
  game: Scenario1,
  board: Board,
  multiplayer: SocketIO({ server: "localhost:5001" }),
});

export default App;
