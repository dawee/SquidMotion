import dispatcher from '../dispatcher';
import * as constant from '../constant';


export function createProject(svgFileName) {
  dispatcher.dispatch({
    actionType: constant.PROJECT_CREATE,
    svgFileName: svgFileName
  });  
};