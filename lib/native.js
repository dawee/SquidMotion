const electron = require('electron');


const win = electron.remote.getCurrentWindow();


exports.readFile = (file, callback) => {
  const reader = new FileReader();

  reader.onload = () => callback(reader.result);
  reader.readAsText(file);
};

exports.maximizeWindow = () => {
  win.setResizable(true);
  win.maximize();
};
