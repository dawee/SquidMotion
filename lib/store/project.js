import Store from './store';
import dispatcher from '../dispatcher';
import * as constant from '../constant';


class ProjectStore extends Store {

  constructor() {
    super();

    this.projects = [];
    this.register(constant.PROJECT_CREATE, this.onCreate);
  }

  onCreate(action) {
    this.projects.push({svgFileName: action.svgFileName});
    this.emit(constant.PROJECT_CREATED);
  }

}

export default new ProjectStore();