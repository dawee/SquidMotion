import React from 'react';


export default class SVGGroup extends React.Component {
  render() {
    var attributes = this.props.attributes;
       
    return <g transform={attributes.transform} >{this.props.content}</g>;
  }
}