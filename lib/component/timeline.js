import React from 'react';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Ruler from './ruler';
import Channel from './channel';
import {Table, TableBody, TableRow, TableHeader, TableHeaderColumn} from 'material-ui/Table';


const style = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '300px'
};

export default class Timeline extends React.Component {

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

Timeline.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
