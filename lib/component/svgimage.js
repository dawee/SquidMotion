const React = require('react');
const Component = require('../component');

const SVGElement = Component.require(module, './svgelement');
const svg = Component.from('svg');


class SVGImage extends React.Component {

  render() {
    return svg.el(this.props.document, Object.keys(this.props.image).map(
      (id) => SVGElement.el({node: this.props.image[id]})
    ));
  }
}

module.exports = SVGImage;

SVGImage.propTypes = {
  image: React.PropTypes.object.isRequired,
  document: React.PropTypes.object.isRequired
};
