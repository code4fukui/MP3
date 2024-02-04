# MP3.js

MP3.js is a mp3 encoder ES module for web and Deno by JavaScript and WebAssembly forked from [lame-wasm](https://github.com/vincentcr/lame-wasm)

## demo

- https://code4fukui.github.io/MP3/

## usage

```js
import { MP3 } from "https://code4fukui.github.io/MP3/MP3.js";

const mp3bin = await MP3.encode([f32pcmLeft, f32pcmRight], {
  vbrQuality: 5, // 0-9 default 5
  sampleRate: 44100, // default 44100
  debug: false, // boolean
});
```

## dependencies

- forked from [lame-wasm](https://github.com/vincentcr/lame-wasm)
- build with [bin2js.js](https://github.com/code4fukui/bin2js/)

## build

```sh
deno run -A https://code4fukui.github.io/bin2js/bin2js.js src/lame_native.wasm
```
