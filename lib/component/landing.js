import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {importSVG} from '../action/svg'; 
import {centered} from '../style';

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
}

export default class Landing extends React.Component {
  
  openProject() {}

  importSVG() {
    this.openFile('.svg', importSVG);
  }

  openFile(extension, callback) {
    this.openFileCallback = callback;
    this.refs.fileInput.setAttribute('accept', extension);
    this.refs.fileInput.click();
  }

  onFileOpen() {
    this.openFileCallback(this.refs.fileInput.files[0]);
  }

  render() {
    return (
      <div style={style.landing}>
        <h1 style={style.title}>Squid Motion</h1>
        <RaisedButton
          label="Open Project"
          primary={true}
          onClick={this.openProject.bind(this)}
          style={style.button} />
        <RaisedButton 
          label="Import SVG"
          secondary={true}
          onClick={this.importSVG.bind(this)}
          style={style.button} />
        <input
          type="file"
          ref="fileInput"
          onChange={this.onFileOpen.bind(this)}
          style={style.file} />
      </div>
    )
  }
}
