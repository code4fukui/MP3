import { MP3 } from "./MP3.js";

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
await Deno.writeFile("example2-mono.mp3", mp3bin);
