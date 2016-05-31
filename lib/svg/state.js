import pick from '101/pick';
import hat from 'hat';


export default class State {

  constructor(opts) {
    this.time = opts.time;
    this.curve = opts.curve || 'linear';
    this.id = opts.id || hat();
    this.changes = opts.changes || {};
  }

  addMatrixChange(elementId, matrix) {
    if (! (elementId in this.changes)) this.changes[elementId] = {};

    this.changes[elementId] = matrix;
  }

  serialize() {
    return pick(this, ['time', 'changes', 'id']);
  }

  applyElementMatrixChanges(elementId, image, duration, cursor) {
    let base = image[elementId].matrix;
    let target = this.changes[elementId].matrix;

    image[elementId].matrix = base.interpolateAnim(target, cursor / duration);
  }

  applyElementChanges(elementId, image, duration, cursor) {
    let changes = this.changes[elementId];

    if ('matrix' in changes) {
      this.applyElementMatrixChanges(elementId, image, duration, cursor);
    }
  }

  applyChanges(image, lastTime, time) {
    let duration = this.time - lastTime;
    let cursor = time - lastTime;

    for (let elementId of Object.key(this.changes)) {
      this.applyElementChanges(elementId, image, duration, cursor);
    }
  }

  static deserialize(opts) {
    return new State(opts);
  }

  static computeChanges(initial, states, time) {
    let image = Object.assign({}, initial);
    let lastTime = null;

    for (let state of states) {
      if (state.time <= time) {
        image = Object.assign(image, state.changes);
        lastTime = state;
      } else {
        state.applyChanges(image, lastTime, time);
        break;
      }
    }
  }

}
