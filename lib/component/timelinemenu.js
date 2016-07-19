const React = require('react');
const reactCSS = require('reactcss').default;
const Human = require('human-component');
const Squid = require('../squid');
const AnimationStore = require('../store/animation');
const actions = require('../actions');


const div = Human.from('div');
const SelectField = Human.require(module, 'material-ui/SelectField');
const MenuItem = Human.require(module, 'material-ui/MenuItem');


const createStyle = (me) => reactCSS({
  default: {
    animationSelector: {
      display: 'inline-block',
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

  onCurrentAnimationChange(event, index, value) {
    actions.selectAnimation(this.props, value);
  }

  initState() {
    this.state = {
      animations: AnimationStore.getAllAnimations(this.props.fileId),
    };
  }

  render() {
    const style = createStyle(this);

    return (
      div.el({key: 'menu', style: style.menu},
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
  'onCurrentAnimationChange',
];

TimelineMenu.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

TimelineMenu.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  animationId: React.PropTypes.string.isRequired,
};

module.exports = TimelineMenu;
