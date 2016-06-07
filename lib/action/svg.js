import {createAction} from 'dwflux/action';
import SVGFlatDocument from 'svg-flat-document';
import {readFile} from '../native';


export const importSVG = createAction((svgFile, done) => {
  readFile(svgFile, (data) => done(null, {image: SVGFlatDocument.parse(data)}));
});
