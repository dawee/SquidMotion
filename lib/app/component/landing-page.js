import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const LandingPage = () => (
  <Paper id="landing-page" zDepth={1}>
    <h1>Squid Motion</h1>
    <button-wrapper>
      <RaisedButton label="Create new" primary={true} />
    </button-wrapper>
    <button-wrapper class="button-wrapper">
      <RaisedButton label="Open" secondary={true} />
    </button-wrapper>
  </Paper>
);

export default LandingPage;