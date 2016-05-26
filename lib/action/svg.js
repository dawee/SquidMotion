import hat from 'hat';
import omit from '101/omit';
import pick from '101/pick';
import sax from 'sax';
import {parse as parseTransform} from 'svg-transform-parser';
import {Matrix as TransformMatrix} from 'transformation-matrix-js';
import {createAction} from './action';
import {readFile} from '../native';



export function _matrixFromTransform(transformString) {
  var matrix = new TransformMatrix();

  if (!transformString) return matrix;

  var parsed = parseTransform(transformString);

  if ('matrix' in parsed) {
    matrix = matrix.setTransform(
      parsed.matrix.a, parsed.matrix.b, parsed.matrix.c,
      parsed.matrix.d, parsed.matrix.e, parsed.matrix.f
    );
  } else if ('translate' in parsed) {
    matrix.translate(parsed.translate.tx, parsed.translate.ty);
  } else {
    throw transformString + ' is not managed by the parser';
  }

  return matrix
}

export function _parseStyleAttribute(styleAttribute) {
  var style = {};

  (styleAttribute || '').split(';').forEach((line) => {
    var match = line.match(/^\s*(.*)\s*:\s*(.*)\s*$/);

    if (!!match) style[match[1]] = match[2];
  });

  return style;
};

export function _cleanup(node, id, parent) {
  var baseMatrix = _matrixFromTransform(node.attributes.transform);
  var cleanNode = {
    attributes:  Object.assign(
      _parseStyleAttribute(node.attributes.style),
      omit(
        node.attributes,
        ['id', 'style', 'transform']
      )
    )
  };

  if (!!parent && !!parent.matrix) {
    cleanNode.matrix = TransformMatrix.from(
      parent.matrix.a,
      parent.matrix.b,
      parent.matrix.c,
      parent.matrix.d,
      parent.matrix.e,
      parent.matrix.f
    ).multiply(baseMatrix);
  } else {
    cleanNode.matrix = pick(baseMatrix, ['a', 'b', 'c', 'd', 'e', 'f']);
  }

  cleanNode.id = id;
  cleanNode.name = node.name;

  return cleanNode;
};

export function _parse(svgString) {
  var mapping = {};
  var svgRoot = {children: []};
  var ctx = svgRoot;
  var parser = sax.parser(true);

  parser.onopentag = (node) => {
    var id = node.attributes.id || hat();
    var parent = ctx;
    var child = {
      id: id,
      children: [],
      parent: parent,
    };

    parent.children.push(child);
    mapping[id] = _cleanup(node, id, mapping[parent.id]);

    ctx = child;
  };

  parser.onclosetag = () => {
    var parent = ctx.parent;

    delete ctx.parent;
    ctx = parent;
  };
  
  parser.write(svgString).close();
  return {root: svgRoot.children[0], mapping: mapping};
};

export const importSVG = createAction((svgFile, done) => {
  readFile(svgFile, (data) => {
    done(null, {image: _parse(data)});
  });
});

