import React from 'react';
import SVGGroup from './svggroup';
import SVGPath from './svgpath';
import SVGRect from './svgrect';
import SVGCircle from './svgcircle';
import SVGEllipse from './svgellipse';


export default class SVGImage extends React.Component {

  renderChildren(children) {
    return children.map((child, index) => {
      var component = null;
      var node = this.props.image.mapping[child.id];
      var ElementType = null;

      switch(node.name) {
        case 'g':
          ElementType = SVGGroup;
          break;
        case 'path':
          ElementType = SVGPath;
          break;
        case 'circle':
          ElementType = SVGCircle;
          break;
        case 'rect':
          ElementType = SVGRect;
          break;
        case 'ellipse':
          ElementType = SVGEllipse;
          break;
        default:
          break;
      };

      return ElementType !== null ? (
        <ElementType
          key={index}
          id={node.id}
          content={this.renderChildren(child.children)}
          bounds={node.bounds}
          attributes={node.attributes} />
      ) : null;
    });
  }

  render() {
    var content = this.renderChildren(this.props.image.root.children);
    var attributes = this.props.image.mapping[this.props.image.root.id].attributes;

    return (
      <svg width={attributes.width} height={attributes.height}>
      {content}
      </svg>
    )
  }
}
