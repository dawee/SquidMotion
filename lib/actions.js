const Dispersive = require('dispersive');
const electron = require('electron');
const hat = require('hat');
const SVGFlatDocument = require('svg-flat-document');

const win = electron.remote.getCurrentWindow();
const actions = module.exports = {};


actions.showWindow = Dispersive.createAction(() => {
  win.maximize();
  win.show();
});

actions.openProject = Dispersive.createAction((fileId) => ({fileId}));
actions.createChannel = Dispersive.createAction((fileId, channelId) => ({
  fileId: fileId,
  channelId: channelId || hat(),
}));

actions.createStep = Dispersive.createAction((fileId, channelId, time, stepId) => ({
  fileId: fileId,
  channelId: channelId,
  stepId: stepId || hat(),
  time: time,
}));

actions.importSVG = Dispersive.createAction((fileId, file) => (
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => resolve({
      fileId: fileId,
      name: file.name,
      doc: SVGFlatDocument.parse(reader.result),
    });

    reader.readAsText(file);
  })
));

actions.createProjectFromSVG = Dispersive.createAction((file) => {
  const fileId = hat();
  const firstChannelId = hat();

  return Dispersive.createActionGroup()
    .chain(actions.importSVG, [fileId, file])
    .chain(actions.createChannel, [fileId, firstChannelId])
    .chain(actions.createStep, [fileId, firstChannelId, 0])
    .chain(actions.openProject, [fileId]);
});

