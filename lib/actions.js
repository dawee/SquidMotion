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

actions.selectStep = Dispersive.createAction(
  (fileId, channelId, stepId) => ({fileId, channelId, stepId})
);

actions.selectTime = Dispersive.createAction(
  (fileId, channelId, time) => ({fileId, channelId, time})
);

actions.createAndSelectStep = Dispersive.createAction((fileId, channelId, time) => {
  const stepId = hat();

  return Dispersive.createActionGroup()
    .chain(actions.createStep, [fileId, channelId, time, stepId])
    .chain(actions.selectStep, [fileId, channelId, stepId]);
});

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
  const firstStepId = hat();

  return Dispersive.createActionGroup()
    .chain(actions.importSVG, [fileId, file])
    .chain(actions.createChannel, [fileId, firstChannelId])
    .chain(actions.createStep, [fileId, firstChannelId, 0, firstStepId])
    .chain(actions.selectStep, [fileId, firstChannelId, firstStepId])
    .chain(actions.openProject, [fileId]);
});

actions.translateNode = Dispersive.createAction(
  (fileId, nodeId, tx, ty) => ({fileId, nodeId, tx, ty})
);
