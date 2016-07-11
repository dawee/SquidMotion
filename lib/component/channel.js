const React = require('react');
const Human = require('human-component');
const reactCSS = require('reactcss').default;
const actions = require('../actions');
const ChannelStore = require('../store/channel');
const TimelineStore = require('../store/timeline');

const svg = Human.from('svg');
const Ruler = Human.require(module, './ruler');
const ChannelGrid = Human.require(module, './channelgrid');
const TableRow = Human.require(module, 'material-ui/Table', 'TableRow');
const TableRowColumn = Human.require(module, 'material-ui/Table', 'TableRowColumn');


const createStyle = (me) => reactCSS({
  default: {
    titleColumn: {
      width: 100,
      background: me.context.muiTheme.palette.primary1Color,
    },
    gridColumn: {
      padding: 0,
    },
  },
}, me.props, me.state);


class Channel extends React.Component {

  constructor(props) {
    super(props);

    this.boundDoubleClick = this.onDoubleClick.bind(this);
    this.state = {
      channel: ChannelStore.get({channelId: this.props.channelId}),
      timeline: TimelineStore.get({fileId: this.props.fileId}),
    };
  }


  onDoubleClick(evt) {
    const timeline = this.state.timeline;
    const time = (evt.nativeEvent.layerX / timeline.gapWidth) * timeline.gap;

    actions.createStep(this.props.fileId, this.props.channelId, time);
  }

  render() {
    const style = createStyle(this);

    return (
      TableRow.el(null,
        TableRowColumn.el({style: style.titleColumn, key: 'first'}, this.state.channel.name),
        TableRowColumn.el({style: style.gridColumn, key: 'second'},
          svg.el({width: '100%', height: '100%', onDoubleClick: this.boundDoubleClick},
            Ruler.el({
              withLabels: false,
              withSizing: false,
              root: 'g',
              fileId: this.props.fileId,
              key: 'ruler',
            }),
            ChannelGrid.el({
              fileId: this.props.fileId,
              channelId: this.props.channelId,
              key: 'grid',
            })
          )
        )
      )
    );
  }
}

Channel.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Channel.propTypes = {
  channelId: React.PropTypes.string.isRequired,
  fileId: React.PropTypes.string.isRequired,
};

module.exports = Channel;
