const React = require('react');
const bindAll = require('101/bind-all');
const selectElement = require('../action/selection').selectElement;
const animationStore = require('../store/animation');


class SVGElement extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onChangeNode']);
    this.state = {node: props.node};
    animationStore.on('change:' + props.node.id, this.onChangeNode);
  }

  onChangeNode(evt) {
    this.setState({node: evt.node});
  }

  onMouseDown(evt) {
    if (!!this.state.node.bounds) selectElement(this.state.node.id, evt);
  }

  getAttributes() {
    return Object.assign({
      onMouseDown: this.onMouseDown.bind(this)
    }, this.state.node.attributes);
  }

}

module.exports = SVGElement;

SVGElement.propTypes = {
  id: React.PropTypes.string.isRequired
};
