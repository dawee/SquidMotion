import {createAction} from './action';
import {parseXML, readFile} from '../native';

export const importSVG = createAction((svgFile, done) => {
  readFile(svgFile, (data) => {
    done(null, {svgRoot: parseXML(data, "svg")});
  });
});
