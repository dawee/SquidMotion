const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const TimelineStore = require('../store/timeline');
const range = require('range-iterable').range;

const g = Human.from('g');
const rect = Human.from('rect');
const text = Human.from('text');


class Ruler extends Squid.Component {

  onTimelineStoreChange() {
    this.setState({timeline: TimelineStore.get({animationId: this.props.animationId})});
  }

  initState() {
    this.state = {timeline: TimelineStore.get({animationId: this.props.animationId})};
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
      WebkitUserSelect: 'none',
      cursor: 'default',
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
    const style = {
      width: this.state.timeline.gapWidth * this.state.timeline.length / this.state.timeline.gap,
      height: '100%',
      transform: `translateX(-${this.state.timeline.scroll}px)`,
    };

    return wrapper.el({style: style},
      [...range(gapCount).map((index) => this.renderLine(index))]
    );
  }
}

Ruler.storeListeners = {
  onTimelineStoreChange: TimelineStore,
};

Ruler.propTypes = {
  withLabels: React.PropTypes.bool.isRequired,
  withSizing: React.PropTypes.bool.isRequired,
  root: React.PropTypes.string,
  fileId: React.PropTypes.string.isRequired,
  animationId: React.PropTypes.string.isRequired,
};


module.exports = Ruler;
