import React from 'react';
import Paper from 'material-ui/Paper';
import DrawingBoard from './drawingboard';

const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: '300px'
};

export default class Timeline extends React.Component {

  render() {
    return (
      <Paper zDepth={1} rounded={false} style={style}>
        <DrawingBoard />
      </Paper>
    );
  }
}
