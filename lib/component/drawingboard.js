import React from 'react';
import Paper from 'material-ui/Paper';
import SVGImage from './svgimage';
import imageStore from '../store/image';


export default class DrawingBoard extends React.Component {

  constructor() {
    super();

    this.state = {image: imageStore.live};
    imageStore.on('change', this.onImageStoreChange.bind(this));
  }

  onImageStoreChange() {
    this.setState({image: imageStore.live});
  }

  render() {
    var svgImage = null;

    if (!!this.state.image) svgImage = <SVGImage image={this.state.image} />

    return <Paper className="drawing-board">{svgImage}</Paper>
  }
}