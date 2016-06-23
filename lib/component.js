const React = require('react');

let instances = {};

class ElementGenerator {
  constructor(source) {
    this.source = source;
  }

  el(props, childrenArray) {
    let children = childrenArray;

    if (Array.isArray(children) && children.length === 1) children = children[0];

    return React.createElement(this.source, props, children);
  }

  static get(source) {
    if (! (source in instances)) instances[source] = new ElementGenerator(source);

    return instances[source];
  }
}

exports.from = (source) => ElementGenerator.get(source);

exports.require = (module, id, sub) => {
  let imported = module.require(id);
  let autoSub = sub;

  if (!!imported && !autoSub && 'default' in imported) autoSub = 'default';
  if (!!autoSub) imported = imported[autoSub];

  return ElementGenerator.get(imported);
};
