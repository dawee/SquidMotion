const React = require('react');
const SVGElement = require('./svgelement');


class SVGEllipse extends SVGElement {
  render() {
    return <ellipse {...this.getAttributes()} />;
  }

}

module.exports = SVGEllipse;
