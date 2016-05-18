import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

const LandingPage = () => (
  <div id="landing-page">
    <h1>Squid Motion</h1>
    <div className="button-wrapper">
      <RaisedButton label="Create new" primary={true} />
    </div>
    <div className="button-wrapper">
      <RaisedButton label="Open" secondary={true} />
    </div>
  </div>
);

export default LandingPage;