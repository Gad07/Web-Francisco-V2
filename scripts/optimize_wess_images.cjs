const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');

const dir = path.join(__dirname, '..', 'public', 'images', 'wess');
const distDir = path.join(__dirname, '..', 'dist', 'images', 'wess');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const files = [
  'semillas-nativas-conservacion.png',
  'milpa-chinampera.jpg',
  'educacion-para-la-sostenibilidad.png',
  'identidad-comunidad-territorio.png',
  'reconocimiento-internacional-wess-2026.png'
];

files.forEach(file => {
  const inputPath = path.join(dir, file);
  if (!fs.existsSync(inputPath)) {
    console.log('Skipping missing:', file);
    return;
  }
  const baseName = path.parse(file).name;
  const outWebp = path.join(dir, `${baseName}.webp`);
  const outJpg = path.join(dir, `${baseName}.jpg`);

  console.log(`Optimizing: ${file}...`);

  // Convert to WebP (Quality 88, max dimension 1600)
  spawnSync(ffmpeg, [
    '-y',
    '-i', inputPath,
    '-vf', 'scale=min(1600\\,iw):-2:flags=lanczos',
    '-quality', '88',
    outWebp
  ], { stdio: 'inherit' });

  // Convert to optimized JPG (Quality 88)
  if (!file.endsWith('.jpg')) {
    spawnSync(ffmpeg, [
      '-y',
      '-i', inputPath,
      '-vf', 'scale=min(1600\\,iw):-2:flags=lanczos',
      '-q:v', '3',
      outJpg
    ], { stdio: 'inherit' });
  }

  // Copy to dist as well
  if (fs.existsSync(outWebp)) {
    fs.copyFileSync(outWebp, path.join(distDir, `${baseName}.webp`));
  }
  if (fs.existsSync(outJpg)) {
    fs.copyFileSync(outJpg, path.join(distDir, `${baseName}.jpg`));
  }
});

console.log('Optimization complete. Listing directory:');
const list = fs.readdirSync(dir);
list.forEach(f => {
  const stat = fs.statSync(path.join(dir, f));
  console.log(`${f.padEnd(45)}: ${(stat.size / 1024).toFixed(1)} KB`);
});
