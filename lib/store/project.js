import Store from './store';
import {importSVG} from '../action/svg';


class ProjectStore extends Store {

  constructor() {
    super();

    this.project = null;
    this.register(importSVG, this.onImportSVG);
  }

  onImportSVG() {
    this.project = {};
    this.emit('change');
  }

}

export default new ProjectStore();
