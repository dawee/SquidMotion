import React from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableRow, TableRowColumn, TableHeader, TableHeaderColumn} from 'material-ui/Table';


const style = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '300px'
};

export default class Timeline extends React.Component {

  render() {
    return (
      <Paper zDepth={1} rounded={false} style={style}>
        <Paper zDepth={1} rounded={false}>
          <Subheader>Timeline</Subheader>
        </Paper>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '10em'}}>Channels</TableHeaderColumn>
              <TableHeaderColumn>1|2|3 ...</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn style={{width: '10em', backgroundColor: this.context.muiTheme.palette.primary1Color}}>Channel #1</TableRowColumn>
                <TableRowColumn>...timeline here</TableRowColumn>
              </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

Timeline.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
