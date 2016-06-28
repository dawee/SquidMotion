const Action = require('dwflux/action');
const electron = require('electron');
const hat = require('hat');
const SVGFlatDocument = require('svg-flat-document');

const win = electron.remote.getCurrentWindow();
const actions = module.export = {};

function readFile(file, callback) {
  const reader = new FileReader();

  reader.onload = () => callback(reader.result);
  reader.readAsText(file);
}

actions.showWindow = Action.create((done) => {
  win.show();
  done();
});

actions.importSVG = Action.create((fileId, file, done) => (
  readFile(file, (data) => done(null, {
    fileId,
    name: file.name,
    doc: SVGFlatDocument.parse(data),
  }))
));

actions.computeImage = Action.create((fileId, done) => done(null, {fileId}));

actions.createProjectFromSVG = Action.create((file, done) => {
  const fileId = hat();

  actions.importSVG(fileId, file);
  actions.computeImage(fileId);

  done();
});
