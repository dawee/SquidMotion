import React from 'react';
import SVGGroup from './svggroup';
import SVGPath from './svgpath';
import SVGCircle from './svgcircle';
import SVGEllipse from './svgellipse';


export default class SVGImage extends React.Component {

  renderChildren(children) {
    return children.map((node, index) => {
      var component = null;

      switch(node.name) {
        case 'g':
          component = <SVGGroup key={index} attributes={node.attributes} content={this.renderChildren(node.children)} />;
          break;
        case 'path':
          component = <SVGPath key={index} attributes={node.attributes} />;
          break;
        case 'circle':
          component = <SVGCircle key={index} attributes={node.attributes} />;
          break;
        case 'ellipse':
          component = <SVGEllipse key={index} attributes={node.attributes} />;
          break;
        default:
          break;
      };

      return component;
    });
  }

  render() {
    var content = this.renderChildren(this.props.image.children);
    var attributes = this.props.image.attributes;

    return (
      <svg width={attributes.width} height={attributes.height}>
      {content}
      </svg>
    )
  }
}
