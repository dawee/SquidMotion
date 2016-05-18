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

export default class LandingPage extends React.Component {
  
  openProject() {}

  newProject() {}

  render() {
    return (
      <div id="landing-page">
        <h1>Squid Motion</h1>
        <WrappedButton label="Create new" primary={true} onClick={this.newProject} />
        <WrappedButton label="Open" secondary={true} onClick={this.openProject} />
        <input style={{display:'none'}} id="file" type="file" />
      </div>
    )
  }
}
