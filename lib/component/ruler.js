import React from 'react';
import bindAll from '101/bind-all';
import timelineStore from '../store/timeline';

const style = {
  width: '100%',
  height: '100%'
};

export default class Ruler extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onTimelineChange']);
    this.state = {
      timeline: timelineStore.settings
    };

    timelineStore.on('change', this.onTimelineChange);
  }

  onTimelineChange() {
    this.setState({timeline: timelineStore.settings});
  }

  render() {
    const timeline = this.state.timeline;
    const gapCount = timeline.length / timeline.gap;
    const palette = this.context.muiTheme.palette;
    let gapLines = [];

    for (let index = 0; index < gapCount; ++index) {
      let x = index * timeline.gapWidth;
      let is10Gap = index !== 0 && index % 10 === 0;
      let y = is10Gap ? '70%' : '90%';
      let height = is10Gap ? '30%' : '10%';
      let gapStyle = {
        fill: is10Gap ? palette.primary1Color : palette.primary3Color,
        transform: `translateX(${x}px)`,
        transformOrigin: 'center',
        transition: 'transform 0.3s'
      };

      gapLines.push(
        <rect key={index} x={0} y={y} width={1} height={height} style={gapStyle} />
      );
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
