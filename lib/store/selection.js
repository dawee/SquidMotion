import Store from './store';
import imageStore from './image';
import {selectElement} from '../action/svg';

class SelectionStore extends Store {

  constructor() {
    super();

    this.bounds = null;
    this.register(selectElement, this.onSelectElement);
  }

  onSelectElement(opts) {
    this.bounds = imageStore.live.mapping[opts.elementId].bounds;
    this.emit('change');
  }

}

export default new SelectionStore();