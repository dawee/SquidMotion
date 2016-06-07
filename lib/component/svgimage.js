import React from 'react';
import SVGPath from './svgpath';
import SVGRect from './svgrect';
import SVGCircle from './svgcircle';
import SVGEllipse from './svgellipse';

const mapping = {
  path: SVGPath,
  circle: SVGCircle,
  rect: SVGRect,
  ellipse: SVGEllipse,
};

export default class SVGImage extends React.Component {

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

SVGImage.propTypes = {
  image: React.PropTypes.object.isRequired
};
