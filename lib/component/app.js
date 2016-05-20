import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './landing-page';
import projectStore from '../store/project';

export default class App extends React.Component {
  
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper id="app" ref="container">
          <LandingPage />
        </Paper>
      </MuiThemeProvider>
    )
  }
}
