import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const MP4Box = require('mp4box');

const buffer = fs.readFileSync('public/video/kling_scrub_1440p60.mp4');
const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
ab.fileStart = 0;

const f = MP4Box.createFile();
const raw = [];
let t = null;
f.onReady = (info) => {
  t = info.videoTracks[0];
  f.setExtractionOptions(t.id, null, { nbSamples: 100000 });
  f.start();
};
f.onSamples = (_id, _u, samples) => {
  for (const s of samples) {
    raw.push({ cts: s.cts, dts: s.dts, dur: s.duration, sync: !!s.is_sync, type: s.is_sync ? 'key' : 'delta' });
  }
};
f.appendBuffer(ab);
f.flush();

console.log('codec:', t.codec, '| timescale:', t.timescale, '| nb_samples:', t.nb_samples);
console.log('monotonic cts (decode==presentation order):', raw.every((s, i) => i === 0 || s.cts > raw[i - 1].cts));
console.log('monotonic dts:', raw.every((s, i) => i === 0 || s.dts >= raw[i - 1].dts));

const syncs = raw.map((s, i) => (s.sync ? i : -1)).filter((i) => i >= 0);
console.log('keyframes:', syncs.length, 'of', raw.length);
const gaps = syncs.slice(1).map((v, i) => v - syncs[i]);
console.log('max GOP frames:', Math.max(...gaps), '| first keyframe index:', syncs[0]);
const dur = raw.reduce((a, s) => a + s.dur, 0) / t.timescale;
console.log('total duration(s):', dur.toFixed(3), '| frame interval(s):', (raw[0].dur / t.timescale).toFixed(5));

const entry = f.getTrackById(t.id).mdia.minf.stbl.stsd.entries[0];
console.log('avcC nb_SPS_nalus:', entry.avcC.nb_SPS_nalus, '| nb_PPS_nalus:', entry.avcC.nb_PPS_nalus);
const ds = new MP4Box.DataStream(undefined, 0, MP4Box.DataStream.BIG_ENDIAN);
entry.avcC.write(ds);
const full = new Uint8Array(ds.buffer);
console.log('box bytes:', full.length, '| hdr_size:', entry.avcC.hdr_size, '| record bytes:', full.length - entry.avcC.hdr_size);
console.log('avcC has B-frames (num_reorder):', JSON.stringify(entry.avcC.ext ?? null));
