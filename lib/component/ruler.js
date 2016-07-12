const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const TimelineStore = require('../store/timeline');
const range = require('range-iterable').range;

const g = Human.from('g');
const rect = Human.from('rect');
const text = Human.from('text');


class Ruler extends Squid.Component {

  initState() {
    this.state = {timeline: TimelineStore.get({fileId: this.props.fileId})};
  }

  renderLineLabel(index, coord) {
    const palette = this.context.muiTheme.palette;
    const time = index * this.state.timeline.gap;

    return text.el({key: 'label', x: 0, y: `${coord.y - 5}%`, style: {
      fill: palette.primary3Color,
      transform: `translateX(${coord.x}px)`,
      transformOrigin: 'center',
      transition: 'transform 0.3s',
      textAlign: 'center',
    }}, `${time / 1000}s`);
  }

  renderLine(index) {
    const is10Gap = index % 10 === 0;
    const palette = this.context.muiTheme.palette;
    const x = index * this.state.timeline.gapWidth;
    const y = this.props.withSizing ? (is10Gap ? '70' : '90') : '0';
    const height = this.props.withSizing ? (is10Gap ? '30' : '10') : '100';
    const gapStyle = {
      fill: is10Gap ? palette.primary1Color : palette.primary3Color,
      transform: `translateX(${x}px)`,
      transformOrigin: 'center',
      transition: 'transform 0.3s',
    };

    return g.el({key: index},
      rect.el({x: 0, y: `${y}%`, width: 1, height: `${height}%`, style: gapStyle, key: 'line'}),
      this.props.withLabels && is10Gap ? [this.renderLineLabel(index, {x, y})] : []
    );
  }

  render() {
    const gapCount = this.state.timeline.length / this.state.timeline.gap;
    const wrapper = Human.from(this.props.root || 'svg');

    return wrapper.el({style: {width: '100%', height: '100%'}},
      [...range(gapCount).map((index) => this.renderLine(index))]
    );
  }
}

Ruler.propTypes = {
  withLabels: React.PropTypes.bool.isRequired,
  withSizing: React.PropTypes.bool.isRequired,
  root: React.PropTypes.string,
  fileId: React.PropTypes.string.isRequired,
};

Ruler.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

module.exports = Ruler;
