const fs = require('fs');

// Let's read the svg
const svg = fs.readFileSync('public/logos/Logo Bg transparente.svg', 'utf8');

// The SVG uses viewBox="0 0 1500 1499.999933"
// In the SVG, the logo artwork is in the center area.
// Let's create an optimized version with a tight viewBox or use the SVG with object-fit scale.
// Actually, if we use viewBox="150 350 1200 800" or similar:
console.log('Original SVG size:', svg.length);
