import hat from 'hat';
import omit from '101/omit';
import pick from '101/pick';
import sax from 'sax';
import transformParser from 'svg-transform-parser';
import {createAction} from './action';
import {readFile} from '../native';

const paintingProperties = [
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'stroke-linecap',
  'stroke-linejoin',
  'fill',
  'fill-rule',
  'fill-opacity'
];

export function _parseTransform(transform) {
  return !!transform ? transformParser.parse(transform) : null;
};

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

export function _computeNodeBounds(node) {
  var bounds = null;

  switch (node.name) {
    case 'circle':
      bounds = _computeCircleBounds(node);
      break;
    default:
      break;
  };

  return bounds;
};

export function _cleanup(node, id) {
  var cleanNode = {};

  cleanNode.id = id;
  cleanNode.name = node.name;
  cleanNode.bounds = _computeNodeBounds(node);
  cleanNode.baseTransform = _parseTransform(node.attributes.transform);
  cleanNode.attributes = Object.assign(
    omit(node.attributes, ['style', 'id']),
    pick(
      _parseStyleAttribute(node.attributes.style),
      paintingProperties
    )
  );

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
    mapping[id] = _cleanup(node, id);

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

export const selectElement = createAction((elementId, done) => {
  done(null, {elementId: elementId});
});
