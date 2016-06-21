const React = require('react');
const Component = require('../component');
const bindAll = require('101/bind-all');
const timelineStore = require('../store/timeline');

const rect = Component.from('rect');
const svg = Component.from('svg');
const ChannelState = Component.require(module, './channelstate');


class ChannelGrid extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onTimelineChange']);

    this.state = {
      channel: props.channel,
      timeline: timelineStore.settings
    };

    timelineStore.on('change', this.onTimelineChange);
  }

  onTimelineChange() {
    this.setState({timeline: timelineStore.settings});
  }

  render() {
    let content = [];
    let palette = this.context.muiTheme.palette;
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
        rect.el({key: index, x: 0, y: 0, width: 1, height:'100%', style: style})
      );
    }

    for (const step of this.state.channel.steps) {
      content.push(ChannelState.el({time: step.time}));
    }

    return svg.el({style: {width: '100%', height: '100%'}}, content);
  }
}

ChannelGrid.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ChannelGrid.propTypes = {
  channel: React.PropTypes.object.isRequired,
};

module.exports = ChannelGrid;