import React from 'react';


export default class SVGImage extends React.Component {
  render() {
    return (
      <svg 
        width={this.props.root.attributes.width}
        height={this.props.root.attributes.width}>
      </svg>
    )
  }
}
