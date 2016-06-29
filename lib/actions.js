const Action = require('dwflux/action');
const electron = require('electron');
const hat = require('hat');
const SVGFlatDocument = require('svg-flat-document');

const win = electron.remote.getCurrentWindow();
const actions = module.exports = {};

function readFile(file, callback) {
  const reader = new FileReader();

  reader.onload = () => callback(reader.result);
  reader.readAsText(file);
}

actions.computeImage = Action.create((fileId, trigger) => trigger(null, {fileId}));

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

actions.createChannelStep = Action.create((channelId, time, trigger) => {
  const stepId = hat();

  trigger(null, {channelId, stepId, time});
});

actions.createAnimationChannel = Action.create((animationId, trigger) => {
  const channelId = hat();

  trigger(null, {animationId, channelId});
  actions.createChannelStep(channelId, 0);
});

actions.createAnimation = Action.create((fileId, trigger) => {
  const animationId = hat();

  trigger(null, {fileId, animationId});
  actions.createAnimationChannel(animationId);
});

actions.createProjectFromSVG = Action.create((file, trigger) => {
  const fileId = hat();

  actions.importSVG(fileId, file);
  actions.createAnimation(fileId);

  trigger();
});
