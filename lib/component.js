const React = require('react');

let instances = {};

class ElementGenerator {
  constructor(source) {
    this.source = source;
  }

  el(props, ...children) {
    let content = [];

    for (const child of children) {
      if (Array.isArray(child)) {
        content = content.concat(child);
      } else if (child !== null) {
        content.push(child);
      }
    }

    if (Array.isArray(content) && content.length === 0) content = null;
    if (Array.isArray(content) && content.length === 1) content = content[0];

    return React.createElement(this.source, props, content);
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
