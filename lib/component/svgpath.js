const React = require('react');
const SVGElement = require('./svgelement');


class SVGPath extends SVGElement {
  render() {
    return <path {...this.getAttributes()} />;
  }
}

module.exports = SVGPath;
