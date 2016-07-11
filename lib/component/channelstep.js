const React = require('react');
const Human = require('human-component');
const TimelineStore = require('../store/timeline');
const StepStore = require('../store/step');

const rect = Human.from('rect');

class ChannelStep extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      timeline: TimelineStore.get({fileId: this.props.fileId}),
      selected: false,
      step: StepStore.get({stepId: this.props.stepId}),
    };
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
