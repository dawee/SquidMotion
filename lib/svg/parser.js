import hat from 'hat';
import omit from '101/omit';
import sax from 'sax';
import * as matrix from './matrix';


export function parseStyleAttribute(styleAttribute) {
  let style = {};

  (styleAttribute || '').split(';').forEach((line) => {
    let match = line.match(/^\s*(.*)\s*:\s*(.*)\s*$/);

    if (!!match) style[match[1]] = match[2];
  });

  return style;
}

export function cleanup(node, id, parent) {
  let baseMatrix = matrix.fromTransformString(node.attributes.transform);
  let cleanNode = {
    attributes:  Object.assign(
      parseStyleAttribute(node.attributes.style),
      omit(
        node.attributes,
        ['id', 'style', 'transform']
      )
    )
  };

  if (!!parent && !!parent.matrix) {
    cleanNode.matrix = matrix.deserialize(parent.matrix).multiply(baseMatrix);
  } else {
    cleanNode.matrix = matrix.serialize(baseMatrix);
  }

  cleanNode.id = id;
  cleanNode.name = node.name;

  return cleanNode;
}

export function parse(svgString) {
  let mapping = {};
  let svgRoot = {children: []};
  let ctx = svgRoot;
  let parser = sax.parser(true);

  parser.onopentag = (node) => {
    let id = node.attributes.id || hat();
    let parent = ctx;
    let child = {
      id: id,
      children: [],
      parent: parent,
    };

    parent.children.push(child);
    mapping[id] = cleanup(node, id, mapping[parent.id]);

    ctx = child;
  };

  parser.onclosetag = () => {
    let parent = ctx.parent;

    delete ctx.parent;
    ctx = parent;
  };

  parser.write(svgString).close();
  return {root: svgRoot.children[0], mapping: mapping};
}
