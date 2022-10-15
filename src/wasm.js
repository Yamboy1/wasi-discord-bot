import { readFile } from "node:fs/promises";
import { WASI } from "wasi";
import { InteractionResponseFlags } from "discord-interactions";

const decoder = new TextDecoder("utf-8", { fatal: true });

export async function loadWasiInstance(path) {
  const wasi = new WASI();

  const memory = new WebAssembly.Memory({ initial: 2 });
  const { instance } = await WebAssembly.instantiate(
    await readFile(new URL(path, import.meta.url)),
    {
      env: { memory },
      wasi_snapshot_preview1: { ...wasi.wasiImport },
    }
  );
  return { instance, memoryHelpers: memoryHelpers(memory) };
}

export function memoryHelpers(memory) {
  const buffer = memory.buffer;

  function readResponse(address) {
    const ephemeral = readBoolean(address, buffer);
    const content = readString(dereference(address + 4), buffer);
    return {
      flags: ephemeral ? InteractionResponseFlags.EPHEMERAL : 0,
      content,
    };
  }

  function dereference(address) {
    const view = new DataView(buffer, address, 4);
    return view.getUint32(0, true);
  }

  function readBoolean(address) {
    const view = new DataView(buffer, address, 1);
    return !!view.getUint8(0);
  }

  function readString(address) {
    const length = wasmStringLength(address, buffer);
    return decoder.decode(new Uint8Array(buffer, address, length));
  }

  function wasmStringLength(address) {
    const view = new DataView(buffer, address);
    let i = 0;
    while (view.getUint8(i) !== 0) ++i;
    return i;
  }

  return { readResponse };
}
