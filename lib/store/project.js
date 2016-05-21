import Store from './store';
import dispatcher from '../dispatcher';


class ProjectStore extends Store {

  constructor() {
    super();

    this.projects = [];
    this.register('svg:import', this.onCreate);
  }

  onCreate(action) {
    this.projects.push({svgFileName: action.svgFileName});
    this.emit('change');
  }

}

export default new ProjectStore();