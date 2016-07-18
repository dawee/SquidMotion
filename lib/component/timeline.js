const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const reactCSS = require('reactcss').default;
const ChannelStore = require('../store/channel');
const AnimationStore = require('../store/animation');
const actions = require('../actions');


const Paper = Human.require(module, 'material-ui/Paper');
const Subheader = Human.require(module, 'material-ui/Subheader');
const Cursor = Human.require(module, './cursor');
const Ruler = Human.require(module, './ruler');
const Channel = Human.require(module, './channel');
const SelectField = Human.require(module, 'material-ui/SelectField');
const MenuItem = Human.require(module, 'material-ui/MenuItem');
const TimelineIcon = Human.require(module, 'material-ui/svg-icons/action/timeline');
const Table = Human.require(module, 'material-ui/Table', 'Table');
const TableHeader = Human.require(module, 'material-ui/Table', 'TableHeader');
const TableHeaderColumn = Human.require(module, 'material-ui/Table', 'TableHeaderColumn');
const TableRow = Human.require(module, 'material-ui/Table', 'TableRow');
const TableBody = Human.require(module, 'material-ui/Table', 'TableBody');


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
    animationSelector: {
      position: 'absolute',
      right: 0,
      top: 0,
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

  initState() {
    this.state = {
      channelIds: ChannelStore.allIDs(this.props.animationId),
      animations: AnimationStore.getAllAnimations(this.props.fileId),
    };
  }

  onCurrentAnimationChange(event, index, value) {
    actions.selectAnimation(this.props, value);
  }

  render() {
    const style = createStyle(this);

    return (
      Paper.el({style: style.timeline, zDepth: 1, rounded: false},
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
        ),
        Paper.el({zDepth: 1, rounded: false, key: 'header'},
          Subheader.el(null, 
            TimelineIcon.el({style: style.icon}),
            'Timeline'
          )
        ),
        Cursor.el({
          key: 'cursor',
          fileId: this.props.fileId,
          animationId: this.props.animationId,
        }),
        Table.el({selectable: false, key: 'channels-table'},
          TableHeader.el({displaySelectAll: false, adjustForCheckbox: false, key: 'header'},
            TableRow.el({style: style.header},
              TableHeaderColumn.el({style: style.firstColumn, key: 'first'}),
              TableHeaderColumn.el({style: style.secondColumn, key: 'second'},
                Ruler.el({
                  withLabels: true,
                  withSizing: true,
                  fileId: this.props.fileId,
                  animationId: this.props.animationId,
                })
              )
            )
          ),
          TableBody.el({displayRowCheckbox: false, key: 'body'},
            this.state.channelIds.map((channelId) => Channel.el({
              fileId: this.props.fileId,
              animationId: this.props.animationId,
              channelId: channelId,
              key: channelId,
            }))
          )
        )
      )
    );
  }
}

Timeline.events = [
  'onCurrentAnimationChange',
];

Timeline.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Timeline.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  animationId: React.PropTypes.string.isRequired,
};

module.exports = Timeline;
