const electron = require('electron');


exports.readFile = (file, callback) => {
  const reader = new FileReader();

  reader.onload = () => callback(reader.result);
  reader.readAsText(file);
};

exports.maximizeWindow = () => {
  if (electron === null) return;

  let win = electron.remote.getCurrentWindow();

  win.setResizable(true);
  win.maximize();
};
