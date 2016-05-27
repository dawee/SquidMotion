import React from 'react';
import Paper from 'material-ui/Paper';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SVGImage from './svgimage';
import Selection from './selection';
import imageStore from '../store/image';
import selectionStore from '../store/selection';
import {centered} from '../style';


export default class DrawingBoard extends React.Component {

  constructor() {
    super();

    this.state = {
      image: imageStore.live,
      selectionBounds: selectionStore.bounds
    };
    
    imageStore.on('change', this.onImageStoreChange.bind(this));
    selectionStore.on('change', this.onSelectionStoreChange.bind(this));
  }

  onImageStoreChange() {
    this.setState({image: imageStore.live});
  }

  onSelectionStoreChange() {
    this.setState({selectionBounds: selectionStore.bounds});    
  }

  render() {
    let content = [];

    if (this.state.image !== null) {
      content.push(<SVGImage key={0} image={this.state.image} />);
    }

    if (this.state.selectionBounds !== null) {
       content.push(<Selection key={1} bounds={this.state.selectionBounds} />)
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Paper
          zDepth={3}
          rounded={false}
          style={centered}>
            {content}
        </Paper>
      </MuiThemeProvider>
    )
  }
}
