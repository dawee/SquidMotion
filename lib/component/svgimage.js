import React from 'react';

class SVGPath extends React.Component {
  render() {
    var attributes = this.props.attributes;

    return (
      <path
        id={attributes.id}
        transform={attributes.transform}
        d={attributes.d} />
    )
  }
}

class SVGGroup extends React.Component {
  render() {
    var attributes = this.props.attributes;

    return <g id={attributes.id} transform={attributes.transform}></g>;
  }
}

export default class SVGImage extends React.Component {

  renderChildren(children) {
    return children.map((node) => {
      var content = this.renderChildren(node.children);
      var component = null;

      switch(node.name) {
        case 'g':
          component = <SVGGroup attributes={node.attributes}>{content}</SVGGroup>;
          break;
        case 'path':
          component = <SVGPath attributes={node.attributes} />;
          break;
        default:
          component = <i />
          break;
      };

      return component;
    });
  }


  render() {
    var content = this.renderChildren(this.props.root.children);
    var attributes = this.props.root.attributes;

    return (
      <svg width={attributes.width} height={attributes.height}>
      {content}
      </svg>
    )
  }
}
