import React from 'react';
import bindAll from '101/bind-all';
import Paper from 'material-ui/Paper';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SVGImage from './svgimage';
import animationStore from '../store/animation';
import {centered} from '../style';


export default class DrawingBoard extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onAnimationStoreChange']);
    this.state = {
      image: animationStore.liveImage
    };

    animationStore.on('change', this.onAnimationStoreChange);
  }

  onAnimationStoreChange() {
    this.setState({image: animationStore.liveImage});
  }

  render() {
    let content = [];

    if (this.state.image !== null) {
      content.push(<SVGImage key={0} image={this.state.image} document={this.props.document} />);
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Paper zDepth={3} rounded={false} style={centered}>
          {content}
        </Paper>
      </MuiThemeProvider>
    );
  }
}
