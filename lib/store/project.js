import Store from './store';
import {importSVG} from '../action/svg';
import dispatcher from '../dispatcher';


class ProjectStore extends Store {

  constructor() {
    super();

    this.projects = [];
    this.register(importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.projects.push({svgRoot: opts.svgRoot});
    this.emit('change');
  }

}

export default new ProjectStore();