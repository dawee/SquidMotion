import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from './landing-page';
import projectStore from '../store/project';


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
      nw.Window.get().setMaximumSize(0, 0);
      nw.Window.get().setMinimumSize(0, 0);
      nw.Window.get().maximize();
  
      document.getElementById('image').appendChild(
        this.state.projects[0].svgDoc.getElementsByTagName('svg')[0]
      );
    } else {
      content = <LandingPage />;
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
