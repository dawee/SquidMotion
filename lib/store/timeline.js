const Dispersive = require('dispersive');
const actions = require('../actions');


const TimelineStore = module.exports = Dispersive.createStore();

TimelineStore.bindAction(actions.importSVG, (data) => {
  TimelineStore.create({
    fileId: data.fileId,
    length: 10000,
    gap: 10,
    gapWidth: 5,
    cursor: 0,
  });

  TimelineStore.emit('change');
});

TimelineStore.bindAction(actions.selectTime, (data) => {
  const timeline = TimelineStore.get({fileId: data.fileId});

  timeline.cursor = data.time;

  TimelineStore.emit('change');
});

TimelineStore.getCursorLeft = (fileId) => {
  const timeline = TimelineStore.get({fileId});

  return Math.floor(timeline.cursor * timeline.gapWidth / timeline.gap);
};
