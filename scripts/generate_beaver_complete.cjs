const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');

const workspaceRoot = path.resolve(__dirname, '..');
const ffmpeg = require(path.join(workspaceRoot, 'node_modules', 'ffmpeg-static'));
const beaverDir = path.join(workspaceRoot, 'public', 'images', 'beavers');
const framesDir = path.join(workspaceRoot, 'public', 'VideoFrames');
const videoDir = path.join(workspaceRoot, 'public', 'video');
const backupFramesDir = path.join(workspaceRoot, 'public', 'VideoFrames_fish_backup');

const b1 = path.join(beaverDir, 'beaver_family_1.jpg').replace(/\\/g, '/');
const b2 = path.join(beaverDir, 'beaver_family_2.jpg').replace(/\\/g, '/');
const b3 = path.join(beaverDir, 'beaver_family_3.jpg').replace(/\\/g, '/');

function readRaw(filePath) {
  return new Promise((resolve, reject) => {
    const ff = spawn(ffmpeg, ['-i', filePath, '-f', 'rawvideo', '-pix_fmt', 'rgba', 'pipe:1']);
    const chunks = [];
    ff.stdout.on('data', c => chunks.push(c));
    ff.stderr.on('data', () => {});
    ff.on('close', code => {
      if (code === 0) resolve(Buffer.concat(chunks));
      else reject(new Error(`Failed to read ${filePath}`));
    });
  });
}

function writeRaw(buf, outFile) {
  return new Promise((resolve, reject) => {
    const ff = spawn(ffmpeg, ['-y', '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', '1920x1080', '-i', 'pipe:0', '-q:v', '2', outFile]);
    ff.stdin.write(buf);
    ff.stdin.end();
    ff.stderr.on('data', () => {});
    ff.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`Failed to write ${outFile}`));
    });
  });
}

function blendBuffers(bufA, bufB, t) {
  const out = Buffer.alloc(bufA.length);
  const invT = 1 - t;
  for (let i = 0; i < bufA.length; i += 4) {
    out[i] = Math.round(bufA[i] * invT + bufB[i] * t);
    out[i + 1] = Math.round(bufA[i + 1] * invT + bufB[i + 1] * t);
    out[i + 2] = Math.round(bufA[i + 2] * invT + bufB[i + 2] * t);
    out[i + 3] = 255;
  }
  return out;
}

function compositeRootAperture(originalBuf, beaverBuf, progress) {
  const out = Buffer.alloc(originalBuf.length);
  const cx = 960;
  const cy = 540;

  // Aperture expands smoothly as camera advances
  const rx = 240 + progress * 760;
  const ry = 200 + progress * 420;

  for (let y = 0; y < 1080; y++) {
    for (let x = 0; x < 1920; x++) {
      const idx = (y * 1920 + x) * 4;
      const r = originalBuf[idx];
      const g = originalBuf[idx + 1];
      const b = originalBuf[idx + 2];

      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Start with 100% beaver scene as base
      out[idx] = beaverBuf[idx];
      out[idx + 1] = beaverBuf[idx + 1];
      out[idx + 2] = beaverBuf[idx + 2];
      out[idx + 3] = 255;

      // Overlay root tunnel where roots exist
      if (dist > 0.55) {
        const isNotWater = !(b > 110 && g > 105 && b >= r);
        const isNotSky = !(r > 160 && g > 160 && b > 160);
        const isDarkBark = (r < 80 && g < 80 && b < 70);
        const isBrownWood = (r > b + 8 && g > b + 4 && (r + g + b) < 270);
        const isFoliage = (g > r && g > b && (r + g + b) < 250);

        if (isNotWater && isNotSky && (isDarkBark || isBrownWood || isFoliage)) {
          const alpha = Math.min(1.0, (dist - 0.55) / 0.30);
          out[idx] = Math.round(beaverBuf[idx] * (1 - alpha) + originalBuf[idx] * alpha);
          out[idx + 1] = Math.round(beaverBuf[idx + 1] * (1 - alpha) + originalBuf[idx + 1] * alpha);
          out[idx + 2] = Math.round(beaverBuf[idx + 2] * (1 - alpha) + originalBuf[idx + 2] * alpha);
        }
      }
    }
  }
  return out;
}

async function main() {
  console.log('=== Generando Secuencia Optimizada de Castores ===');

  // Load beaver images raw
  console.log('Cargando imagenes de castores...');
  const bufB1 = await readRaw(b1);
  const bufB2 = await readRaw(b2);
  const bufB3 = await readRaw(b3);

  // Generate frames 86 to 118 using backup originals for pristine mask source
  console.log('Componiendo transicion del tunel de raices (frames 86-118)...');
  const startF = 86;
  const endApertureF = 118;
  for (let f = startF; f <= endApertureF; f++) {
    const fname = `frame_${String(f).padStart(3, '0')}.jpg`;
    const origPath = path.join(backupFramesDir, fname);
    const destPath = path.join(framesDir, fname);
    const origBuf = await readRaw(origPath);
    const progress = (f - startF) / (endApertureF - startF);
    const compBuf = compositeRootAperture(origBuf, bufB1, progress);
    await writeRaw(compBuf, destPath);
    if (f % 10 === 0 || f === endApertureF) {
      console.log(`  Frame ${f}/${endApertureF} listo`);
    }
  }

  // Generate frames 119 to 169
  console.log('Generando frames 119-169...');
  const totalWaterFrames = 169 - 119;
  for (let f = 119; f <= 169; f++) {
    const fname = `frame_${String(f).padStart(3, '0')}.jpg`;
    const fPath = path.join(framesDir, fname);
    const p = (f - 119) / totalWaterFrames;

    let waterBuf;
    if (p < 0.33) {
      const localP = p / 0.33;
      waterBuf = blendBuffers(bufB1, bufB2, localP);
    } else if (p < 0.66) {
      const localP = (p - 0.33) / 0.33;
      waterBuf = blendBuffers(bufB2, bufB3, localP);
    } else {
      const localP = (p - 0.66) / 0.34;
      waterBuf = blendBuffers(bufB3, bufB1, localP);
    }

    await writeRaw(waterBuf, fPath);
    if (f % 10 === 0 || f === 169) {
      console.log(`  Frame ${f}/169 listo`);
    }
  }

  console.log('Secuencia de frames completada al 100%.');
}

main().catch(console.error);
