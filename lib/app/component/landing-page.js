import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

export default class LandingPage extends React.Component {
  
  openProject() {}

  newProject() {}

  render() {
    return (
      <div id="landing-page">
        <h1>Squid Motion</h1>
        <div className="button-wrapper">
          <RaisedButton label="Create new" primary={true} onClick={this.newProject} />
        </div>
        <div className="button-wrapper">
          <RaisedButton label="Open" secondary={true} onClick={this.openProject} />
        </div>
        <input style={{display:'none'}} id="file" type="file" />
      </div>
    )
  }
}
