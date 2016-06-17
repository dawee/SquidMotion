const React = require('react');
const ReactDOM = require('react-dom');
const Component = require('../component');
const bindAll = require('101/bind-all');
const darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const projectStore = require('../store/project');
const maximizeWindow = require('../native').maximizeWindow;

const Paper = Component.require(module, 'material-ui/Paper');
const MuiThemeProvider = Component.require(module, 'material-ui/styles/MuiThemeProvider');
const Landing = Component.require(module, './landing');
const Timeline = Component.require(module, './timeline');
const Workspace = Component.require(module, './workspace');

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
        Workspace.el({key: 1, project: this.state.project}),
        Timeline.el({key: 2})
      ];
    } else {
      content = Landing.el();
    }

    return (
      MuiThemeProvider.el({muiTheme: getMuiTheme(darkBaseTheme)},
        Paper.el({onMouseMove: this.onMouseMove, onMouseUp: this.onMouseUp, style: style}, content)
      )
    );
  }
}

exports.boot = () => {
  ReactDOM.render(React.createElement(App), document.getElementById('content'));
};

