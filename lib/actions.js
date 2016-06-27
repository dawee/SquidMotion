const Action = require('dwflux/action');
const electron = require('electron');
const SVGFlatDocument = require('svg-flat-document');

const win = electron.remote.getCurrentWindow();

function readFile(file, callback) {
  const reader = new FileReader();

  reader.onload = () => callback(reader.result);
  reader.readAsText(file);
}

exports.showWindow = Action.create((done) => {
  win.show();
  done();
});

exports.importSVG = Action.create((file, done) => readFile(file, function (data) {
  done(null, {doc: SVGFlatDocument.parse(data)});
}));
