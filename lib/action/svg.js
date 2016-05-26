import hat from 'hat';
import omit from '101/omit';
import pick from '101/pick';
import sax from 'sax';
import parsePath from 'svg-path-parser';
import pathBoundingBox from 'svg-path-bounding-box';
import {parse as parseTransform} from 'svg-transform-parser';
import {Matrix as TransformMatrix} from 'transformation-matrix-js';
import {createAction} from './action';
import {readFile} from '../native';


export function _boundsToPoints(bounds) {
  return {
    topLeft: {
      x: bounds.left,
      y: bounds.top
    },
    topRight: {
      x: bounds.left + bounds.width,
      y: bounds.top
    },
    bottomRight: {
      x: bounds.left + bounds.width,
      y: bounds.top + bounds.height
    },
    bottomLeft: {
      x: bounds.left,
      y: bounds.top + bounds.height
    },
  }
};

export function _pointsToBounds(points) {
  return {
    left: points.topLeft.x,
    top: points.topLeft.y,
    width: points.topRight.x - points.topLeft.x,
    height: points.bottomLeft.y - points.topLeft.y
  }
};

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

export function _computeCircleBounds(node) {
  return {
    left: node.attributes.cx - node.attributes.r,
    top: node.attributes.cy - node.attributes.r,
    width: node.attributes.r * 2,
    height: node.attributes.r * 2
  };
};

export function _computeEllipseBounds(node) {
  return {
    left: node.attributes.cx - node.attributes.rx,
    top: node.attributes.cy - node.attributes.ry,
    width: node.attributes.rx * 2,
    height: node.attributes.ry * 2
  };
};

export function _computeRectBounds(node) {
  return {
    left: node.attributes.x,
    top: node.attributes.y,
    width: node.attributes.width,
    height: node.attributes.height
  };
};

export function _computePathBounds(node) {
  var boundingBox = pathBoundingBox(node.attributes.d);

  return {
    left: boundingBox.x1,
    top: boundingBox.y1,
    width: boundingBox.width,
    height: boundingBox.height
  };
};

export function _computeNodeBounds(node) {
  var points = null;
  var bounds = null;

  switch (node.name) {
    case 'ellipse':
      bounds = _computeEllipseBounds(node);
      break;
    case 'circle':
      bounds = _computeCircleBounds(node);
      break;
    case 'rect':
      bounds = _computeRectBounds(node);
      break;
    case 'path':
      bounds = _computePathBounds(node);
      break;
    default:
      break;
  };

  if (!!bounds) {
    points = _boundsToPoints(bounds);
    points.topLeft = node.matrix.applyToPoint(points.topLeft.x, points.topLeft.y);
    points.topRight = node.matrix.applyToPoint(points.topRight.x, points.topRight.y);
    points.bottomRight = node.matrix.applyToPoint(points.bottomRight.x, points.bottomRight.y);
    points.bottomLeft = node.matrix.applyToPoint(points.bottomLeft.x, points.bottomLeft.y);
    bounds = _pointsToBounds(points);
  }

  return bounds;
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
  cleanNode.bounds = _computeNodeBounds(cleanNode);

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

