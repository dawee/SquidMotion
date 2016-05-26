import React from 'react';
import {selectElement} from '../action/selection'; 
import {Matrix as TransformMatrix} from 'transformation-matrix-js';
import imageStore from '../store/image';


export default class SVGElement extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {node: imageStore.live.mapping[props.id]};
    imageStore.on('change:' + props.id, this.onChangeNode.bind(this));
  }

  onChangeNode() {
    this.setState({node: imageStore.live.mapping[this.state.node.id]});
  }

  getAttributes() {
    return Object.assign({
      transform: this.getTransform(),
      onMouseDown: this.onMouseDown.bind(this)
    }, this.state.node.attributes);
  }

  onMouseDown(evt) {
    if (!!this.state.node.bounds) selectElement(this.state.node.id, evt);
  }

  getTransform() {
    return TransformMatrix.from(
      this.state.node.matrix.a,
      this.state.node.matrix.b,
      this.state.node.matrix.c,
      this.state.node.matrix.d,
      this.state.node.matrix.e,
      this.state.node.matrix.f
    ).toCSS();
  }
}
