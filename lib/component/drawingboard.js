const React = require('react');
const Component = require('../component');
const bindAll = require('101/bind-all');
const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const animationStore = require('../store/animation');
const centered = require('../style').centered;

const Paper = Component.require(module, 'material-ui/Paper');
const MuiThemeProvider = Component.require(module, 'material-ui/styles/MuiThemeProvider');
const SVGImage = Component.require(module, './svgimage');

class DrawingBoard extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onAnimationStoreChange']);
    this.state = {
      image: animationStore.liveImage,
    };

    animationStore.on('change', this.onAnimationStoreChange);
  }

  onAnimationStoreChange() {
    this.setState({image: animationStore.liveImage});
  }

  render() {
    const image = this.state.image;

    return (
      MuiThemeProvider.el({muiTheme: getMuiTheme(lightBaseTheme)},
        Paper.el({zDepth: 3, rounded: false, style: centered},
          SVGImage.onlyIf(!!image).el({image: image, document: this.props.document})
        )
      )
    );
  }
}

DrawingBoard.propTypes = {
  document: React.PropTypes.object.isRequired,
};

module.exports = DrawingBoard;
