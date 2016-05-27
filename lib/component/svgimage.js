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

  renderChildren(children) {
    return children.map((child, index) => {
      let node = this.props.image.mapping[child.id];
      let ElementType = node.name in mapping ? mapping[node.name] : null;

      if (child.children.length > 0) return this.renderChildren(child.children);

      return ElementType !== null ? (
        <ElementType key={index} id={node.id} />
      ) : null;
    });
  }

  render() {
    let content = this.renderChildren(this.props.image.root.children);
    let attributes = this.props.image.mapping[this.props.image.root.id].attributes;

    return (
      <svg width={attributes.width} height={attributes.height}>
      {content}
      </svg>
    )
  }
}
