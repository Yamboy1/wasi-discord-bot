import { readResponse, loadWasiInstance } from "./wasm.js";

const { instance, memory } = await loadWasiInstance("../wasm/pong.wasm");

export function pongCommand() {
  return readResponse(instance.exports.command(), memory.buffer);
}
