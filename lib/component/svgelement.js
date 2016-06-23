const React = require('react');
const Component = require('../component');
const bindAll = require('101/bind-all');
const selectElement = require('../action/selection').selectElement;

const g = Component.from('g');
const rect = Component.from('rect');

class SVGElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {node: props.node};

    bindAll(this, ['onMouseDown']);
  }

  onMouseDown(evt) {
    if (!!this.state.node.bounds) selectElement(this.state.node.id, evt);
  }

  getAttributes() {
    return Object.assign({
      onMouseDown: this.onMouseDown,
      transform: this.state.node.matrix.serialize()
    }, this.state.node.attributes);
  }

  render() {
    const shape = Component.from(this.state.node.name);
    const boundingBox = this.state.node.computeBoundingBox();

    return (
      g.el(null, [
        shape.el(this.getAttributes()),
        rect.el(boundingBox)
      ])
    );
  }

}

SVGElement.propTypes = {
  node: React.PropTypes.object.isRequired,
};

module.exports = SVGElement;
