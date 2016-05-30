import React from 'react';

const style = {
  width: '100%',
  height: '100%'
};

export default class Ruler extends React.Component {

  constructor() {
    super();

    this.state = {
      timeline: {
        length: 10000,
        gap: 10,
        gapWith: 5
      }
    };
  }

  render() {
    let gapLines = [];
    let timeline = this.state.timeline;
    let gapCount = timeline.length / timeline.gap;
    let palette = this.context.muiTheme.palette;

    for (let index = 0; index < gapCount; ++index) {
      let x = index * timeline.gapWith;
      let is10Gap = index !== 0 && index % 10 === 0;
      let y = is10Gap ? '70%' : '90%';
      let height = is10Gap ? '30%' : '10%';
      let color = is10Gap ? palette.primary1Color : palette.primary3Color;

      gapLines.push(
        <rect
          ref={index}
          x={x}
          y={y}
          width="1"
          height={height}
          style={{fill: color}} />
      )
    }

    return (
      <svg style={style}>
        {gapLines}
      </svg>
    ); 
  }
}

Ruler.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
