const React = require('react');
const Component = require('../component');
const PaperEl = require('material-ui/Paper').default;
const SubheaderEl = require('material-ui/Subheader').default;
const Ruler = require('./ruler');
const Channel = require('./channel');
const Tables = require('material-ui/Table');


const Paper = Component.from(PaperEl);
const Subheader = Component.from(SubheaderEl);
const Table = Component.from(Tables.Table);
const TableHeader = Component.from(Tables.TableHeader);
const TableHeaderColumn = Component.from(Tables.TableHeaderColumn);
const TableRow = Component.from(Tables.TableRow);
const TableBody = Component.from(Tables.TableBody);

const style = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '300px'
};

class Timeline extends Component {

  render() {
    let palette = this.context.muiTheme.palette;
    let headerStyle = {
      borderTopWidth: 1,
      borderTopStyle: 'solid',
      borderTopColor: palette.borderColor
    };

    return (
      Paper.el({zDepth: 1, rounded: false, style: style}, [
        Paper.el({zDepth: 1, rounded: false}, [
          Subheader.el(null, 'Timeline')
        ]),
        Table.el({selectable: false}, [
          TableHeader.el({displaySelectAll: false, adjustForCheckbox: false},
            TableRow.el({style: headerStyle}, [
              TableHeaderColumn.el({style: {width: 100}}),
              TableHeaderColumn.el({style: {padding: 0}},
                Ruler.el()
              )
            ])
          ),
          TableBody.el({displayRowCheckbox: false},
            Channel.el()
          )
        ])
      ])
    );
  }
}

module.exports = Timeline;

Timeline.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
