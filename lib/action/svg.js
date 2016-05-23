import sax from 'sax';
import {createAction} from './action';
import {readFile} from '../native';

export const _parse = (svgString) => {
  var svgRoot = {children: []};
  var ctx = svgRoot;
  var parser = sax.parser(true);

  parser.onopentag = function (node) {
    var parent = ctx;
    var child = {
      children: [],
      parent: parent,
      name: node.name,
      attributes: node.attributes
    };

    parent.children.push(child);
    ctx = child;
  };

  parser.onclosetag = function () {
    var parent = ctx.parent;

    delete ctx.parent;
    ctx = parent;
  };
  
  parser.write(svgString).close();
  return svgRoot.children[0];
}

export const importSVG = createAction((svgFile, done) => {
  readFile(svgFile, (data) => {
    done(null, {svgRoot: _parse(data)});
  });
});
