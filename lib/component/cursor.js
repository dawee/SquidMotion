const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const TimelineStore = require('../store/timeline');
const reactCSS = require('reactcss').default;
const actions = require('../actions');

const createStyle = (me) => reactCSS({
  default: {
    cursor: {
      position: 'absolute',
      top: 48,
      left: 148 + me.state.left - 10,
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '20px 10px 0 10px',
      borderColor: 'transparent',
      borderTopColor: (
        me.state.selected
          ? me.context.muiTheme.palette.accent1Color
          : me.context.muiTheme.palette.primary1Color
      ),
      zIndex: 10,
    },
    line: {
      position: 'absolute',
      top: 48,
      bottom: 0,
      width: 1,
      left: 148 + me.state.left,
      backgroundColor: (
        me.state.selected
          ? me.context.muiTheme.palette.accent1Color
          : me.context.muiTheme.palette.primary1Color
      ),
      zIndex: 0,
      pointerEvents: 'none',
    },
  },
}, me.props, me.state);


const div = Human.from('div');


class Cursor extends Squid.Component {

  constructor(props) {
    super(props);
    TimelineStore.on('change', this.onTimelineChange);
  }

  onDrag(tx) {
    actions.moveTime(this.props, this.state.timeline, tx);
  }

  onDragStart() {
    this.setState({selected: true});
  }

  onDragStop() {
    this.setState({selected: false});
  }

  initState() {
    this.state = {
      left: TimelineStore.getCursorLeft(this.props.animationId),
      timeline: TimelineStore.get({animationId: this.props.animationId}),
      selected: false,
    };
  }

  onTimelineChange() {
    this.setState({left: TimelineStore.getCursorLeft(this.props.animationId)});
  }

  render() {
    const style = createStyle(this);

    return (
      div.el(null,
        div.el({style: style.line}),
        div.el({style: style.cursor, onMouseDown: this.onDragEnter})
      )
    );
  }

}

Cursor.events = [
  'onTimelineChange',
];

Cursor.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  animationId: React.PropTypes.string.isRequired,
};

Cursor.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

module.exports = Cursor;
