const React = require('react');
const Component = require('../component');
const bindAll = require('101/bind-all');
const createChannel = require('../action/channel').createChannel;

const TableRow = Component.require(module, 'material-ui/Table', 'TableRow');
const TableRowColumn = Component.require(module, 'material-ui/Table', 'TableRowColumn');
const FlatButton = Component.require(module, 'material-ui/FlatButton');
const ContentAdd = Component.require(module, 'material-ui/svg-icons/content/add');


class ChannelCreator extends React.Component {

  constructor(props) {
    super(props);
    bindAll(this, ['onMouseDown']);
  }

  onMouseDown() {
    createChannel();
  }

  render() {
    return (
      TableRow.el(null,
        TableRowColumn.el(null,
          FlatButton.el({style: {padding: 5}, onMouseDown: this.onMouseDown},
            ContentAdd.el({color: 'white'})
          )
        ),
        TableRowColumn.el(null)
      )
    );
  }
}


module.exports = ChannelCreator;
