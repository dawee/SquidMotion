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
    left: node.attributes.rx - node.attributes.r,
    top: node.attributes.ry - node.attributes.r,
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
};

export function _parseAttributes(attributes) {
  if ('style' in attributes) {
    attributes.style = _parseStyleAttribute(attributes.style);
  }

  return attributes;
};

export function _parse(svgString) {
  var svgRoot = {children: []};
  var ctx = svgRoot;
  var parser = sax.parser(true);

  parser.onopentag = (node) => {
    var parent = ctx;
    var child = {
      children: [],
      parent: parent,
      name: node.name,
      bounds: _computeNodeBounds(node),
      attributes: _parseAttributes(node.attributes)
    };

    parent.children.push(child);
    ctx = child;
  };

  parser.onclosetag = () => {
    var parent = ctx.parent;

    delete ctx.parent;
    ctx = parent;
  };
  
  parser.write(svgString).close();
  return svgRoot.children[0];
};

export const importSVG = createAction((svgFile, done) => {
  readFile(svgFile, (data) => {
    done(null, {image: _parse(data)});
  });
});
