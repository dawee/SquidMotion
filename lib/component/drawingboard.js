const React = require('react');
const Component = require('../component');
const bindAll = require('101/bind-all');
const PaperEl = require('material-ui/Paper').default;
const lightBaseTheme = require('material-ui/styles/baseThemes/lightBaseTheme').default;
const getMuiTheme = require('material-ui/styles/getMuiTheme').default;
const MuiThemeProviderEl = require('material-ui/styles/MuiThemeProvider').default;
const SVGImage = require('./svgimage');
const animationStore = require('../store/animation');
const centered = require('../style').centered;


const MuiThemeProvider = Component.from(MuiThemeProviderEl);
const Paper = Component.from(PaperEl);


class DrawingBoard extends Component {

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
      content.push(SVGImage.el({key: 0, image: this.state.image, document: this.props.document}));
    }

    return (
      MuiThemeProvider.el({muiTheme: getMuiTheme(lightBaseTheme)},
        Paper.el({zDepth: 3, rounded: false, style: centered}, content)
      )
    );
  }
}

DrawingBoard.propTypes = {
  document: React.PropTypes.object.isRequired
};

module.exports = DrawingBoard;
