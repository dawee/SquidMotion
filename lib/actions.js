const Action = require('dwflux/action');
const electron = require('electron');
const hat = require('hat');
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

exports.importSVG = Action.create((file, done) => readFile(file, (data) => {
  done(null, {
    fileId: hat(),
    name: file.name,
    doc: SVGFlatDocument.parse(data),
  });
}));
