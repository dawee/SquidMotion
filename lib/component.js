const React = require('react');

class ElementGenerator {
  constructor(source) {
    this.source = source;
  }

  el(props, childrenArray) {
    let children = childrenArray;

    return React.createElement(this.source, props, children);
  }
}

exports.require = (module, id, sub) => {
  let imported = module.require(id);
  let autoSub = sub;

  if (!!imported && !autoSub && 'default' in imported) autoSub = 'default';
  if (!!autoSub) imported = imported[autoSub];

  return new ElementGenerator(imported);
};

exports.from = (source) => new ElementGenerator(source);
