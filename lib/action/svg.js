import Action from './action';
import {parseXML, readFile} from '../native';

export const importSVG = Action.create((svgFile, done) => {
  readFile(svgFile, (data) => {
    done(null, {svgRoot: parseXML(data, "svg")});
  });
});
