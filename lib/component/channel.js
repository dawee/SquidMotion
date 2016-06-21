const React = require('react');
const Component = require('../component');
const bindAll = require('101/bind-all');
const timelineStore = require('../store/timeline');

const ChannelGrid = Component.require(module, './channelgrid');
const TableRow = Component.require(module, 'material-ui/Table', 'TableRow');
const TableRowColumn = Component.require(module, 'material-ui/Table', 'TableRowColumn');


class Channel extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onTimelineChange']);
    this.state = {
      channel: props.channel,
      timeline: timelineStore.settings
    };

    timelineStore.on('change', this.onTimelineChange);
  }

  onTimelineChange() {
    this.setState({timeline: timelineStore.settings});
  }

  render() {
    let palette = this.context.muiTheme.palette;
    let titleStyle = {width: 100, backgroundColor: palette.primary1Color};

    return (
      TableRow.el(null, [
        TableRowColumn.el({style: titleStyle}, this.state.channel.name),
        TableRowColumn.el({style: {padding: 0}}, [
          ChannelGrid.el({channel: this.state.channel, timeline: this.state.timeline})
        ])
      ])
    );
  }
}

Channel.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

Channel.propTypes = {
  channel: React.PropTypes.object.isRequired,
};

module.exports = Channel;
