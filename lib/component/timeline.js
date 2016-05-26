import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import AppBar from 'material-ui/AppBar';

const style = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '300px'
};

export default class Timeline extends React.Component {

  render() {
    return (
      <Paper zDepth={1} rounded={false} style={style}>
        <AppBar title="Timeline" />
      </Paper>
    )
  }
}
