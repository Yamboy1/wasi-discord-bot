import express from "express";
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from "discord-interactions";

import { pongCommand } from "./pong.js";

const app = express();
const port = 3000;

if (process.env.DISCORD_PUBLIC_KEY != undefined) {
  app.post(
    "/interactions",
    verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY),
    async (req, res) => {
      const message = req.body;
      if (message.type === InteractionType.APPLICATION_COMMAND) {
        res.send(await pongCommand());
      }
    }
  );
} else {
  console.warn(
    "DISCORD_PUBLIC_KEY environment variable not found, running local dev server."
  );
  app.get("/", async (req, res) => {
    res.send(await pongCommand());
  });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});
