import {createAction} from './action';


export const selectElement = createAction((elementId, evt, done) => {
  done(null, {
    elementId: elementId,
    x: evt.nativeEvent.screenX,
    y: evt.nativeEvent.screenY
  });
});

export const moveSelection = createAction((evt, done) => {
  done(null, {
    x: evt.nativeEvent.screenX,
    y: evt.nativeEvent.screenY
  });
});

export const deactivateSelection = createAction();

