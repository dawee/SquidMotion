import hat from 'hat';
import dispatcher from '../dispatcher';

export const createAction = (handler) => {
  let actionType = hat();

  let wrapper = function (...argv) {

    argv.push((err, result) => {
      result = result || {};
      result.actionType = actionType;
      dispatcher.dispatch(result);
    });

    handler.apply(null, argv);
  };

  wrapper.actionType = actionType;
  return wrapper;
};
