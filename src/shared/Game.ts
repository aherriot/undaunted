import { Game, Ctx } from "boardgame.io";

import {
  selectInitiative,
  bolster,
  discard,
  scout,
  move,
  conceal,
  attack,
  suppress,
  recon,
  control,
  command,
  inspire,
  blast,
  target,
  stalk,
  guide,
} from "./moves";
import { GameState, Team } from "./types";

import { drawCard } from "./utils";

export const Scenario1: Game<GameState> = {
  setup: (ctx: Ctx): GameState => {
    ctx.events?.setActivePlayers?.({ all: "initiative" });
    return {
      initiative: Team.American,
      markers: {
        ara: { id: "ara", tileId: "1a", suppressed: false },
        asa: { id: "asa", tileId: "1a", suppressed: false },
        gra: { id: "gra", tileId: "2b", suppressed: false },
        gsb: { id: "gsb", tileId: "2b", suppressed: false },
      },
      [Team.American]: {
        selectedInitiative: null,
        supply: ["af3", "af4"],
        deck: ["ara1", "ara2", "ara3", "asa1", "asa2", "asa3", "af1", "af2"],
        hand: [],
        played: [],
        discard: [],
        dead: [],
      },
      [Team.German]: {
        selectedInitiative: null,
        supply: ["gf3", "gf4"],
        deck: ["gra1", "gra2", "gra3", "gsb1"],
        hand: [],
        played: [],
        discard: [],
        dead: [],
      },
      board: [["1a", "1b"]],
      tiles: {
        "1a": {
          id: "1a",
          scouted: {
            [Team.German]: false,
            [Team.American]: true,
          },
          markers: ["ara", "asa"],
          defense: 2,
          flag: { amount: 2, control: null },
        },
        "1b": {
          id: "1b",
          scouted: {
            [Team.German]: true,
            [Team.American]: false,
          },
          markers: ["gra", "gsb"],
          defense: 2,
        },
      },
    };
  },
  validateSetupData: (
    setupData: GameState,
    numberPlayers: number
  ): string | undefined => {
    return undefined;
  },

  turn: {
    onBegin: (g, ctx) => {
      g[Team.German].selectedInitiative = null;
      g[Team.American].selectedInitiative = null;

      for (let i = 0; i < 4; i++) {
        drawCard(g, ctx, Team.German);
        drawCard(g, ctx, Team.American);
      }
      ctx.events?.setActivePlayers?.({ all: "initiative" });
    },
    onEnd: (g: GameState, ctx: Ctx) => {},
    stages: {
      initiative: {
        moves: {
          selectInitiative,
        },
      },
      order: {
        moves: {
          bolster,
          discard,
          scout,
          move,
          conceal,
          attack,
          suppress,
          recon,
          control,
          command,
          inspire,
          blast,
          target,
          stalk,
          guide,
        },
      },
    },
  },

  endIf: (g: GameState, ctx: Ctx) => {
    return false;
  },
};
