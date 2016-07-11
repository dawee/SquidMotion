const Dispersive = require('dispersive');
const actions = require('../actions');


const StepStore = module.exports = Dispersive.createStore();

StepStore.bindAction(actions.createStep, (data) => {
  StepStore.create({
    fileId: data.fileId,
    channelId: data.channelId,
    stepId: data.stepId,
    time: data.time,
    selected: false,
  });

  StepStore.emit('change');
});


StepStore.bindAction(actions.selectStep, (data) => {
  const current = StepStore.filter({fileId: data.fileId, selected: true}).first();

  if (!!current) current.selected = false;

  const step = StepStore.get({
    fileId: data.fileId,
    channelId: data.channelId,
    stepId: data.stepId,
  });

  step.selected = true;

  StepStore.emit('change');
});

StepStore.isSelected = (fileId, stepId) => StepStore.get({fileId, stepId}).selected;

StepStore.allIDs = (channelId) => StepStore.filter({channelId}).all().map(
  (step) => step.stepId
);
