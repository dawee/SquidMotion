const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const StepStore = require('../store/step');

const g = Human.from('g');
const ChannelStep = Human.require(module, './channelstep');

class ChannelGrid extends Squid.Component {

  constructor(props) {
    super(props);
    StepStore.on('change', this.onStepStoreChange);
  }

  initState() {
    this.state = {stepIDs: StepStore.allIDs(this.props.channelId)};
  }

  onStepStoreChange() {
    this.setState({stepIDs: StepStore.allIDs(this.props.channelId)});
  }

  render() {
    return (
      g.el(null,
        this.state.stepIDs.map((stepId) => ChannelStep.el({
          fileId: this.props.fileId,
          animationId: this.props.animationId,
          channelId: this.props.channelId,
          stepId: stepId,
          key: stepId,
        }))
      )
    );
  }
}

ChannelGrid.events = ['onStepStoreChange'];


ChannelGrid.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  animationId: React.PropTypes.string.isRequired,
  channelId: React.PropTypes.string.isRequired,
};


module.exports = ChannelGrid;
