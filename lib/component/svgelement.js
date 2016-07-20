const React = require('react');
const Human = require('human-component');
const omit = require('101/omit');
const Squid = require('../squid');
const NodeStore = require('../store/node');
const AnimationStore = require('../store/animation');
const actions = require('../actions');


const g = Human.from('g');
const rect = Human.from('rect');

class SVGElement extends Squid.Component {

  onDrag(tx, ty) {
    actions.translateSelected(this.props, tx, ty);
  }

  onMouseDown(evt) {
    actions.selectNode(this.props, this.props.nodeId, this.isShiftPressed());
    this.onDragEnter(evt);
    evt.nativeEvent.stopPropagation();
  }

  onNodeStoreChange() {
    this.setState({
      selected: this.state.node.selected,
      transform: this.state.node.computed.transform,
    });
  }

  onAnimationStoreChange() {
    this.setState({
      animationPlaying: AnimationStore.isCurrentAnimationPlaying(this.props.fileId),
    });
  }

  initState() {
    this.state = {
      node: NodeStore.get({fileId: this.props.fileId, nodeId: this.props.nodeId}),
      selected: false,
      animationPlaying: AnimationStore.isCurrentAnimationPlaying(this.props.fileId),
    };

    this.state.transform = this.state.node.computed.transform;
  }

  render() {
    const shape = Human.from(this.state.node.name);
    const transition = this.state.animationPlaying ? 'transform 0.05s linear' : 'none';

    return (
      g.el({style: {transform: this.state.transform, transition: transition}},
        !!this.state.node.boundingBox ? rect.el(
          Object.assign(
            {
              fill: 'transparent',
              stroke: 'black ',
              strokeDasharray: '4, 4',
              style: {
                opacity: this.state.selected && !this.state.animationPlaying ? 1 : 0,
              },
            },
            this.state.node.boundingBox
          )
        ) : null,
        shape.el(
          Object.assign(
            omit(this.state.node.computed, ['transform']),
            {
              transform: this.state.node.baseTransform,
              onMouseDown: this.onMouseDown,
            }
          )
        )
      )
    );
  }

}

SVGElement.events = [
  'onAnimationStoreChange',
  'onNodeStoreChange',
  'onMouseDown',
];

SVGElement.storeListeners = {
  onNodeStoreChange: NodeStore,
  onAnimationStoreChange: AnimationStore,
};

SVGElement.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  nodeId: React.PropTypes.string.isRequired,
};

module.exports = SVGElement;
