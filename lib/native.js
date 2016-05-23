import fs from 'fs';

export const readFile = (file, callback) => {
  if (typeof file === 'string' && file.match(/^<svg>.*/)) {
    return callback(null, file);
  }

  if (typeof file === 'string' && file.match(/.*\.svg$/)) {
    return fs.readFile(file, 'utf-8', callback);
  }

  var reader = new FileReader();

  reader.onload = function () {
    callback(reader.result);
  };

  reader.readAsText(file);
};

export const maximizeWindow = () => {
  if (typeof nw === 'undefined') return;

  nw.Window.get().setMaximumSize(0, 0);
  nw.Window.get().setMinimumSize(0, 0);
  nw.Window.get().maximize();
};
