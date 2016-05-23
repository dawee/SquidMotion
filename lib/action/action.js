import hat from 'hat';
import dispatcher from '../dispatcher';

var Action = {
  createSync: function (handler) {
    var actionType = hat();

    var wrapper = function (opts) {
      var result = handler(opts) || {};

      result.actionType = actionType;
      dispatcher.dispatch(result);
    };

    wrapper.actionType = actionType;
    return wrapper;
  }
};

export default Action;