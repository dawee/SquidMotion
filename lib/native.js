import fs from 'fs';


export const readFile = (file, callback) => {
  if (typeof file === 'string') {
    return fs.readFile(file, 'utf-8', callback);
  }

  var reader = new FileReader();

  reader.onload = callback();
  reader.readAsText(file);
};
