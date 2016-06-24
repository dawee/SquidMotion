const React = require('react');
const Component = require('../component');

const Paper = Component.require(module, 'material-ui/Paper');
const DrawingBoard = Component.require(module, './drawingboard');

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: '300px',
};


class Workspace extends React.Component {

  render() {
    return (
      Paper.el({style, zDepth: 1, rounded: false},
        DrawingBoard.el(this.props.project)
      )
    );
  }
}

Workspace.propTypes = {
  project: React.PropTypes.object.isRequired,
};


module.exports = Workspace;
