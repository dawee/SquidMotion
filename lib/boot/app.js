import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LandingPage from '../app/component/landing-page';

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <Paper id="app">
      <LandingPage />
    </Paper>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.body);
