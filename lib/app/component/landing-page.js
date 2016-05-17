import React from 'react';
import ReactDOM from 'react-dom';
import RaisedButton from 'material-ui/RaisedButton';

const LandingPage = () => (
  <div id="landing-page">
    <h1>Squid Motion</h1>
    <button-wrapper>
      <RaisedButton label="Create new" primary={true} />
    </button-wrapper>
    <button-wrapper class="button-wrapper">
      <RaisedButton label="Open" secondary={true} />
    </button-wrapper>
  </div>
);

export default LandingPage;