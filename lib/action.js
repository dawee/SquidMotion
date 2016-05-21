import dispatcher from './dispatcher';


export function importSVG(svgFileName) {
  dispatcher.dispatch({actionType: 'svg:import', svgFileName: svgFileName});
};