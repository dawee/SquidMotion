const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');
const actions = require('../actions');
const darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

const Paper = Human.require(module, 'material-ui/Paper');
const MuiThemeProvider = Human.require(module, 'material-ui/styles/MuiThemeProvider');


const styles = (/* component */) => reactCSS({
  default: {
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
});

class App extends React.Component {

  componentDidMount() {
    actions.showWindow();
  }

  render() {
    const style = styles(this);

    return (
      MuiThemeProvider.el({ muiTheme: getMuiTheme(darkBaseTheme) },
        Paper.el({style: style.container})
      )
    );
  }

}

module.exports = App;
