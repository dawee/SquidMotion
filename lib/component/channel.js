const React = require('react');
const Human = require('human-component');
const reactCSS = require('reactcss').default;
const ChannelStore = require('../store/channel');
const StepStore = require('../store/step');

const svg = Human.from('svg');
const Ruler = Human.require(module, './ruler');
const ChannelStep = Human.require(module, './channelstep');
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
    svg: {
      width: '100%',
      height: '100%',
    },
  },
}, me.props, me.state);


class Channel extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      channel: ChannelStore.get({channelId: this.props.channelId}),
      stepIDs: StepStore.allIDs(this.props.channelId),
    };
  }

  render() {
    const style = createStyle(this);

    return (
      TableRow.el(null,
        TableRowColumn.el({style: style.titleColumn, key: 'first'}, this.state.channel.name),
        TableRowColumn.el({style: style.gridColumn, key: 'second'},
          svg.el(style.svg,
            Ruler.el({
              withLabels: false,
              withSizing: false,
              root: 'g',
              fileId: this.props.fileId,
              key: 'ruler',
            }),
            this.state.stepIDs.map((stepId) => ChannelStep.el({
              fileId: this.props.fileId,
              channelId: this.props.channelId,
              stepId: stepId,
              key: stepId,
            }))
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
