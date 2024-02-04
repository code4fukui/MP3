import { promises as fs } from "node:fs";
import { Lame } from "../src/lame.js";

/*
const fs = {
  readFile: async (fn) => Deno.readFile(fn),
  open: async (fn, opt) => Deno.open(fn, { read: true, write: opt == "w" }),
};
*/

//const TEST_DATA_DIR = __dirname + "../test/fixtures";
const TEST_DATA_DIR = "./test/fixtures";
const LEFT_FNAME = TEST_DATA_DIR + "/input-stereo-left.pcm";
const RIGHT_FNAME = TEST_DATA_DIR + "/input-stereo-right.pcm";
const OUT_FILE = TEST_DATA_DIR + "/sample-out-js.mp3";

async function main() {
  console.time("main");
  console.time("Lame.load()");

  const lame = await Lame.load({
    //wasmBinary: new Uint8Array(await Deno.readFile("./src/lame_native.wasm")),
    vbrQuality: 3,
    debug: true
  });
  console.timeEnd("Lame.load()");

  console.time("read data");
  const pcmLeftBuf = await fs.readFile(LEFT_FNAME);
  const pcmRightBuf = await fs.readFile(RIGHT_FNAME);
  console.timeEnd("read data");
  console.time("create input array");
  const pcmLeft = new Float32Array(pcmLeftBuf.buffer);
  const pcmRight = new Float32Array(pcmRightBuf.buffer);
  console.timeEnd("create input array");
  try {
    //await fs.unlink(OUT_FILE);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
  const outputFile = await fs.open(OUT_FILE, "w");

  let writeElapsed = 0;
  for (const buf of lame.encode(pcmLeft, pcmRight)) {
    const started = Date.now();
    await outputFile.write(buf);
    writeElapsed += Date.now() - started;
  }

  console.log("write file", { writeElapsed });

  await outputFile.close();

  console.timeEnd("main");
}

main()
  .then(() => {
    console.log("done, bye");
    Deno.exit(0);
  })
  .catch(err => {
    console.error("fatal error", err);
    Deno.exit(1);
  });
