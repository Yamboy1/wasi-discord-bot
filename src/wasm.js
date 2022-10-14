import { readFile } from "node:fs/promises";
import { WASI } from "wasi";

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
  return { instance, memory };
}

export function readResponse(address, buffer) {
  const view = new DataView(buffer, address);
  const ephemeral = view.getUint8(0);
  const content = readString(view.getUint32(4, true), buffer);
  return {
    ephemeral,
    content,
  };
}

function readString(address, buffer) {
  const length = wasmStringLength(address, buffer);
  return decoder.decode(new Uint8Array(buffer, address, length));
}

function wasmStringLength(allocated, buffer) {
  const view = new DataView(buffer, allocated);
  let i = 0;
  while (view.getUint8(i) !== 0) ++i;
  return i;
}
