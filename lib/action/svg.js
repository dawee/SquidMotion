import {createAction} from './action';
import {readFile} from '../native';
import {parse} from '../svg/parser';


export const importSVG = createAction((svgFile, done) => {
  readFile(svgFile, (data) => {
    done(null, {image: parse(data)});
  });
});
