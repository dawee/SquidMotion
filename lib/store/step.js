const Dispersive = require('dispersive');
const actions = require('../actions');


const StepStore = module.exports = Dispersive.createStore();

StepStore.bindAction(actions.createStep, (data) => {
  StepStore.create({
    animationId: data.animationId,
    channelId: data.channelId,
    stepId: data.stepId,
    time: data.time,
    selected: false,
  });

  StepStore.emit('change');
});


StepStore.bindAction(actions.selectStep, (data) => {
  const current = StepStore.filter({animationId: data.animationId, selected: true}).first();

  if (!!current) current.selected = false;

  const step = StepStore.get({
    animationId: data.animationId,
    channelId: data.channelId,
    stepId: data.stepId,
  });

  step.selected = true;

  StepStore.emit('change');
});

StepStore.isSelected = (animationId, stepId) => StepStore.get({animationId, stepId}).selected;

StepStore.allIDs = (channelId) => StepStore.filter({channelId}).all().map(
  (step) => step.stepId
);
