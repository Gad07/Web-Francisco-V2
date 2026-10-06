import fs from 'fs';

const filePath = './src/components/EditorialOverlay.jsx';
let text = fs.readFileSync(filePath, 'utf8');

const regex = /<div className="italic font-normal text-\[#5a6b2a\] block">[\s\S]*?<\/div>\s*<\/div>\s*<div className="italic font-normal text-\[#5a6b2a\] block whitespace-nowrap">\s*\{t\(\{ es: 'que sostener\.', en: 'd to sustain\.' \}\)\}\s*<\/div>/;

const replacement = `<div className="italic font-normal text-[#5a6b2a] block">
              {t({ es: 'solo un mundo', en: 'only one world' })}
            </div>
            <div className="italic font-normal text-[#5a6b2a] block">
              {t({ es: 'que sostener.', en: 'to sustain.' })}
            </div>`;

if (regex.test(text)) {
  text = text.replace(regex, replacement);
  fs.writeFileSync(filePath, text, 'utf8');
  console.log('REPLACED SUCCESSFULLY');
} else {
  console.log('REGEX DID NOT MATCH');
}
