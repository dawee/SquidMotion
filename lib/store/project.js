import Store from './store';
import {importSVG} from '../action/svg';
import dispatcher from '../dispatcher';


class ProjectStore extends Store {

  constructor() {
    super();

    this.project = null;
    this.register(importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.project = {};
    this.emit('change');
  }

}

export default new ProjectStore();
