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

      switch(node.name) {
        case 'g':
          component = <SVGGroup key={index} attributes={node.attributes} content={this.renderChildren(child.children)} />;
          break;
        case 'path':
          component = <SVGPath key={index} attributes={node.attributes} />;
          break;
        case 'circle':
          component = <SVGCircle key={index} attributes={node.attributes} />;
          break;
        case 'rect':
          component = <SVGRect key={index} attributes={node.attributes} />;
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
    var content = this.renderChildren(this.props.image.root.children);
    var attributes = this.props.image.mapping[this.props.image.root.id].attributes;

    return (
      <svg width={attributes.width} height={attributes.height}>
      {content}
      </svg>
    )
  }
}
