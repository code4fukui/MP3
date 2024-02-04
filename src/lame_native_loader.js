/*
export type Ptr = number;
type WasmContextBase<T> = {
  HEAP8: Int8Array;
  HEAP16: Int16Array;
  HEAP32: Int32Array;
  HEAPU8: Uint8Array;
  HEAPU16: Uint16Array;
  HEAPU32: Uint32Array;
  HEAPF32: Float32Array;
  HEAPF64: Float64Array;
} & T;

interface WasmFunctions {
  // eslint-disable-next-line @typescript-eslint/camelcase
  _lamejs_init(sampleRate: number, stereo: boolean, vbrQuality: number): Ptr;
  // eslint-disable-next-line @typescript-eslint/camelcase
  _lamejs_encode(structPtr: Ptr, numSamples: number): number;
  // eslint-disable-next-line @typescript-eslint/camelcase
  _lamejs_flush(structPtr: Ptr): number;
  // eslint-disable-next-line @typescript-eslint/camelcase
  _lamejs_tag_frame(structPtr: Ptr): number;
  // eslint-disable-next-line @typescript-eslint/camelcase
  _lamejs_free(structPtr: Ptr): number;
  // eslint-disable-next-line @typescript-eslint/camelcase
  _lamejs_print_debug_info(structPtr: Ptr): void;
  // eslint-disable-next-line @typescript-eslint/camelcase
  _lamejs_max_encode_samples(): number;
}

export type WasmContext = WasmContextBase<WasmFunctions>;

type WasmLoader<T> = (
  opts?: any
) => {
  then: (resolve: (ctx: WasmContext & { then: () => void }) => void) => void;
};
*/
//const generatedLoader = require("./lame_native.js"); // as WasmLoader<WasmContext>;
import generatedLoader from "./lame_native.js";
//console.log(generatedLoader)

export async function loadWasm(wasmBinary) { // ?: ArrayBuffer): Promise<WasmContext> {
  /*
  const env = {
    memory: new WebAssembly.Memory(),
  };
  const asm2wasmImports = null;
  const importObject = {
    "env":env,
    "global": {
        "NaN": NaN,
        Infinity: Infinity
    },
    "global.Math": Math,
    "asm2wasm":asm2wasmImports,
  }
  console.log(wasmBinary);
  const wasm = await WebAssembly.instantiate(wasmBinary, importObject);

  //memory = wasm.instance.exports.memory as WebAssembly.Memory;
  console.log(wasm);
  return wasm;
  */
  return new Promise(resolve => {
    generatedLoader({ wasmBinary }).then(ctxWithThen => {
      // when the "then" is passed along in the results,
      // it confuses the Promise API and the returned promise never resolves;
      // so we strip it out of the resolved object.
      const { then, ...ctx } = ctxWithThen;
      resolve(ctx);
    });
  });
}
