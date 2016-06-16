const React = require('react');
const SVGElement = require('./svgelement');


class SVGCircle extends SVGElement {
  render() {
    return <circle {...this.getAttributes()} />;
  }
}

module.exports = SVGCircle;
