const React = require('react');
const Human = require('human-component');
const NodeStore = require('../store/node');


class SVGElement extends React.Component {

  constructor(props) {
    super(props);

    this.initState();
  }

  initState() {
    this.state = {
      node: NodeStore.get({fileId: this.props.fileId, nodeId: this.props.nodeId}),
    };
  }

  render() {
    const shape = Human.from(this.state.node.name);

    return shape.el(this.state.node.computed);
  }

}

SVGElement.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  nodeId: React.PropTypes.string.isRequired,
};

module.exports = SVGElement;
