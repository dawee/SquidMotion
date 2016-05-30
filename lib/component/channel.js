import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';


export default class Channel extends React.Component {

  constructor() {
    super();

    this.state = {
      channel: {
        name: 'Channel #1'
      },
      timeline: {
        length: 10000,
        gap: 10,
        gapWith: 5
      }
    };
  }

  render() {
    const palette = this.context.muiTheme.palette;
    let gapLines = [];
    let timeline = this.state.timeline;
    let gapCount = timeline.length / timeline.gap;

    for (let index = 0; index < gapCount; ++index) {
      let x = index * timeline.gapWith;
      let is10Gap = index !== 0 && index % 10 === 0;
      let color = is10Gap ? palette.primary1Color : palette.primary3Color;

      gapLines.push(
        <rect
          key={index}
          x={x}
          y="0"
          width="1"
          height="100%"
          style={{fill: color, opacity: 0.5}} />
      );
    }

    return (
      <TableRow>
        <TableRowColumn style={{width: 100, backgroundColor: palette.primary1Color}}>Channel #1</TableRowColumn>
        <TableRowColumn style={{padding: 0}}>
          <svg style={{width: '100%', 'height': '100%'}}>
          {gapLines}
          </svg>
        </TableRowColumn>
      </TableRow>
    ); 
  }
}

Channel.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
