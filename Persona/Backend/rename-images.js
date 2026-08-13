const fs = require('fs');
const path = require('path');
//Renames Image files
// Target the artwork directory directly relative to this script's location
const baseDirectory = path.join(__dirname, '../Frontend/public/images/Persona Artwork');
const folders = ['P1', 'P2', 'P3', 'P4', 'P5', 'Spinoffs'];

console.log(`Looking for artwork directory at: ${baseDirectory}`);

if (!fs.existsSync(baseDirectory)) {
  console.error(`ERROR: Base directory not found! Check if you placed this script in the 'Frontend' folder.`);
  process.exit(1);
}

folders.forEach((folder) => {
  const targetDirectory = path.join(baseDirectory, folder);

  if (!fs.existsSync(targetDirectory)) {
    console.log(`Skipping missing folder: ${folder} (${targetDirectory})`);
    return;
  }

  fs.readdir(targetDirectory, (err, files) => {
    if (err) return console.error(`Error reading ${folder}:`, err);

    files.forEach((file) => {
      if (file.startsWith('.')) return;

      const ext = path.extname(file);
      let name = path.basename(file, ext).toLowerCase();

      // Clean up common unwanted suffixes and model exports found in your directories
      name = name
        .replace(/[-_]29$/, '')                 
        .replace(/[-_]mip.*$/, '')              
        .replace(/[-_]art(work)?$/, '')         
        .replace(/[-_]render$/, '')             
        .replace(/[-_]graphic$/, '')            
        .replace(/[-_]full[-_]image$/, '')      
        .replace(/[-_]notte[-_]full[-_]i$/, '') 
        .replace(/^\d{4}-/, '')                 
        .replace(/\s+/g, '-')                   
        .replace(/_/g, '-');                    

      const oldPath = path.join(targetDirectory, file);
      const newPath = path.join(targetDirectory, `${name}${ext}`);

      if (oldPath !== newPath) {
        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(`Failed to rename ${file}:`, err);
          } else {
            console.log(`[${folder}] Cleaned: ${file} -> ${name}${ext}`);
          }
        });
      }
    });
  });
});