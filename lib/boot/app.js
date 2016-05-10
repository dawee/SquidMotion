import React from 'react';
import ReactDOM from 'react-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from '../app/landing';

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <LandingPage />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.body
);
