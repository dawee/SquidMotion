const Dispersive = require('dispersive');
const actions = require('../actions');


const StepStore = module.exports = Dispersive.createStore();

StepStore.bindAction(actions.createStep, (data) => {
  StepStore.create({
    fileId: data.fileId,
    channelId: data.channelId,
    stepId: data.stepId,
    time: data.time,
  });

  StepStore.emit('change');
});

StepStore.allIDs = (channelId) => StepStore.filter({channelId}).all().map(
  (step) => step.stepId
);
