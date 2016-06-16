const Action = require('dwflux/action');
const SVGFlatDocument = require('svg-flat-document').default;
const readFile = require('../native').readFile;


exports.importSVG = Action.create((svgFile, done) => {
  readFile(svgFile, (data) => done(null, {image: SVGFlatDocument.parse(data)}));
});
