# MP3.js

MP3.js is a mp3 encoder ES module for web and Deno by JavaScript and WebAssembly forked from [lame-wasm](https://github.com/vincentcr/lame-wasm)

## demo

- https://code4fukui.github.io/MP3/

## usage

```js
import { MP3 } from "https://code4fukui.github.io/MP3/MP3.js";

const freq = 440;
const sampleRate = 44100;
const sec = 5;
const len = (sec * sampleRate) >> 0;
const vol = 0.5;

const buf = new Float32Array(len);
for (let i = 0; i < len; i++) {
  const th = (i * freq / sampleRate) * (2 * Math.PI);
  buf[i] = Math.sin(th) * vol;
}

const mp3bin = await MP3.encode([buf], {
  vbrQuality: 5, // 0-9 default 5
  sampleRate, // default 44100
  debug: true, // boolean
});
console.log(mp3bin, mp3bin.length);
```

## dependencies

- forked from [lame-wasm](https://github.com/vincentcr/lame-wasm)
- build with [bin2js.js](https://github.com/code4fukui/bin2js/)

## build

```sh
deno run -A https://code4fukui.github.io/bin2js/bin2js.js src/lame_native.wasm
```
