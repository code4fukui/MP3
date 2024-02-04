import { Lame } from "./src/lame.js";

export class MP3 {
  static async encode(f32pcm, vbrQuality = 3) {
    const stereo = Array.isArray(f32pcm) && f32pcm.length == 2;
    const f32left = Array.isArray(f32pcm) ? f32pcm[0] : f32pcm;
    const f32right = stereo ? f32pcm[1] : undefined;
    const lame = await Lame.load({
      vbrQuality,
      stereo,
      //debug: true
    });
    const bufs = [];
    let len = 0;
    if (stereo) {
      for (const buf of lame.encode(f32left, f32right)) {
        bufs.push(buf);
        len += buf.length;
      }
    } else {
      for (const buf of lame.encode(f32left)) {
        bufs.push(buf);
        len += buf.length;
      }
    }
    const res = new Uint8Array(len);
    let idx = 0;
    bufs.forEach(i => {
      for (let j = 0; j < i.length; j++) {
        res[idx++] = i[j];
      }
    });
    return res;
  }
};
