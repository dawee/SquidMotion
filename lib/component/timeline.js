const React = require('react');
const Human = require('human-component');
const Squid = require('../squid');
const reactCSS = require('reactcss').default;
const ChannelStore = require('../store/channel');


const Paper = Human.require(module, 'material-ui/Paper');
const Subheader = Human.require(module, 'material-ui/Subheader');
const Ruler = Human.require(module, './ruler');
const Channel = Human.require(module, './channel');
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

  constructor(props) {
    super(props);

    this.state = {channelIds: ChannelStore.allIDs(this.props.fileId)};
  }

  render() {
    const style = createStyle(this);

    return (
      Paper.el({style: style.timeline, zDepth: 1, rounded: false},
        Paper.el({zDepth: 1, rounded: false, key: 'header'},
          Subheader.el(null, 'Timeline')
        ),
        Table.el({selectable: false, key: 'channels-table'},
          TableHeader.el({displaySelectAll: false, adjustForCheckbox: false, key: 'header'},
            TableRow.el({style: style.header},
              TableHeaderColumn.el({style: style.firstColumn, key: 'first'}),
              TableHeaderColumn.el({style: style.secondColumn, key: 'second'},
                Ruler.el({withLabels: true, withSizing: true, fileId: this.props.fileId})
              )
            )
          ),
          TableBody.el({displayRowCheckbox: false, key: 'body'},
            this.state.channelIds.map((channelId) => Channel.el({
              channelId: channelId,
              fileId: this.props.fileId,
              key: channelId,
            }))
          )
        )
      )
    );
  }
}

Timeline.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Timeline.propTypes = {
  fileId: React.PropTypes.string.isRequired,
};

module.exports = Timeline;
