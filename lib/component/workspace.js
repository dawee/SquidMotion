const React = require('react');
const Paper = require('material-ui/Paper').default;
const DrawingBoard = require('./drawingboard');

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: '300px'
};

class Workspace extends React.Component {

  render() {
    return (
      <Paper zDepth={1} rounded={false} style={style}>
        <DrawingBoard document={this.props.project.document} />
      </Paper>
    );
  }
}

module.exports = Workspace;
