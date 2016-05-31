import React from 'react';
import timelineStore from '../store/timeline';

export default class ChannelState extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      timeline: timelineStore.settings,
      channelId: 0,
      time: props.time
    };

    timelineStore.on('change', this.onTimelineChange.bind(this));
  }

  onTimelineChange() {
    this.setState({timeline: timelineStore.settings});
  }

  render() {
    const palette = this.context.muiTheme.palette;
    const x = (this.state.time / this.state.timeline.gap) * this.state.timeline.gapWidth;
    const size = 10;
    const transform = `translate(${x}px,-50%) rotate(45)`;
    const style = {
      transform: transform,
      transformOrigin: 'center',
      fill: palette.accent1Color,
      stroke: palette.accent3Color,
      transition: 'transform 0.1s'
    };

    return (
      <rect
        x={1}
        y="50%"
        width={size}
        height={size}
        style={style} />
    );
  }
}

ChannelState.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
