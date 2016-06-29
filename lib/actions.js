const Action = require('dwflux/action');
const electron = require('electron');
const SVGFlatDocument = require('svg-flat-document');

const win = electron.remote.getCurrentWindow();
const actions = module.exports = {};

function readFile(file, callback) {
  const reader = new FileReader();

  reader.onload = () => callback(reader.result);
  reader.readAsText(file);
}

actions.showWindow = Action.create((trigger) => {
  win.maximize();
  win.show();

  trigger();
});

actions.importSVG = Action.create((fileId, file, trigger) => (
  readFile(file, (data) => trigger(null, {
    fileId,
    name: file.name,
    doc: SVGFlatDocument.parse(data),
  }))
));
