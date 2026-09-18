import fs from 'fs';
import path from 'path';

console.log('Frame 1 exists:', fs.existsSync('public/VideoFrames/frame_001.jpg'));
console.log('Frame 153 exists:', fs.existsSync('public/VideoFrames/frame_153.jpg'));
console.log('Frame 154 exists:', fs.existsSync('public/VideoFrames/frame_154.jpg'));
const files = fs.readdirSync('public/VideoFrames');
console.log('Total files in VideoFrames:', files.length);
console.log('First 5:', files.slice(0, 5));
console.log('Last 5:', files.slice(-5));
