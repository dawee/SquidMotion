import React from 'react';
import bindAll from '101/bind-all';
import {TableRow, TableRowColumn} from 'material-ui/Table';
import timelineStore from '../store/timeline';

export default class Channel extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onTimelineChange']);
    this.state = {
      channel: {
        name: 'Channel #1'
      },
      timeline: timelineStore.settings
    };

    timelineStore.on('change', this.onTimelineChange);
  }

  onTimelineChange() {
    this.setState({timeline: timelineStore.settings});
  }

  render() {
    let palette = this.context.muiTheme.palette;
    let content = [];
    let timeline = this.state.timeline;
    let gapCount = timeline.length / timeline.gap;
    let titleStyle = {width: 100, backgroundColor: palette.primary1Color};

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

    return (
      <TableRow>
        <TableRowColumn style={titleStyle}>Channel #1</TableRowColumn>
        <TableRowColumn style={{padding: 0}}>
          <svg style={{width: '100%', height: '100%'}}>
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
