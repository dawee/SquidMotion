const Component = require('../component');
const bindAll = require('101/bind-all');
const RaisedButtonEl = require('material-ui/RaisedButton').default;
const importSVG = require('../action/svg').importSVG;
const centered = require('../style').centered;

const style = {
  landing: Object.assign({
    width: '450px',
    height: '250px',
    textAlign: 'center'
  }, centered),
  title: {
    fontFamily: 'barrioregular',
    fontSize: '65px'
  },
  button: {
    display: 'inline-block',
    marginLeft: '5px',
    marginRight: '5px'
  },
  file: {
    display: 'none'
  }
};

const div = Component.from('div');
const h1 = Component.from('h1');
const input = Component.from('input');
const RaisedButton = Component.from(RaisedButtonEl);

class Landing extends Component {

  constructor(props) {
    super(props);

    bindAll(this, ['openProject', 'importSVG', 'onFileOpen']);
  }

  onFileOpen() {
    this.openFileCallback(this.refs.fileInput.files[0]);
  }

  openProject() {}

  openFile(extension, callback) {
    this.openFileCallback = callback;
    this.refs.fileInput.setAttribute('accept', extension);
    this.refs.fileInput.click();
  }

  importSVG() {
    this.openFile('.svg', importSVG);
  }

  render() {
    return (
      div.el({style: style.landing}, [
        h1.el({style: style.title}, 'Squid Motion'),
        RaisedButton.el({
          label: 'Open Project',
          primary: true,
          onClick: this.openProject,
          style: style.button
        }),
        RaisedButton.el({
          label: 'Import SVG',
          secondary: true,
          onClick: this.importSVG,
          style: style.button
        }),
        input.el({
          type: 'file',
          ref: 'fileInput',
          onChange: this.onFileOpen,
          style: style.file
        })
      ])
    );
  }
}

module.exports = Landing;
