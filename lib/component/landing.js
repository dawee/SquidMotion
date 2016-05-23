import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {importSVG} from '../action/svg'; 


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

  onFileOpen(evt) {
    this.openFileCallback(this.refs.fileInput.files[0]);
  }

  render() {
    return (
      <div id="landing-page">
        <h1>Squid Motion</h1>
        <RaisedButton className="button" label="Open Project" primary={true} onClick={this.openProject.bind(this)} />
        <RaisedButton className="button" label="Import SVG" secondary={true} onClick={this.importSVG.bind(this)} />
        <input style={{display:'none'}} id="file" type="file" ref="fileInput" onChange={this.onFileOpen.bind(this)} />
      </div>
    )
  }
}
