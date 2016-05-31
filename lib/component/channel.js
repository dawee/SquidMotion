import React from 'react';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import ChannelState from './channelstate';
import timelineStore from '../store/timeline';


export default class Channel extends React.Component {

  constructor() {
    super();

    this.state = {
      channel: {
        name: 'Channel #1'
      },
      timeline: timelineStore.settings
    };

    timelineStore.on('change', this.onTimelineChange.bind(this));
  }

  onTimelineChange() {
    this.setState({timeline: timelineStore.settings});
  }

  render() {
    const palette = this.context.muiTheme.palette;
    let content = [];
    let timeline = this.state.timeline;
    let gapCount = timeline.length / timeline.gap;

    for (let index = 0; index < gapCount; ++index) {
      let x = index * timeline.gapWidth;
      let is10Gap = index !== 0 && index % 10 === 0;
      let color = is10Gap ? palette.primary1Color : palette.primary3Color;
      let style = {
        fill: color,
        opacity: 0.5,
        transform: `translateX(${x}px)`,
        transformOrigin: 'center',
        transition: 'transform 0.3s'
      };

      content.push(
        <rect
          key={index}
          x={0}
          y="0"
          width="1"
          height="100%"
          style={style} />
      );
    }

    content.push(<ChannelState key={gapCount + 1} time={0} />);
    content.push(<ChannelState key={gapCount + 2} time={250} />);
    content.push(<ChannelState key={gapCount + 3} time={1000} />);
    content.push(<ChannelState key={gapCount + 4} time={1700} />);

    return (
      <TableRow>
        <TableRowColumn style={{width: 100, backgroundColor: palette.primary1Color}}>Channel #1</TableRowColumn>
        <TableRowColumn style={{padding: 0}}>
          <svg style={{width: '100%', 'height': '100%'}}>
          {content}
          </svg>
        </TableRowColumn>
      </TableRow>
    ); 
  }
}

Channel.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
