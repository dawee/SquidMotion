import Store from './store';
import dispatcher from '../dispatcher';


class ProjectStore extends Store {

  constructor() {
    super();

    this.projects = [];
    this.register('svg:import', this.onImportSVG);
  }

  onImportSVG(action) {
    var reader = new FileReader();

    reader.onload = () => {
      this.projects.push({svgDoc: new DOMParser().parseFromString(
        reader.result,
        "image/svg+xml"
      )});

      this.emit('change');
    };

    reader.readAsText(action.svgFile);
  }

}

export default new ProjectStore();