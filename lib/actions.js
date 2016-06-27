const Action = require('dwflux/action');
const electron = require('electron');


const win = electron.remote.getCurrentWindow();


exports.showWindow = Action.create((done) => {
  win.show();
  done();
});
