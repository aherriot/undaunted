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
      markers: [
        { id: "ara", tile: "1a" },
        { id: "asa", tile: "1a" },
        { id: "gra", tile: "2b" },
        { id: "gsb", tile: "2b" },
      ],
      flags: [],
      [Team.American]: {
        selectedInitiative: null,
        supply: ["af3", "af4"],
        deck: [
          "ara1",
          "ara2",
          "ara3",
          "asa1",
          "asa2",
          "asa3",
          "asla",
          "af1",
          "af2",
          "af5",
          "af6",
        ],
        hand: [],
        played: [],
        discard: [],
        dead: [],
      },
      [Team.German]: {
        selectedInitiative: null,
        supply: ["gf3", "gf4"],
        deck: ["gra1", "gra2", "gra3", "gf1", "gsb1", "gsb2", "gsla", "gslb"],
        hand: [],
        played: [],
        discard: [],
        dead: [],
      },
      board: [["1a", "2b"]],
      tiles: {},
    };
  },

  turn: {
    onBegin: (g, ctx) => {
      console.log("turn: onBegin");
      g[Team.German].selectedInitiative = null;
      g[Team.American].selectedInitiative = null;

      for (let i = 0; i < 4; i++) {
        drawCard(g, ctx, Team.German);
        drawCard(g, ctx, Team.American);
      }
      ctx.events?.setActivePlayers?.({ all: "initiative" });
    },
    onEnd: (g: GameState, ctx: Ctx) => {
      console.log("turn: onEnd");
    },
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
