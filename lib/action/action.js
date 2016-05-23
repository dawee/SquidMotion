import hat from 'hat';
import dispatcher from '../dispatcher';

var Action = {
  create: function (handler) {
    var actionType = hat();

    var wrapper = function (...argv) {

      argv.push((err, result) => {
        result.actionType = actionType;
        dispatcher.dispatch(result);
      });

      handler.apply(null, argv);
    };

    wrapper.actionType = actionType;
    return wrapper;
  }
};

export default Action;