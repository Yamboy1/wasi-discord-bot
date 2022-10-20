# WASI Discord Bot

## Intro

This is a very much WIP discord bot that runs Discord Interactions via CGI/WAGI inspired WebAssembly code

For example, for a bot that replies to a Slash Command with "Pong!", you'd write following rust code

```rs
fn main() {
    println!("Type: Channel-Message");
    println!();
    println!("Pong!");
}
```

## Usage

To run the web server, set the DISCORD_PUBLIC_KEY environment variable to your public key, and run index.js using node with the unstable WASI flag enabled. This early in the project, if you would like the use this bot, it is assumed that you know how discord interactions web servers work.

```bash
$ export DISCORD_PUBLIC_KEY=1234567890abcdef
$ node --experimental-wasi-unstable-preview1 src/index.js
```

(c) Yamboy1 2022
