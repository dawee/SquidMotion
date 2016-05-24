import hat from 'hat';
import sax from 'sax';
import {createAction} from './action';
import {readFile} from '../native';


export function _parseStyleAttribute(styleAttribute) {
  var style = {};

  styleAttribute.split(';').forEach((line) => {
    var match = line.match(/^\s*(.*)\s*:\s*(.*)\s*$/);

    if (!!match) style[match[1]] = match[2];
  });

  return style
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

export function _parseAttributes(attributes) {
  if ('style' in attributes) {
    attributes.style = _parseStyleAttribute(attributes.style);
  }

  delete attributes.id;
  return attributes;
};

export function _parse(svgString) {
  var mapping = {};
  var svgRoot = {children: []};
  var ctx = svgRoot;
  var parser = sax.parser(true);

  parser.onopentag = (node) => {
    var id = hat();
    var parent = ctx;
    var child = {
      id: id,
      children: [],
      parent: parent,
    };

    parent.children.push(child);
    mapping[id] = {
      id: id,
      name: node.name,
      bounds: _computeNodeBounds(node),
      attributes: _parseAttributes(node.attributes)
    };
    
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
