import Store from './store';
import dispatcher from '../dispatcher';
import {readFile} from '../native';


class ProjectStore extends Store {

  constructor() {
    super();

    this.projects = [];
    this.register('svg:import', this.onImportSVG);
  }

  onImportSVG(action) {
    readFile(action.svgFile, (data) => {
      this.projects.push({svgDoc: new DOMParser().parseFromString(
        data,
        "image/svg+xml"
      )});

      this.emit('change');
    });
  }

}

export default new ProjectStore();