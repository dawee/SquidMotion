const fs = require('fs');
const electron = require('electron');


exports.readFile = (file, callback) => {
  if (typeof file === 'string' && file.match(/^<svg>.*/)) {
    return callback(null, file);
  }

  if (typeof file === 'string' && file.match(/.*\.svg$/)) {
    return fs.readFile(file, 'utf-8', callback);
  }

  let reader = new FileReader();

  reader.onload = () => {
    callback(reader.result);
  };

  reader.readAsText(file);
};

exports.maximizeWindow = () => {
  if (electron === null) return;

  let win = electron.remote.getCurrentWindow();

  win.setResizable(true);
  win.maximize();
};
