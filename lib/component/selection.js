import React from 'react';

export default class Selection extends React.Component {

  render() {
    var bounds = this.props.bounds;
    var style = {
      position: 'absolute',
      top: bounds.top,
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
      border: '1px dashed #333'
    };

    return (
      <div
        x={bounds.left}
        y={bounds.top}
        width={bounds.width}
        height={bounds.height}
        style={style} />
    ); 
  }
}