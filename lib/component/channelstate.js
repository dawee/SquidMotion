import React from 'react';
import bindAll from '101/bind-all';
import timelineStore from '../store/timeline';


export default class ChannelState extends React.Component {

  constructor(props) {
    super(props);
    bindAll(this, ['onTimelineChange']);

    this.state = {
      timeline: timelineStore.settings,
      channelId: 0,
      time: props.time
    };

    timelineStore.on('change', this.onTimelineChange);
  }

  onTimelineChange() {
    this.setState({timeline: timelineStore.settings});
  }

  render() {
    const palette = this.context.muiTheme.palette;
    const x = (this.state.time / this.state.timeline.gap) * this.state.timeline.gapWidth;
    const size = 10;
    const style = {
      transform: 'rotate(45deg) translate(-6px,0)',
      transformOrigin: 'center center',
      fill: palette.accent1Color,
      stroke: palette.accent3Color,
      transition: 'transform 0.1s'
    };

    return (
      <rect
        x={x}
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

ChannelState.propTypes = {
  time: React.PropTypes.number.isRequired
};
