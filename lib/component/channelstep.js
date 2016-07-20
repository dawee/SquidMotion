const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const TimelineStore = require('../store/timeline');
const StepStore = require('../store/step');
const actions = require('../actions');

const rect = Human.from('rect');

class ChannelStep extends Squid.Component {

  constructor(props) {
    super(props);
    StepStore.on('change', this.onStepStoreChange);
  }

  initState() {
    this.state = {
      timeline: TimelineStore.get({animationId: this.props.animationId}),
      selected: StepStore.isSelected(this.props.animationId, this.props.stepId),
      step: StepStore.get({stepId: this.props.stepId}),
    };
  }

  onMouseDown() {
    actions.selectStep(this.props, this.props.stepId);
  }

  onStepStoreChange() {
    this.setState({
      selected: StepStore.isSelected(this.props.animationId, this.props.stepId),
      step: StepStore.get({stepId: this.props.stepId}),
    });
  }

  render() {
    const palette = this.context.muiTheme.palette;
    const x = (this.state.step.time / this.state.timeline.gap) * this.state.timeline.gapWidth;
    const size = 10;
    const style = {
      transform: 'rotate(45deg) translate(-6px,0)',
      transformOrigin: 'center center',
      fill: this.state.selected ? palette.accent1Color : palette.primary3Color,
      stroke: palette.borderColor,
      transition: 'transform 0.1s',
    };

    return rect.el({
      x, style,
      y: '50%',
      width: size,
      height: size,
      onMouseDown: this.onMouseDown,
    });
  }
}

ChannelStep.events = ['onMouseDown', 'onStepStoreChange'];


ChannelStep.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  animationId: React.PropTypes.string.isRequired,
  channelId: React.PropTypes.string.isRequired,
  stepId: React.PropTypes.string.isRequired,
};

module.exports = ChannelStep;
