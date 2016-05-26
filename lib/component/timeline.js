import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <Paper zDepth={1} rounded={false}>
            <Subheader>Timeline</Subheader>
          </Paper>
        </MuiThemeProvider>
      </Paper>
    )
  }
}
