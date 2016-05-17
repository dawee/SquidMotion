import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

const LandingPage = () => (
  <div id="landing-page">
    <h1>Squid Motion</h1>
    <RaisedButton label="Import SVG file" />
    <RaisedButton label="Open existing project" />
  </div>
);

export default LandingPage;