import React from 'react';

export default class ChannelState extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      timeline: {
        length: 10000,
        gap: 10,
        gapWidth: 5
      },
      channelId: 0,
      time: props.time
    };
  }

  render() {
    const timeline = this.state.timeline;
    const palette = this.context.muiTheme.palette;
    const x = (this.state.time / timeline.gap) * timeline.gapWidth;


    return (
      <rect
        x={x}
        y="50%"
        width="10"
        height="10"
        style={{transform: 'translate(-50%,-50%) rotate(45deg)', transformOrigin: 'center', fill: palette.accent1Color, stroke: palette.accent3Color}} />
    ); 
  }
}

ChannelState.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
