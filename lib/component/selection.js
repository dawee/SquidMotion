import React from 'react';

export default class Selection extends React.Component {

  render() {
    let bounds = this.props.bounds;
    let style = {
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
