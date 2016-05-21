import dispatcher from './dispatcher';


export function importSVG(svgFile) {
  dispatcher.dispatch({actionType: 'svg:import', svgFile: svgFile});
};