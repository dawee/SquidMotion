const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const reactCSS = require('reactcss').default;
const AnimationStore = require('../store/animation');
const ChannelStore = require('../store/channel');


const Paper = Human.require(module, 'material-ui/Paper');
const Subheader = Human.require(module, 'material-ui/Subheader');
const Cursor = Human.require(module, './cursor');
const TimelineMenu = Human.require(module, './timelinemenu');
const TimelineIcon = Human.require(module, 'material-ui/svg-icons/action/timeline');


const createStyle = (me) => reactCSS({
  default: {
    timeline: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    icon: {
      marginBottom: -7,
      marginRight: 10,
    },
    header: {
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: me.context.muiTheme.palette,
    },
    firstColumn: {
      width: 100,
    },
    secondColumn: {
      padding: 0,
    },
  },
}, me.props, me.state);

class Timeline extends Squid.Component {

  onAnimationStoreChange() {
    const animationId = AnimationStore.getCurrentAnimation(this.props.fileId).animationId;

    this.setState({
      animationId: animationId,
      channelIds: ChannelStore.allIDs(animationId),
    });
  }

  onChannelStoreChange() {
    this.setState({
      animationId: this.state.animationId,
      channelIds: ChannelStore.allIDs(this.state.animationId),
    });
  }

  initState() {
    const animationId = AnimationStore.getCurrentAnimation(this.props.fileId).animationId;

    this.state = {
      animationId: animationId,
      channelIds: ChannelStore.allIDs(animationId),
    };
  }


  render() {
    const style = createStyle(this);

    return (
      Paper.el({style: style.timeline, zDepth: 1, rounded: false},
        TimelineMenu.el({
          key: 'menu',
          fileId: this.props.fileId,
          animationId: this.state.animationId,
        }),
        Paper.el({zDepth: 1, rounded: false, key: 'header'},
          Subheader.el(null,
            TimelineIcon.el({key: 'icon', style: style.icon}),
            'Timeline'
          )
        ),
        Cursor.el({
          key: 'cursor',
          fileId: this.props.fileId,
          animationId: this.state.animationId,
        })
      )
    );
  }
}

Timeline.storeListeners = {
  onAnimationStoreChange: AnimationStore,
  onChannelStoreChange: ChannelStore,
};

Timeline.propTypes = {
  fileId: React.PropTypes.string.isRequired,
};

module.exports = Timeline;
