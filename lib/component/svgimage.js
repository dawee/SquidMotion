const React = require('react');
const Component = require('../component');
const SVGElement = require('./svgelement');

const svg = Component.from('svg');

class SVGImage extends Component {

  render() {
    return svg.el(this.props.document, Object.keys(this.props.image).map(
      (id, index) => SVGElement.el({key: index, node: this.props.image[id]})
    ));
  }
}

module.exports = SVGImage;

SVGImage.propTypes = {
  image: React.PropTypes.object.isRequired,
  document: React.PropTypes.object.isRequired
};
