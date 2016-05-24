import React from 'react';
import SVGElement from './svgelement';


export default class SVGEllipse extends SVGElement {
  render() {
    var attributes = this.props.attributes;

    return (
      <ellipse
        id={attributes.id}
        style={attributes.style}
        transform={attributes.transform}
        onClick={this.onClick.bind(this)}
        onContextMenu={this.onContextMenu.bind(this)}
        onDoubleClick={this.onDoubleClick.bind(this)}
        onDrag={this.onDrag.bind(this)}
        onDragEnd={this.onDragEnd.bind(this)}
        onDragEnter={this.onDragEnter.bind(this)}
        onDragExit={this.onDragExit.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        onDragOver={this.onDragOver.bind(this)}
        onDragStart={this.onDragStart.bind(this)}
        onDrop={this.onDrop.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
        onMouseEnter={this.onMouseEnter.bind(this)}
        onMouseLeave={this.onMouseLeave.bind(this)}
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseUp={this.onMouseUp.bind(this)}
        rx={attributes.rx}
        ry={attributes.ry}
        cx={attributes.cx}
        cy={attributes.cy}
        r={attributes.r} />
    )
  }
}