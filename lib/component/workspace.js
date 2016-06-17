const React = require('react');
const Component = require('../component');
const PaperEl = require('material-ui/Paper').default;
const DrawingBoard = require('./drawingboard');

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: '300px'
};

const Paper = Component.from(PaperEl);

class Workspace extends Component {

  render() {
    return (
      Paper.el({zDepth: 1, rounded: false, style: style}, [
        DrawingBoard.el(this.props.project)
      ])
    );
  }
}

Workspace.propTypes = {
  project: React.PropTypes.object.isRequired,
};


module.exports = Workspace;
