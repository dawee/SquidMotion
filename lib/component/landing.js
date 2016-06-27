const React = require('react');
const Human = require('human-component');
const reactCSS = require('reactcss').default;

const div = Human.from('div');
const h1 = Human.from('h1');
const input = Human.from('input');
const RaisedButton = Human.require(module, 'material-ui/RaisedButton');


const createStyle = (me) => reactCSS({
  default: {
    landing: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      width: '450px',
      height: '250px',
      textAlign: 'center',
    },
    title: {
      fontFamily: 'barrioregular',
      fontSize: '65px',
    },
    button: {
      display: 'inline-block',
      marginLeft: '5px',
      marginRight: '5px',
    },
    file: {
      display: 'none',
    },
  },
}, me.props, me.state);


class Landing extends React.Component {

  getKey() {
    return 'landing';
  }

  render() {
    const style = createStyle(this);

    return (
      div.el({style: style.landing},
        h1.el({style: style.title, key: 'title'}, 'Squid Motion'),
        RaisedButton.el({
          label: 'Open Project',
          primary: true,
          onClick: this.openProject,
          style: style.button,
          key: 'open-button',
        }),
        RaisedButton.el({
          label: 'Import SVG',
          secondary: true,
          onClick: this.importSVG,
          style: style.button,
          key: 'import-button',
        }),
        input.el({
          type: 'file',
          onChange: this.onFileOpen,
          style: style.file,
          key: 'file-input',
        })
      )
    );
  }
}

module.exports = Landing;
