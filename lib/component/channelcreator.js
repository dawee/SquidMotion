const React = require('react');
const Human = require('human-component');
const reactCSS = require('reactcss').default;
const Squid = require('../squid');
const actions = require('../actions');

const TableRow = Human.require(module, 'material-ui/Table', 'TableRow');
const TableRowColumn = Human.require(module, 'material-ui/Table', 'TableRowColumn');
const FlatButton = Human.require(module, 'material-ui/FlatButton');
const ContentAdd = Human.require(module, 'material-ui/svg-icons/content/add');

const createStyle = (me) => reactCSS({
  default: {
    button: {
      padding: 5,
    },
  },
}, me.props, me.state);


class ChannelCreator extends Squid.Component {

  onMouseDown() {
    actions.createPreparedChannel(this.props);
  }

  render() {
    const style = createStyle(this);

    return (
      TableRow.el(null,
        TableRowColumn.el({key: 'first'},
          FlatButton.el({style: style.button, onMouseDown: this.onMouseDown},
            ContentAdd.el({color: 'white'})
          )
        ),
        TableRowColumn.el({key: 'second'})
      )
    );
  }
}

ChannelCreator.events = [
  'onMouseDown',
];

ChannelCreator.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};

ChannelCreator.propTypes = {
  fileId: React.PropTypes.string.isRequired,
  animationId: React.PropTypes.string.isRequired,
};


module.exports = ChannelCreator;
