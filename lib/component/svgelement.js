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
      onMouseDown: this.onMouseDown.bind(this)
    }, this.state.node.attributes);
  }

  onMouseDown(evt) {
    if (!!this.state.node.bounds) selectElement(this.state.node.id, evt);
  }

}
