const React = require('react');
const Human = require('human-component');
const omit = require('101/omit');
const Squid = require('../squid');
const NodeStore = require('../store/node');
const actions = require('../actions');


const g = Human.from('g');

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
      transform: this.state.node.computed.transform,
    });
  }

  initState() {
    this.state = {
      node: NodeStore.get({fileId: this.props.fileId, nodeId: this.props.nodeId}),
    };

    this.state.transform = this.state.node.computed.transform;
  }

  render() {
    const shape = Human.from(this.state.node.name);

    return (
      g.el({transform: this.state.transform},
        shape.el(Object.assign(
          {onMouseDown: this.onDragEnter},
          omit(this.state.node.computed, ['transform']),
          {transform: this.state.node.baseTransform}
        ))
      )
    );
  }

}

SVGElement.events = ['onNodeStoreChange'];

SVGElement.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  nodeId: React.PropTypes.string.isRequired,
};

module.exports = SVGElement;
