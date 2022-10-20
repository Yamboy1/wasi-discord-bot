import express from "express";
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from "discord-interactions";

import { pongCommand } from "./pong.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post(
  "/interactions",
  verifyKeyMiddleware(process.env.DISCORD_PUBLIC_KEY),
  async (req, res) => {
    const message = req.body;
    if (message.type === InteractionType.APPLICATION_COMMAND) {
      let a;
      res.send(await pongCommand());
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
});
