// This script fixes the PDF viewer implementation in all pages

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to search for files
const directories = [
  'src/pages/measure',
  'src/pages/protect',
  'src/pages/conserve'
];

// Function to process a file
function processFile(filePath) {
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if the file has a component definition
    const componentMatch = content.match(/const\s+(\w+)\s*=\s*\(\s*\)\s*=>\s*{/);
    if (componentMatch) {
      const componentName = componentMatch[1];
      
      // Check if there's a showPdfViewer state outside the component
      const outsideStateMatch = content.match(/const\s+\[\s*showPdfViewer\s*,\s*setShowPdfViewer\s*\]\s*=\s*useState\s*\(\s*false\s*\);(?:[\s\S]*?)const\s+(\w+)\s*=\s*\(\s*\)\s*=>\s*{/);
      
      if (outsideStateMatch && outsideStateMatch[1] === componentName) {
        // Extract the state and function definitions
        const stateAndFunctions = content.substring(
          content.indexOf('const [showPdfViewer, setShowPdfViewer] = useState(false);'),
          content.indexOf(`const ${componentName} = () => {`)
        );
        
        // Remove the state and functions from outside the component
        content = content.replace(stateAndFunctions, '');
        
        // Find where to insert the state and functions inside the component
        const componentStart = content.indexOf(`const ${componentName} = () => {`);
        const openingBraceIndex = content.indexOf('{', componentStart) + 1;
        
        // Find the first state or variable declaration inside the component
        const firstStateMatch = content.substring(openingBraceIndex).match(/const\s+\[\w+,\s*\w+\]\s*=\s*useState/);
        const firstConstMatch = content.substring(openingBraceIndex).match(/const\s+\w+\s*=/);
        
        let insertIndex;
        if (firstStateMatch && firstConstMatch) {
          insertIndex = openingBraceIndex + Math.min(
            firstStateMatch.index,
            firstConstMatch.index
          );
        } else if (firstStateMatch) {
          insertIndex = openingBraceIndex + firstStateMatch.index;
        } else if (firstConstMatch) {
          insertIndex = openingBraceIndex + firstConstMatch.index;
        } else {
          insertIndex = openingBraceIndex;
        }
        
        // Insert the state and functions inside the component
        content = content.slice(0, insertIndex) + 
                 '\n  // State for PDF viewer\n' +
                 '  const [showPdfViewer, setShowPdfViewer] = useState(false);\n\n' +
                 '  // Function to open brochure PDF\n' +
                 '  const openBrochure = () => {\n' +
                 '    setShowPdfViewer(true);\n' +
                 '  };\n\n' +
                 content.slice(insertIndex);
        
        modified = true;
      }
    }

    // Save the modified content if changes were made
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

// Function to recursively process all files in a directory
function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  let updatedCount = 0;

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // Recursively process subdirectories
      updatedCount += processDirectory(filePath);
    } else if (stats.isFile() && (file.endsWith('.tsx') || file.endsWith('.jsx'))) {
      // Process TypeScript/JavaScript React files
      if (processFile(filePath)) {
        updatedCount++;
      }
    }
  }

  return updatedCount;
}

// Main execution
let totalUpdated = 0;
for (const directory of directories) {
  console.log(`Processing directory: ${directory}`);
  totalUpdated += processDirectory(directory);
}

console.log(`Total files updated: ${totalUpdated}`);
