const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const NodeStore = require('../store/node');
const actions = require('../actions');


class SVGElement extends Squid.Component {

  constructor(props) {
    super(props);
    NodeStore.on('change', this.onNodeStoreChange);
  }

  onDrag(tx, ty) {
    actions.translateNode(this.props, this.props.nodeId, tx, ty);
  }

  onNodeStoreChange() {
    this.setState({
      node: NodeStore.get({fileId: this.props.fileId, nodeId: this.props.nodeId}),
    });
  }

  initState() {
    this.state = {
      node: NodeStore.get({fileId: this.props.fileId, nodeId: this.props.nodeId}),
    };
  }

  render() {
    const shape = Human.from(this.state.node.name);

    return shape.el(Object.assign(
      {onMouseDown: this.onDragEnter},
      this.state.node.computed,
      {transform: this.state.node.computed.matrix.serialize()}
    ));
  }

}

SVGElement.events = ['onNodeStoreChange'];

SVGElement.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  nodeId: React.PropTypes.string.isRequired,
};

module.exports = SVGElement;
