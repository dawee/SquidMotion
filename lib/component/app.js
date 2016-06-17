const Component = require('../component');
const ReactDOM = require('react-dom');
const bindAll = require('101/bind-all');
const PaperEl = require('material-ui/Paper').default;
const darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const MuiThemeProviderEl = require('material-ui/styles/MuiThemeProvider').default;
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

const Paper = Component.from(PaperEl);
const MuiThemeProvider = Component.from(MuiThemeProviderEl);

class App extends Component {

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

ReactDOM.render(App.el(), document.getElementById('content'));
