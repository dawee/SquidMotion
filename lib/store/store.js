import {EventEmitter} from 'fbemitter';
import dispatcher from '../dispatcher';


var mapping = {};

dispatcher.register(function(action) {
  (mapping[action.actionType] || []).forEach(function (handler) {
    handler(action);
  });
});

export default class Store extends EventEmitter {

  on(eventType, handler) {
    return this.addListener(eventType, handler);
  }

  register(actionType, handler) {
    if (! (actionType in mapping)) mapping[actionType] = new Set([]);

    mapping[actionType].add(handler.bind(this));
  }

}

