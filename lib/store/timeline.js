const Dispersive = require('dispersive');
const actions = require('../actions');


const TimelineStore = module.exports = Dispersive.createStore();

TimelineStore.bindAction(actions.importSVG, (data) => {
  TimelineStore.create({
    fileId: data.fileId,
    length: 10000,
    gap: 10,
    gapWidth: 5,
  });

  TimelineStore.emit('change');
});
