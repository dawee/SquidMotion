import React from 'react';
import bindAll from '101/bind-all';
import Paper from 'material-ui/Paper';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Landing from './landing';
import Timeline from './timeline';
import Workspace from './workspace';
import projectStore from '../store/project';
import {maximizeWindow} from '../native';
import {deactivateSelection, moveSelection} from '../action/selection';


const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export default class App extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onProjectChange', 'onMouseMove', 'onMouseUp']);
    this.state = {project: projectStore.project};
    projectStore.on('change', this.onProjectChange);
  }

  onProjectChange() {
    this.setState({project: projectStore.project});
  }

  onMouseMove(evt) {
    moveSelection(evt);
  }

  onMouseUp() {
    deactivateSelection();
  }

  render() {
    let content = null;

    if (this.state.project !== null) {
      maximizeWindow();
      content = [
        <Workspace key={1} />,
        <Timeline key={2} />
      ];
    } else {
      content = <Landing />;
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Paper onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} style={style}>
          {content}
        </Paper>
      </MuiThemeProvider>
    );
  }
}
