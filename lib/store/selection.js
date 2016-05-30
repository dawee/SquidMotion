import Store from './store';
import imageStore from './image';
import {moveSelection, selectElement, deactivateSelection} from '../action/selection';

class SelectionStore extends Store {

  constructor() {
    super();

    this.bounds = null;
    this.lastX = null;
    this.lastY = null;
    this.active = false;
    this.register(moveSelection, this.onMoveSelection);
    this.register(deactivateSelection, this.onDeactivate);
    this.register(selectElement, this.onSelectElement);
  }

  onMoveSelection(opts) {
    if (!this.elementId || !this.active) return;

    imageStore.translateNode(
      this.elementId,
      opts.x - this.lastX,
      opts.y - this.lastY
    );
    
    this.updateSelection(opts);
  }

  onDeactivate() {
    this.active = false;
  }

  onSelectedNodeChange() {
    this.bounds = imageStore.live.mapping[this.elementId].bounds;
    this.emit('change');
  }

  onSelectElement(opts) {
    this.elementId = opts.elementId;
    this.active = true;
    this.updateSelection(opts);

    imageStore.on('change:' + this.elementId, this.onSelectedNodeChange.bind(this));
  }

  updateSelection(opts) {
    this.bounds = imageStore.live.mapping[this.elementId].bounds;
    this.lastX = opts.x;
    this.lastY = opts.y;
    this.emit('change');
  }
}

export default new SelectionStore();
