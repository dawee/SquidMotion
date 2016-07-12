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

    this.state = {
      timeline: TimelineStore.get({fileId: this.props.fileId}),
      selected: StepStore.isSelected(this.props.fileId, this.props.stepId),
      step: StepStore.get({stepId: this.props.stepId}),
    };
  }

  onMouseDown() {
    actions.selectStep(this.props.fileId, this.props.channelId, this.props.stepId);
  }

  onStepStoreChange() {
    this.setState({
      selected: StepStore.isSelected(this.props.fileId, this.props.stepId),
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
      fill: this.state.selected ? 'white' : palette.accent1Color,
      stroke: palette.accent3Color,
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

module.exports = ChannelStep;


ChannelStep.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ChannelStep.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  channelId: React.PropTypes.string.isRequired,
  stepId: React.PropTypes.string.isRequired,
};
