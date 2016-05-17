import React from 'react';
import ReactDOM from 'react-dom';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from '../app/component/landing-page';

const darkMuiTheme = getMuiTheme(darkBaseTheme);

const App = () => (
  <MuiThemeProvider muiTheme={darkMuiTheme}>
    <LandingPage />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.body
);
