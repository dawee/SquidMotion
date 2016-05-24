import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Landing from './landing';
import DrawingBoard from './drawingboard';
import projectStore from '../store/project';
import {maximizeWindow} from '../native';


export default class App extends React.Component {
  
  constructor() {
    super();

    this.state = {project: projectStore.project};
    projectStore.on('change', this.onProjectChange.bind(this));
  }

  onProjectChange() {
    this.setState({project: projectStore.project});
  }

  render() {
    var content = null;

    if (this.state.project !== null) {
      maximizeWindow();
      content = <DrawingBoard />
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
