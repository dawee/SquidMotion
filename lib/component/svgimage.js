import React from 'react';

class SVGGroup extends React.Component {
  render() {
    var attributes = this.props.attributes;
       
    return <g transform={attributes.transform} >{this.props.content}</g>;
  }
}

class SVGElement extends React.Component {
  onClick() {}

  onContextMenu() {}

  onDoubleClick() {}

  onDrag() {}

  onDragEnd() {}

  onDragEnter() {}

  onDragExit() {}

  onDragLeave() {}

  onDragOver() {}

  onDragStart() {}

  onDrop() {}

  onMouseDown() {}

  onMouseEnter() {}

  onMouseLeave() {}

  onMouseMove() {}

  onMouseOut() {}

  onMouseOver() {}

  onMouseUp() {}
}

class SVGPath extends SVGElement {
  render() {
    var attributes = this.props.attributes;

    return (
      <path
        id={attributes.id}
        style={attributes.style}
        transform={attributes.transform}
        onClick={this.onClick}
        onContextMenu={this.onContextMenu}
        onDoubleClick={this.onDoubleClick}
        onDrag={this.onDrag}
        onDragEnd={this.onDragEnd}
        onDragEnter={this.onDragEnter}
        onDragExit={this.onDragExit}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDragStart={this.onDragStart}
        onDrop={this.onDrop}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        onMouseUp={this.onMouseUp}
        d={attributes.d} />
    )
  }
}

class SVGCircle extends SVGElement {
  render() {
    var attributes = this.props.attributes;

    return (
      <circle
        id={attributes.id}
        style={attributes.style}
        transform={attributes.transform}
        onClick={this.onClick}
        onContextMenu={this.onContextMenu}
        onDoubleClick={this.onDoubleClick}
        onDrag={this.onDrag}
        onDragEnd={this.onDragEnd}
        onDragEnter={this.onDragEnter}
        onDragExit={this.onDragExit}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDragStart={this.onDragStart}
        onDrop={this.onDrop}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        onMouseUp={this.onMouseUp}
        cx={attributes.cx}
        cy={attributes.cy}
        r={attributes.r} />
    )
  }
}

class SVGEllipse extends SVGElement {
  render() {
    var attributes = this.props.attributes;

    return (
      <ellipse
        id={attributes.id}
        style={attributes.style}
        transform={attributes.transform}
        onClick={this.onClick}
        onContextMenu={this.onContextMenu}
        onDoubleClick={this.onDoubleClick}
        onDrag={this.onDrag}
        onDragEnd={this.onDragEnd}
        onDragEnter={this.onDragEnter}
        onDragExit={this.onDragExit}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDragStart={this.onDragStart}
        onDrop={this.onDrop}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        onMouseUp={this.onMouseUp}
        rx={attributes.rx}
        ry={attributes.ry}
        cx={attributes.cx}
        cy={attributes.cy}
        r={attributes.r} />
    )
  }
}

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
          component = <i key={index} />
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
