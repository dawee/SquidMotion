import fs from 'fs';


export function readFile(file, callback) {
  if (typeof file === 'string') {
    return fs.readFile(file, 'utf-8', callback);
  }

  var reader = new FileReader();

  reader.onload = callback();
  reader.readAsText(action.svgFile);
};