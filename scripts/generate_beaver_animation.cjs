const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workspaceRoot = path.resolve(__dirname, '..');
const ffmpeg = require(path.join(workspaceRoot, 'node_modules', 'ffmpeg-static'));

const artifactsDir = 'C:/Users/gadpa/.gemini/antigravity-ide/brain/b0b78ba8-1c5e-4326-91cf-9c765cee578c';
const srcImg1 = path.join(artifactsDir, 'beaver_family_underwater_1793074965109.jpg');
const srcImg2 = path.join(artifactsDir, 'beaver_family_swim2_1793075241112.jpg');
const srcImg3 = path.join(artifactsDir, 'beaver_family_swim3_1793075266511.jpg');

const beaverAssetsDir = path.join(workspaceRoot, 'public', 'images', 'beavers');
if (!fs.existsSync(beaverAssetsDir)) {
  fs.mkdirSync(beaverAssetsDir, { recursive: true });
}

const beaver1 = path.join(beaverAssetsDir, 'beaver_family_1.jpg');
const beaver2 = path.join(beaverAssetsDir, 'beaver_family_2.jpg');
const beaver3 = path.join(beaverAssetsDir, 'beaver_family_3.jpg');

// 1. Scale input images to crisp 1920x1080
console.log('1. Escalando imagenes fotorrealistas de castores a 1920x1080...');
execSync(`"${ffmpeg}" -y -i "${srcImg1}" -vf "scale=1920:1080:flags=lanczos" -q:v 2 "${beaver1}"`);
execSync(`"${ffmpeg}" -y -i "${srcImg2}" -vf "scale=1920:1080:flags=lanczos" -q:v 2 "${beaver2}"`);
execSync(`"${ffmpeg}" -y -i "${srcImg3}" -vf "scale=1920:1080:flags=lanczos" -q:v 2 "${beaver3}"`);

console.log('Imagenes preparadas exitosamente.');
