const React = require('react');
const Component = require('../component');
const bindAll = require('101/bind-all');
const animationStore = require('../store/animation');
const timelineStore = require('../store/timeline');
const selectStep = require('../action/channel').selectStep;

const rect = Component.from('rect');

class ChannelState extends React.Component {

  constructor(props) {
    super(props);
    bindAll(this, [
      'onTimelineChange',
      'onCurrentStepChange',
      'onMouseDown',
    ]);

    this.state = {
      timeline: timelineStore.settings,
      selected: animationStore.isCurrentStep(props.step),
    };

    timelineStore.on('change', this.onTimelineChange);
    animationStore.on('change:step:current', this.onCurrentStepChange);
  }

  onMouseDown() {
    selectStep(this.props.channel, this.props.step);
  }

  onCurrentStepChange() {
    this.setState({selected: animationStore.isCurrentStep(this.props.step)});
  }

  onTimelineChange() {
    this.setState({timeline: timelineStore.settings});
  }

  render() {
    const palette = this.context.muiTheme.palette;
    const x = (this.props.step.time / this.state.timeline.gap) * this.state.timeline.gapWidth;
    const size = 10;
    const style = {
      transform: 'rotate(45deg) translate(-6px,0)',
      transformOrigin: 'center center',
      fill: this.state.selected ? 'white' : palette.accent1Color,
      stroke: palette.accent3Color,
      transition: 'transform 0.1s',
    };

    return rect.el({
      x: x,
      y: '50%',
      width: size,
      height: size,
      style: style,
      onMouseDown: this.onMouseDown,
    });
  }
}

module.exports = ChannelState;


ChannelState.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ChannelState.propTypes = {
  channel: React.PropTypes.object.isRequired,
  step: React.PropTypes.object.isRequired,
};
