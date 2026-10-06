import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const MP4Box = require('mp4box');

const file = 'public/video/kling_scrub_1440p60.mp4';
const buffer = fs.readFileSync(file);
const ab = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
ab.fileStart = 0;

const mp4box = MP4Box.createFile();
const samples = [];
let trak = null;

mp4box.onReady = (info) => {
  const track = info.videoTracks[0];
  trak = track;
  console.log('codec:', track.codec);
  console.log('nb_samples:', track.nb_samples);
  console.log('duration(s):', (track.duration / track.timescale).toFixed(3));
  console.log('timescale:', track.timescale);
  console.log('video size:', track.video.width + 'x' + track.video.height);
  mp4box.setExtractionOptions(track.id, null, { nbSamples: 1000 });
  mp4box.start();
};

mp4box.onSamples = (_id, _user, chunk) => {
  for (const s of chunk) {
    samples.push({ cts: s.cts, dts: s.dts, dur: s.duration, sync: s.is_sync });
  }
};

mp4box.appendBuffer(ab);
mp4box.flush();

samples.sort((a, b) => a.cts - b.cts);
const keyframes = samples.filter((s) => s.sync);
console.log('collected samples:', samples.length);
console.log('keyframes:', keyframes.length);

const gaps = [];
for (let i = 1; i < keyframes.length; i++) gaps.push(keyframes[i].cts - keyframes[i - 1].cts);
const uniqueGaps = [...new Set(gaps)];
console.log('keyframe gaps (cts units):', uniqueGaps.join(','));
console.log('max GOP in frames:', uniqueGaps.length ? Math.max(...uniqueGaps) : 'n/a');

const box = MP4Box.DataStream ? 'DataStream OK' : 'no DataStream';
console.log(box);

// avcC description
const trakBox = mp4box.getTrackById(trak.id);
for (const entry of trakBox.mdia.minf.stbl.stsd.entries) {
  const box = entry.avcC || entry.hvcC || entry.vpcC || entry.av1C;
  if (box) {
    const stream = new MP4Box.DataStream(undefined, 0, MP4Box.DataStream.BIG_ENDIAN);
    box.write(stream);
    console.log('description bytes:', stream.buffer.byteLength);
  } else {
    console.log('no codec config box in stsd entry:', Object.keys(entry));
  }
}
