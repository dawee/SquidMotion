import Store from 'dwflux/store';
import {importSVG} from '../action/svg';


class ProjectStore extends Store {

  constructor() {
    super();

    this.project = null;
    this.register(importSVG, this.onImportSVG);
  }

  onImportSVG(evt) {
    this.project = {
      document: {
        width: evt.image.root.attributes.width,
        height: evt.image.root.attributes.height
      }
    };
    this.emit('change');
  }

}

export default new ProjectStore();
