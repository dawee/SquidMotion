const React = require('react');
const SVGElement = require('./svgelement');


class SVGRect extends SVGElement {
  render() {
    return <rect {...this.getAttributes()} />;
  }
}

module.exports = SVGRect;
