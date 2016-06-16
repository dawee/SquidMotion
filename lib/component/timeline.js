const React = require('react');
const Paper = require('material-ui/Paper').default;
const Subheader = require('material-ui/Subheader').default;
const Ruler = require('./ruler');
const Channel = require('./channel');
const Tables = require('material-ui/Table');

const Table = Tables.Table;
const TableHeader = Tables.TableHeader;
const TableHeaderColumn = Tables.TableHeaderColumn;
const TableRow = Tables.TableRow;
const TableBody = Tables.TableBody;

const style = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '300px'
};

class Timeline extends React.Component {

  render() {
    let palette = this.context.muiTheme.palette;
    let headerStyle = {
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: palette.borderColor
    };

    return (
      <Paper zDepth={1} rounded={false} style={style}>
        <Paper zDepth={1} rounded={false}>
          <Subheader>Timeline</Subheader>
        </Paper>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow style={headerStyle}>
              <TableHeaderColumn style={{width: 100}} />
              <TableHeaderColumn style={{padding: 0}}>
                <Ruler />
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            <Channel />
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

module.exports = Timeline;

Timeline.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
