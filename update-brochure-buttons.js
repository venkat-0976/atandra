// This script updates all pages with brochure buttons to use the new PdfViewer component

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

// Import statement to add
const importStatement = "import PdfViewer from \"@/components/ui/pdf-viewer\";";

// Function to process a file
function processFile(filePath) {
  try {
    // Read the file content
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if the file already has the import
    if (!content.includes('import PdfViewer from "@/components/ui/pdf-viewer"')) {
      // Add the import statement after the last import
      const lastImportIndex = content.lastIndexOf('import');
      if (lastImportIndex !== -1) {
        const endOfImportIndex = content.indexOf(';', lastImportIndex) + 1;
        if (endOfImportIndex !== 0) {
          content = content.slice(0, endOfImportIndex) + '\n' + importStatement + content.slice(endOfImportIndex);
          modified = true;
        }
      }
    }

    // Check if the file has a PDF viewer component defined
    if (content.includes('const PdfViewer = ({')) {
      // Remove the PDF viewer component definition
      const pdfViewerDefStart = content.indexOf('const PdfViewer = ({');
      if (pdfViewerDefStart !== -1) {
        // Find the end of the component definition (closing brace and semicolon)
        let braceCount = 0;
        let endIndex = pdfViewerDefStart;
        let inString = false;
        let stringChar = '';

        for (let i = pdfViewerDefStart; i < content.length; i++) {
          const char = content[i];

          // Handle string literals to avoid counting braces inside strings
          if ((char === '"' || char === "'") && (i === 0 || content[i-1] !== '\\')) {
            if (!inString) {
              inString = true;
              stringChar = char;
            } else if (char === stringChar) {
              inString = false;
            }
          }

          if (!inString) {
            if (char === '{') braceCount++;
            if (char === '}') {
              braceCount--;
              if (braceCount === 0) {
                // Found the closing brace of the component
                endIndex = i + 1;
                // Look for semicolon or next statement
                while (endIndex < content.length && content[endIndex] !== ';' && content[endIndex] !== 'const' && content[endIndex] !== 'function') {
                  endIndex++;
                }
                if (content[endIndex] === ';') endIndex++;
                break;
              }
            }
          }
        }

        if (endIndex > pdfViewerDefStart) {
          // Remove the component definition
          content = content.slice(0, pdfViewerDefStart) + content.slice(endIndex);
          modified = true;
        }
      }
    }

    // Update the PDF viewer usage
    const pdfViewerUsageRegex = /<PdfViewer\s+showPdfViewer={showPdfViewer}\s+setShowPdfViewer={setShowPdfViewer}\s*\/>/g;
    if (content.match(pdfViewerUsageRegex)) {
      content = content.replace(pdfViewerUsageRegex, `<PdfViewer
        showPdfViewer={showPdfViewer}
        setShowPdfViewer={setShowPdfViewer}
        pdfUrl="/KRYKARD-Comprehensive-Product-Catalogue.pdf"
        title="KRYKARD Product Catalogue"
      />`);
      modified = true;
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
