const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');
const Squid = require('../squid');
const AnimationStore = require('../store/animation');
const actions = require('../actions');


const div = Human.from('div');
const SelectField = Human.require(module, 'material-ui/SelectField');
const MenuItem = Human.require(module, 'material-ui/MenuItem');
const PlayIcon = Human.require(module, 'material-ui/svg-icons/av/play-arrow');
const StopIcon = Human.require(module, 'material-ui/svg-icons/av/stop');
const RaisedButton = Human.require(module, 'material-ui/RaisedButton');


const createStyle = (me) => reactCSS({
  default: {
    animationSelector: {
      marginLeft: 20,
    },
    playButton: {
      position: 'relative',
      verticalAlign: 'center',
      width: 40,
      minWidth: 40,
      height: 40,
      top: -4,
    },
    menu: {
      position: 'absolute',
      right: 0,
      top: 0,
      width: 'auto',
      textAlign: 'right',
    },
  },
}, me.props, me.state);


class TimelineMenu extends Squid.Component {

  constructor(props) {
    super(props);
    AnimationStore.on('change', this.onAnimationStoreChange);
  }

  onAnimationStoreChange() {
    this.setState({playing: AnimationStore.isAnimationPlaying(this.props.animationId)});
  }

  onCurrentAnimationChange(event, index, value) {
    actions.selectAnimation(this.props, value);
  }

  onTogglePlay() {
    actions.togglePlayAnimation(this.props, this.props.animationId, this.state.playing);
  }

  initState() {
    this.state = {
      animations: AnimationStore.getAllAnimations(this.props.fileId),
      playing: AnimationStore.isAnimationPlaying(this.props.animationId),
    };
  }

  render() {
    const style = createStyle(this);
    const palette = this.context.muiTheme.palette;
    const buttonColor = this.state.playing ? palette.accent1Color : palette.primary1Color;
    const buttonIcon = this.state.playing ? StopIcon.el() : PlayIcon.el();

    return (
      div.el({key: 'menu', style: style.menu},
        RaisedButton.el({
          key: 'play-button',
          style: style.playButton,
          icon: buttonIcon,
          backgroundColor: buttonColor,
          onMouseDown: this.onTogglePlay,
        }),
        SelectField.el({
          key: 'animation-selector',
          style: style.animationSelector,
          value: this.props.animationId,
          onChange: this.onCurrentAnimationChange,
        },
          this.state.animations.map((animation) => MenuItem.el({
            key: animation.animationId,
            value: animation.animationId,
            primaryText: animation.name,
          }))
        )
      )
    );
  }

}

TimelineMenu.events = [
  'onAnimationStoreChange',
  'onCurrentAnimationChange',
  'onTogglePlay',
];

TimelineMenu.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

TimelineMenu.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  animationId: React.PropTypes.string.isRequired,
};

module.exports = TimelineMenu;
