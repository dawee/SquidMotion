const React = require('react');
const Human = require('human-component');
const omit = require('101/omit');
const Squid = require('../squid');
const NodeStore = require('../store/node');
const actions = require('../actions');


const g = Human.from('g');
const rect = Human.from('rect');

class SVGElement extends Squid.Component {

  constructor(props) {
    super(props);
    NodeStore.on('change', this.onNodeStoreChange);
  }

  onDrag(tx, ty) {
    actions.translateSelected(this.props, tx, ty);
  }

  onMouseDown(evt) {
    actions.selectNode(this.props, this.props.nodeId, this.isShiftPressed());
    this.onDragEnter(evt);
  }

  onNodeStoreChange() {
    this.setState({
      selected: this.state.node.selected,
      transform: this.state.node.computed.transform,
    });
  }

  initState() {
    this.state = {
      node: NodeStore.get({fileId: this.props.fileId, nodeId: this.props.nodeId}),
      selected: false,
    };

    this.state.transform = this.state.node.computed.transform;
  }

  render() {
    const shape = Human.from(this.state.node.name);

    return (
      g.el({transform: this.state.transform},
        !!this.state.node.boundingBox ? rect.el(Object.assign({
          fill: 'transparent',
          stroke: 'black ',
          strokeDasharray: '4, 4',
          style: {opacity: this.state.selected ? 1 : 0},
        }, this.state.node.boundingBox)) : null,
        shape.el(Object.assign(
          {onMouseDown: this.onMouseDown},
          omit(this.state.node.computed, ['transform']),
          {transform: this.state.node.baseTransform}
        ))
      )
    );
  }

}

SVGElement.events = [
  'onNodeStoreChange',
  'onMouseDown',
];

SVGElement.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  nodeId: React.PropTypes.string.isRequired,
};

module.exports = SVGElement;
