const React = require('react');
const bindAll = require('101/bind-all');
const selectElement = require('../action/selection').selectElement;
const animationStore = require('../store/animation');


class SVGElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {node: props.node};

    bindAll(this, ['onChangeNode', 'onMouseDown']);
    animationStore.on('change:' + props.node.id, this.onChangeNode);
  }

  onChangeNode(evt) {
    this.setState({node: evt.node});
  }

  onMouseDown(evt) {
    if (!!this.state.node.bounds) selectElement(this.state.node.id, evt);
  }

  render() {
    return React.createElement(this.state.node.name, Object.assign({
      onMouseDown: this.onMouseDown,
      transform: this.state.node.matrix.serialize()
    }, this.state.node.attributes));
  }

}

SVGElement.propTypes = {
  node: React.PropTypes.object.isRequired,
};

module.exports = SVGElement;
