const Action = require('dwflux/action');

exports.createStep = Action.create((channel, timeline, evt, done) => done(null, {
  channelId: channel.id,
  time: (evt.nativeEvent.layerX / timeline.gapWidth) * timeline.gap,
}));


exports.selectStep = Action.create((channel, step, done) => done(null, {
  channelId: channel.id,
  stepId: step.id,
}));


exports.createChannel = Action.create();
