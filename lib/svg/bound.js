import pathBoundingBox from 'svg-path-bounding-box';


export function boundsToPoints(bounds) {
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
  };
}

export function pointsToBounds(points) {
  return {
    left: points.topLeft.x,
    top: points.topLeft.y,
    width: points.topRight.x - points.topLeft.x,
    height: points.bottomLeft.y - points.topLeft.y
  };
}

export function computeCircleBounds(node) {
  return {
    left: node.attributes.cx - node.attributes.r,
    top: node.attributes.cy - node.attributes.r,
    width: node.attributes.r * 2,
    height: node.attributes.r * 2
  };
}

export function computeEllipseBounds(node) {
  return {
    left: node.attributes.cx - node.attributes.rx,
    top: node.attributes.cy - node.attributes.ry,
    width: node.attributes.rx * 2,
    height: node.attributes.ry * 2
  };
}

export function computeRectBounds(node) {
  return {
    left: node.attributes.x,
    top: node.attributes.y,
    width: node.attributes.width,
    height: node.attributes.height
  };
}

export function computePathBounds(node) {
  let boundingBox = pathBoundingBox(node.attributes.d);

  return {
    left: boundingBox.x1,
    top: boundingBox.y1,
    width: boundingBox.width,
    height: boundingBox.height
  };
}

export function computeNodeBounds(node) {
  let points = null;
  let bounds = null;

  switch (node.name) {
    case 'ellipse':
      bounds = computeEllipseBounds(node);
      break;
    case 'circle':
      bounds = computeCircleBounds(node);
      break;
    case 'rect':
      bounds = computeRectBounds(node);
      break;
    case 'path':
      bounds = computePathBounds(node);
      break;
    default:
      break;
  }

  if (!!bounds) {
    points = boundsToPoints(bounds);
    points.topLeft = node.matrix.applyToPoint(points.topLeft.x, points.topLeft.y);
    points.topRight = node.matrix.applyToPoint(points.topRight.x, points.topRight.y);
    points.bottomRight = node.matrix.applyToPoint(points.bottomRight.x, points.bottomRight.y);
    points.bottomLeft = node.matrix.applyToPoint(points.bottomLeft.x, points.bottomLeft.y);
    bounds = pointsToBounds(points);
  }

  return bounds;
}
