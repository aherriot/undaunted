import { MarkerId, MarkerInfo, Team } from "./types";

const markerMap: Record<MarkerId, MarkerInfo> = {
  ara: { type: "rifleman", team: Team.American, squad: "a" },
  arb: { type: "rifleman", team: Team.American, squad: "b" },
  arc: { type: "rifleman", team: Team.American, squad: "c" },
  asa: { type: "scout", team: Team.American, squad: "a" },
  asb: { type: "scout", team: Team.American, squad: "b" },
  asc: { type: "scout", team: Team.American, squad: "c" },
  aga: { type: "gunner", team: Team.American, squad: "a" },
  agb: { type: "gunner", team: Team.American, squad: "b" },
  agc: { type: "gunner", team: Team.American, squad: "c" },
  as: { type: "sniper", team: Team.American },
  am: { type: "mortar", team: Team.American },
  gra: { type: "rifleman", team: Team.German, squad: "a" },
  grb: { type: "rifleman", team: Team.German, squad: "a" },
  grc: { type: "rifleman", team: Team.German, squad: "a" },
  gsa: { type: "scout", team: Team.German, squad: "a" },
  gsb: { type: "scout", team: Team.German, squad: "a" },
  gsc: { type: "scout", team: Team.German, squad: "a" },
  gga: { type: "gunner", team: Team.German, squad: "a" },
  ggb: { type: "gunner", team: Team.German, squad: "a" },
  ggc: { type: "gunner", team: Team.German, squad: "a" },
  gs: { type: "sniper", team: Team.German },
  gm: { type: "mortar", team: Team.German },
};

export default markerMap;
