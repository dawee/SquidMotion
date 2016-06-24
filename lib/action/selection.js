const Action = require('dwflux/action');


exports.selectElement = Action.create((elementId, evt, done) => {
  done(null, {
    elementId,
    x: evt.nativeEvent.screenX,
    y: evt.nativeEvent.screenY,
  });
});

exports.moveSelection = Action.create((evt, done) => {
  done(null, {
    x: evt.nativeEvent.screenX,
    y: evt.nativeEvent.screenY,
  });
});

exports.deactivateSelection = Action.create();

