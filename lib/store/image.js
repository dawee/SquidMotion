import Store from './store';
import {importSVG} from '../action/svg';


class ImageStore extends Store {

  constructor() {
    super();

    this.live = null;
    this.register(importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.live = opts.image;
    this.emit('change');
  }

}

export default new ImageStore();