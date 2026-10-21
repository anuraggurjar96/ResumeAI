import fs from "fs";
import path from "path";

const files = [
  "node_modules/html2canvas/dist/html2canvas.esm.js",
  "node_modules/html2canvas/dist/html2canvas.js",
  "node_modules/html2canvas/dist/html2canvas.min.js",
  "node_modules/html2canvas/dist/lib/css/types/color.js",
];

const targetPattern = 'throw new Error("Attempting to parse an unsupported color function \\"" + value.name + "\\"");';
const replacement = 'return exports.pack ? exports.pack(17, 24, 39, 1) : pack(17, 24, 39, 1);';

for (const relPath of files) {
  if (fs.existsSync(relPath)) {
    let content = fs.readFileSync(relPath, "utf8");
    if (content.includes('unsupported color function')) {
      content = content.replace(
        /throw new Error\(["']Attempting to parse an unsupported color function [^)]+\);/g,
        replacement
      );
      // For minified version
      content = content.replace(
        /throw new Error\(["']Attempting to parse an unsupported color function [^)]+\)/g,
        'return 0'
      );
      fs.writeFileSync(relPath, content, "utf8");
      console.log(`Patched ${relPath} for modern CSS colors (oklch)`);
    }
  }
}
