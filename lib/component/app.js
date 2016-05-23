import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Landing from './landing';
import projectStore from '../store/project';
import {maximizeWindow} from '../native';

export default class App extends React.Component {
  
  constructor() {
    super();

    this.state = {projects: projectStore.projects};
    projectStore.on('change', this.onProjectChange.bind(this));
  }

  onProjectChange() {
    this.setState({projects: projectStore.projects});
  }

  render() {
    var content = null;

    if (this.state.projects.length > 0) {
      maximizeWindow();
      document.getElementById('image').appendChild(
        this.state.projects[0].svgRoot
      );
    } else {
      content = <Landing />;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper id="app" ref="container">
        {content}
        </Paper>
      </MuiThemeProvider>
    )
  }
}
