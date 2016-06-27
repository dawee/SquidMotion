const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');
const actions = require('../actions');
const darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;

const Paper = Human.require(module, 'material-ui/Paper');
const Landing = Human.require(module, './landing');
const MuiThemeProvider = Human.require(module, 'material-ui/styles/MuiThemeProvider');


const createStyle = (me) => reactCSS({
  default: {
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  },
}, me.props, me.state);


class App extends React.Component {

  componentDidMount() {
    actions.showWindow();
  }

  render() {
    const style = createStyle(this);

    return (
      MuiThemeProvider.el({muiTheme: getMuiTheme(darkBaseTheme)},
        Paper.el({style: style.container},
          Landing.el()
        )
      )
    );
  }

}

module.exports = App;
