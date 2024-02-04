import { MP3 } from "./MP3.js";

const fnleft = "test/fixtures/input-stereo-left.pcm";
const fnright = "test/fixtures/input-stereo-right.pcm";
const f32left = new Float32Array((await Deno.readFile(fnleft)).buffer);
const f32right = new Float32Array((await Deno.readFile(fnright)).buffer);
const mp3 = await MP3.encode([f32left, f32right]);
await Deno.writeFile("./example-stereo.mp3", mp3);

const mp3mono = await MP3.encode(f32left);
await Deno.writeFile("./example-mono.mp3", mp3);
