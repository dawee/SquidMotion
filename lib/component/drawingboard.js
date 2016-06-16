const React = require('react');
const bindAll = require('101/bind-all');
const Paper = require('material-ui/Paper').default;
const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
const SVGImage = require('./svgimage');
const animationStore = require('../store/animation');
const centered = require('../style').centered;


class DrawingBoard extends React.Component {

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

module.exports = DrawingBoard;
