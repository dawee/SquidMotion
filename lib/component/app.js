const React = require('react');
const bindAll = require('101/bind-all');
const Paper = require('material-ui/Paper').default;
const darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const Landing = require('./landing');
const Timeline = require('./timeline');
const Workspace = require('./workspace');
const projectStore = require('../store/project');
const maximizeWindow = require('../native').maximizeWindow;


const style = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

class App extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onProjectChange', 'onMouseMove', 'onMouseUp']);
    this.state = {project: projectStore.project};
    projectStore.on('change', this.onProjectChange);
  }

  onProjectChange() {
    this.setState({project: projectStore.project});
  }

  render() {
    let content = null;

    if (this.state.project !== null) {
      maximizeWindow();
      content = [
        <Workspace key={1} project={this.state.project} />,
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

module.exports = App;
