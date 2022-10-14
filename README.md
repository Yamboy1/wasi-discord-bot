# WASI Discord Bot

## Intro

This is a very much WIP discord bot that runs Discord Interactions via WASI functions.

For example, for a bot that replies to a Slash Command with "Pong!", you'd write this C code

```c
#include <stdbool.h>
#include "discord.h"

__attribute__((export_name("command")))
struct interaction_response* command() {
    return interaction_response_init(false, "Pong!");
};
```

and compile it with something along the lines of this

```
$ clang -nostartfiles -flto -Wl,--no-entry,--export-dynamic,--import-memory,--lto-O3 --target=wasm32-wasi --sysroot=/opt/wasi-sdk/share/wasi-sysroot -Oz wasm/src/pong.c wasm/src/discord.c -o wasm/pong.wasm
```

## Usage

To run the web server, set the DISCORD_PUBLIC_KEY environment variable to your public key, and run index.js using node with the unstable WASI flag enabled. It is assumed that you know how discord interactions web servers work.

```bash
$ export DISCORD_PUBLIC_KEY=1234567890abcdef
$ node --experimental-wasi-unstable-preview1 src/index.js
```

(c) Yamboy1 2022
