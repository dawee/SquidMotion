import Store from './store';
import {importSVG} from '../action/svg';
import {Matrix as TransformMatrix} from 'transformation-matrix-js';
import pathBoundingBox from 'svg-path-bounding-box';


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
}

export function _pointsToBounds(points) {
  return {
    left: points.topLeft.x,
    top: points.topLeft.y,
    width: points.topRight.x - points.topLeft.x,
    height: points.bottomLeft.y - points.topLeft.y
  }
}

export function _computeCircleBounds(node) {
  return {
    left: node.attributes.cx - node.attributes.r,
    top: node.attributes.cy - node.attributes.r,
    width: node.attributes.r * 2,
    height: node.attributes.r * 2
  };
}

export function _computeEllipseBounds(node) {
  return {
    left: node.attributes.cx - node.attributes.rx,
    top: node.attributes.cy - node.attributes.ry,
    width: node.attributes.rx * 2,
    height: node.attributes.ry * 2
  };
}

export function _computeRectBounds(node) {
  return {
    left: node.attributes.x,
    top: node.attributes.y,
    width: node.attributes.width,
    height: node.attributes.height
  };
}

export function _computePathBounds(node) {
  var boundingBox = pathBoundingBox(node.attributes.d);

  return {
    left: boundingBox.x1,
    top: boundingBox.y1,
    width: boundingBox.width,
    height: boundingBox.height
  };
}

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
  }

  if (!!bounds) {
    points = _boundsToPoints(bounds);
    points.topLeft = node.matrix.applyToPoint(points.topLeft.x, points.topLeft.y);
    points.topRight = node.matrix.applyToPoint(points.topRight.x, points.topRight.y);
    points.bottomRight = node.matrix.applyToPoint(points.bottomRight.x, points.bottomRight.y);
    points.bottomLeft = node.matrix.applyToPoint(points.bottomLeft.x, points.bottomLeft.y);
    bounds = _pointsToBounds(points);
  }

  return bounds;
}

class ImageStore extends Store {

  constructor() {
    super();

    this.live = null;
    this.register(importSVG, this.onImportSVG);
  }

  onImportSVG(opts) {
    this.live = opts.image;

    Object.keys(this.live.mapping).forEach((id) => {
      var node = this.live.mapping[id];

     node.bounds = _computeNodeBounds(node);
    });

    this.emit('change');
  }

  translateNode(id, tx, ty) {
    var node = this.live.mapping[id];

    node.matrix = TransformMatrix.from(
      node.matrix.a, node.matrix.b, node.matrix.c,
      node.matrix.d, node.matrix.e, node.matrix.f
    );

    node.matrix.translate(tx, ty);
    node.bounds = _computeNodeBounds(node);

    this.emit('change:' + id); 
  }

}

export default new ImageStore();