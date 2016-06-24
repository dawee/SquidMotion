const React = require('react');
const Component = require('../component');
const bindAll = require('101/bind-all');
const selectElement = require('../action/selection').selectElement;
const animationStore = require('../store/animation');

const g = Component.from('g');
const rect = Component.from('rect');

class SVGElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {node: props.node, selected: false};

    bindAll(this, ['onMouseDown', 'onSelectionChange']);
    animationStore.on('change:selection', this.onSelectionChange);
  }

  onSelectionChange() {
    this.setState({selected: animationStore.isSelected(this.state.node.id)});
  }

  onMouseDown(evt) {
    selectElement(this.state.node.id, evt);
  }

  getAttributes() {
    return Object.assign({
      onMouseDown: this.onMouseDown,
      transform: this.state.node.matrix.serialize()
    }, this.state.node.attributes);
  }

  render() {
    const shape = Component.from(this.state.node.name);
    const selection = Object.assign({
      fill: 'transparent',
      strokeDasharray: '5,5',
      stroke: '#888'
    }, this.state.node.computeBoundingBox());

    return (
      g.el(null, [
        shape.el(this.getAttributes()),
        this.state.selected ? rect.el(selection) : null
      ])
    );
  }

}

SVGElement.propTypes = {
  node: React.PropTypes.object.isRequired,
};

module.exports = SVGElement;
