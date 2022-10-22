import { readFile, open, rm } from "node:fs/promises";
import { WASI } from "wasi";

export const wasi = new WASI();

export async function startWasiInstance(path: string, tempPath: string) {
  const tempUrl = new URL(tempPath, import.meta.url);
  let file = await open(tempUrl, "w");
  const wasi = new WASI({
    stdout: file.fd,
    returnOnExit: true,
  });
  const memory = new WebAssembly.Memory({ initial: 2 });
  const { instance } = await WebAssembly.instantiate(
    await readFile(new URL(path, import.meta.url)),
    {
      env: { memory },
      wasi_snapshot_preview1: { ...wasi.wasiImport },
    }
  );
  wasi.start(instance);
  await file.close();
  file = await open(tempUrl, "r");
  const content = await file.readFile("utf-8");

  await file.close();
  await rm(tempUrl);
  return content;
}
