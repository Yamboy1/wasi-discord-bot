import { startWasiInstance } from "./wasm.js";
import { parseContent } from "./discord.js";

export async function pongCommand() {
  const content = await startWasiInstance("./wasm/pong.wasm", "../test.txt");
  return parseContent(content);
}
