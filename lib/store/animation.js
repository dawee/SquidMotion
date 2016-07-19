const Dispersive = require('dispersive');
const actions = require('../actions');


const AnimationStore = module.exports = Dispersive.createStore();

AnimationStore.bindAction(actions.createAnimation, (data) => {
  const count = AnimationStore.filter({fileId: data.fileId}).all().length;

  AnimationStore.create({
    fileId: data.fileId,
    animationId: data.animationId,
    name: `animation-${count + 1}`,
    selected: false,
  });

  AnimationStore.emit('change');
});

AnimationStore.bindAction(actions.selectAnimation, (data) => {
  const current = AnimationStore.filter({
    fileId: data.fileId,
    selected: true,
  }).first();

  if (!!current) current.selected = false;

  const toSelect = AnimationStore.get({
    fileId: data.fileId,
    animationId: data.animationId,
  });

  toSelect.selected = true;

  AnimationStore.emit('change');
});


AnimationStore.getCurrentAnimation = (fileId) => (
  AnimationStore.get({fileId: fileId, selected: true})
);

AnimationStore.getAllAnimations = (fileId) => AnimationStore.filter({fileId: fileId}).all();
