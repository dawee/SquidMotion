const React = require('react');
const Component = require('../component');
const range = require('range-iterable').range;
const bindAll = require('101/bind-all');
const timelineStore = require('../store/timeline');

const g = Component.from('g');
const rect = Component.from('rect');
const svg = Component.from('svg');
const text = Component.from('text');


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

  renderLineLabel(index, coord) {
    const palette = this.context.muiTheme.palette;
    const time = index * this.state.timeline.gap;

    return text.el({x: 0, y: `${coord.y - 5}%`, style: {
      fill: palette.primary3Color,
      transform: `translateX(${coord.x}px)`,
      transformOrigin: 'center',
      transition: 'transform 0.3s',
      textAlign: 'center'
    }}, `${time / 1000}s`);
  }

  renderLine(index) {
    const is10Gap = index % 10 === 0;
    const palette = this.context.muiTheme.palette;
    const x = index * this.state.timeline.gapWidth;
    const y = is10Gap ? '70' : '90';
    const height = is10Gap ? '30' : '10';
    const gapStyle = {
      fill: is10Gap ? palette.primary1Color : palette.primary3Color,
      transform: `translateX(${x}px)`,
      transformOrigin: 'center',
      transition: 'transform 0.3s'
    };

    return g.el(null, [
      rect.el({x: 0, y: `${y}%`, width: 1, height: `${height}%`, style: gapStyle})
    ].concat(is10Gap ? [this.renderLineLabel(index, {x: x, y: y})] : []));
  }

  render() {
    const gapCount = this.state.timeline.length / this.state.timeline.gap;

    return svg.el({style: {
      width: '100%',
      height: '100%'
    }}, [...range(gapCount).map(this.renderLine)]);
  }
}

Ruler.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

module.exports = Ruler;
