import { loadWasiInstance } from "./wasm.js";

const {
  instance,
  memoryHelpers: { readResponse },
} = await loadWasiInstance("../wasm/pong.wasm");

export function pongCommand() {
  return readResponse(instance.exports.command());
}
