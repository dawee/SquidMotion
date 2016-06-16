const React = require('react');
const SVGPath = require('./svgpath');
const SVGRect = require('./svgrect');
const SVGCircle = require('./svgcircle');
const SVGEllipse = require('./svgellipse');

const mapping = {
  path: SVGPath,
  circle: SVGCircle,
  rect: SVGRect,
  ellipse: SVGEllipse,
};

class SVGImage extends React.Component {

  renderNode(node, index) {
    let ElementType = node.name in mapping ? mapping[node.name] : null;

    return ElementType !== null ? (
      <ElementType key={index} node={node} />
    ) : null;
  }

  render() {
    let content = Object.keys(this.props.image).map(
      (id, index) => this.renderNode(this.props.image[id], index)
    );

    return (
      <svg width={this.props.document.width} height={this.props.document.height}>
      {content}
      </svg>
    );
  }
}

module.exports = SVGImage;

SVGImage.propTypes = {
  image: React.PropTypes.object.isRequired
};
