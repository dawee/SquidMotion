const Dispersive = require('dispersive');
const actions = require('../actions');


const TimelineStore = module.exports = Dispersive.createStore();

TimelineStore.bindAction(actions.createAnimation, (data) => {
  TimelineStore.create({
    animationId: data.animationId,
    length: 10000,
    gap: 10,
    gapWidth: 5,
    cursor: 0,
    scroll: 0,
  });

  TimelineStore.emit('change');
});

TimelineStore.bindAction(actions.selectTime, (data) => {
  const timeline = TimelineStore.get({animationId: data.animationId});

  timeline.cursor = data.time;

  TimelineStore.emit('change');
});

TimelineStore.getCursorLeft = (animationId) => {
  const timeline = TimelineStore.get({animationId});

  return Math.floor(timeline.cursor * timeline.gapWidth / timeline.gap);
};
