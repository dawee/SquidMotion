import React from 'react';
import Paper from 'material-ui/Paper';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SVGImage from './svgimage';
import imageStore from '../store/image';


export default class DrawingBoard extends React.Component {

  constructor() {
    super();

    this.state = {image: imageStore.live};
    imageStore.on('change', this.onImageStoreChange.bind(this));
  }

  onImageStoreChange() {
    this.setState({image: imageStore.live});
  }

  render() {
    var svgImage = null;

    if (!!this.state.image) svgImage = <SVGImage image={this.state.image} />

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Paper zDepth={3} rounded={false} className="drawing-board">{svgImage}</Paper>
      </MuiThemeProvider>
    )
  }
}