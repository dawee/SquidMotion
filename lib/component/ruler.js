const React = require('react');
const Component = require('../component');
const range = require('range-iterable').range;
const bindAll = require('101/bind-all');
const timelineStore = require('../store/timeline');

const rect = Component.from('rect');
const svg = Component.from('svg');

const style = {
  width: '100%',
  height: '100%'
};


class Ruler extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onTimelineChange', 'renderLine']);
    this.state = {
      timeline: timelineStore.settings
    };

    timelineStore.on('change', this.onTimelineChange);
  }

  onTimelineChange() {
    this.setState({timeline: timelineStore.settings});
  }

  renderLine(index) {
    const palette = this.context.muiTheme.palette;
    const x = index * this.state.timeline.gapWidth;
    const is10Gap = index !== 0 && index % 10 === 0;
    const y = is10Gap ? '70%' : '90%';
    const height = is10Gap ? '30%' : '10%';
    const gapStyle = {
      fill: is10Gap ? palette.primary1Color : palette.primary3Color,
      transform: `translateX(${x}px)`,
      transformOrigin: 'center',
      transition: 'transform 0.3s'
    };

    return rect.el({x: 0, y: y, width: 1, height: height, style: gapStyle});
  }

  render() {
    const gapCount = this.state.timeline.length / this.state.timeline.gap;

    return svg.el({style: style}, [...range(gapCount).map(this.renderLine)]);
  }
}

Ruler.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

module.exports = Ruler;
