import React from 'react';
import {selectElement} from '../action/svg'; 
import {Matrix as TransformMatrix} from 'transformation-matrix-js';
import imageStore from '../store/image';


export default class SVGElement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {node: imageStore.live.mapping[props.id]};
  }

  getAttributes() {
    return Object.assign({
      transform: this.getTransform(),
      onMouseDown: this.onMouseDown.bind(this)
    }, this.state.node.attributes);
  }

  onMouseDown() {
    if (!!this.state.node.bounds) selectElement(this.state.node.id);
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
