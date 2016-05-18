import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

const WrappedButton = (opts) => (
  <div className="button-wrapper">
    <RaisedButton 
      label={opts.label}
      primary={opts.primary || false}
      secondary={opts.secondary || false}
      onClick={opts.onClick} />
  </div>
);

const FileInput = (opts) => (
  <input 
    style={{display:'none'}}
    id="file"
    type="file"
    ref={(ref) => opts.master.fileInput = ref}
    onChange={opts.onChange} />
);

export default class LandingPage extends React.Component {
  
  openProject() {}

  importSVG() {
    this.openFile('.svg', function (fileName) {
    });
  }

  openFile(extension, callback) {
    this.openFileCallback = callback;
    this.fileInput.setAttribute('accept', extension);
    this.fileInput.click();
  }

  onFileOpen(evt) {
    this.openFileCallback(this.fileInput.value);
  }

  render() {
    return (
      <div id="landing-page">
        <h1>Squid Motion</h1>
        <WrappedButton label="Open Project" primary={true} onClick={this.openProject.bind(this)} />
        <WrappedButton label="Import SVG" secondary={true} onClick={this.importSVG.bind(this)} />
        <FileInput master={this} onChange={this.onFileOpen.bind(this)} />
      </div>
    )
  }
}
