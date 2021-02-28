import serve from "koa-static";

import { Server } from "boardgame.io/server";
const { Scenario1 } = require("../shared/Game.ts");

const server = Server({ games: [Scenario1] });

server.app.use(serve("build"));

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5001;
server.run(PORT, () => console.log(`server running on port: ${PORT}`));
