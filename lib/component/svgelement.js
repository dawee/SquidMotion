const React = require('react');
const Human = require('human-component');
const NodeStore = require('../store/node');
const actions = require('../actions');

class SVGElement extends React.Component {

  constructor(props) {
    super(props);

    this.initState();
    NodeStore.on(`change:${this.props.nodeId}`, this.onNodeStoreChange.bind(this));
    this.boundMouseDown = this.onMouseDown.bind(this);
    this.boundMouseMove = this.onMouseMove.bind(this);
    this.boundMouseUp = this.onMouseUp.bind(this);
  }

  initState() {
    this.state = {
      node: NodeStore.get({fileId: this.props.fileId, nodeId: this.props.nodeId}),
    };
  }

  onNodeStoreChange() {
    this.setState({
      node: NodeStore.get({fileId: this.props.fileId, nodeId: this.props.nodeId}),
    });
  }

  onMouseDown(evt) {
    this.dragging = true;
    this.lastX = evt.nativeEvent.screenX;
    this.lastY = evt.nativeEvent.screenY;
  }

  onMouseMove(evt) {
    if (!this.dragging) return;

    actions.translateNode(
      this.props.fileId,
      this.props.nodeId,
      evt.nativeEvent.screenX - this.lastX,
      evt.nativeEvent.screenY - this.lastY
    )

    this.lastX = evt.nativeEvent.screenX;
    this.lastY = evt.nativeEvent.screenY;
  }

  onMouseUp() {
    this.dragging = false;
  }

  render() {
    const shape = Human.from(this.state.node.name);

    return shape.el(Object.assign({
      onMouseDown: this.boundMouseDown,
      onMouseMove: this.boundMouseMove,
      onMouseUp: this.boundMouseUp,
    }, this.state.node.computed, {
      transform: this.state.node.computed.matrix.serialize()
    }));
  }

}

SVGElement.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  nodeId: React.PropTypes.string.isRequired,
};

module.exports = SVGElement;
