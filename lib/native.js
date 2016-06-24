const fs = require('fs');
const electron = require('electron');


exports.readFile = (file, callback) => fs.readFile(file, 'utf-8', callback);

exports.maximizeWindow = () => {
  if (electron === null) return;

  let win = electron.remote.getCurrentWindow();

  win.setResizable(true);
  win.maximize();
};
