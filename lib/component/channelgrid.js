const React = require('react');
const Component = require('../component');
const bindAll = require('101/bind-all');
const animationStore = require('../store/animation');
const timelineStore = require('../store/timeline');
const createStep = require('../action/channel').createStep;

const svg = Component.from('svg');
const ChannelState = Component.require(module, './channelstate');


const rootStyle = {width: '100%', height: '100%'};

class ChannelGrid extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onTimelineChange', 'onChannelChange', 'onDoubleClick']);

    this.state = {
      channel: props.channel,
    };

    animationStore.on(`change:channel:${props.channel.id}`, this.onChannelChange);
  }

  onChannelChange() {
    this.setState({channel: animationStore.getChannel(this.state.channel.id)});
  }

  onDoubleClick(evt) {
    createStep(this.state.channel, timelineStore.settings, evt);
  }

  render() {
    return svg.el({style: rootStyle, onDoubleClick: this.onDoubleClick},
      this.state.channel.steps.map(
        (step) => ChannelState.el({channel: this.state.channel, step: step})
      )
    );
  }
}

ChannelGrid.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ChannelGrid.propTypes = {
  channel: React.PropTypes.object.isRequired,
  timeline: React.PropTypes.object.isRequired,
};

module.exports = ChannelGrid;
