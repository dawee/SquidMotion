const bindAll = require('101/bind-all');
const React = require('react');
const Component = require('../component');
const animationStore = require('../store/animation');


const Paper = Component.require(module, 'material-ui/Paper');
const Subheader = Component.require(module, 'material-ui/Subheader');
const Ruler = Component.require(module, './ruler');
const Channel = Component.require(module, './channel');
const ChannelCreator = Component.require(module, './channelcreator');
const Table = Component.require(module, 'material-ui/Table', 'Table');
const TableHeader = Component.require(module, 'material-ui/Table', 'TableHeader');
const TableHeaderColumn = Component.require(module, 'material-ui/Table', 'TableHeaderColumn');
const TableRow = Component.require(module, 'material-ui/Table', 'TableRow');
const TableBody = Component.require(module, 'material-ui/Table', 'TableBody');

const style = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '300px',
};

class Timeline extends React.Component {

  constructor(props) {
    super(props);
    bindAll(this, ['onAnimationChange']);
    animationStore.on('change', this.onAnimationChange);

    this.state = {channels: animationStore.currentChannels()};
  }

  onAnimationChange() {
    this.setState({channels: animationStore.currentChannels()});
  }

  render() {
    const palette = this.context.muiTheme.palette;
    const headerStyle = {
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: palette.borderColor,
    };

    return (
      Paper.el({zDepth: 1, rounded: false, style: style},
        Paper.el({zDepth: 1, rounded: false},
          Subheader.el(null, 'Timeline')
        ),
        Table.el({selectable: false},
          TableHeader.el({displaySelectAll: false, adjustForCheckbox: false},
            TableRow.el({style: headerStyle},
              TableHeaderColumn.el({style: {width: 100}}),
              TableHeaderColumn.el({style: {padding: 0}},
                Ruler.el({withSizing: true, withLabels: true})
              )
            )
          ),
          TableBody.el({displayRowCheckbox: false}, this.state.channels.map((channel) => (
            Channel.el({channel: channel})
          )).concat(ChannelCreator.el()))
        )
      )
    );
  }
}

Timeline.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

module.exports = Timeline;

