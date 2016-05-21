import {EventEmitter} from 'fbemitter';
import dispatcher from '../dispatcher';
import * as constant from '../constant';


class ProjectStore extends EventEmitter {

  constructor() {
    super();
    this.projects = [];
  }

  create(svgFileName) {
    this.projects.push({svgFileName: svgFileName});
  }

}

var projectStore = new ProjectStore();

dispatcher.register(function(action) {

  switch(action.actionType) {
    
    case constant.PROJECT_CREATE:
      projectStore.create(action.svgFileName);
      break;

    default:
      break;
  };

});

export default projectStore;