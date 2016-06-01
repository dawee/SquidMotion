import React from 'react';
import bindAll from '101/bind-all';
import {selectElement} from '../action/selection';
import animationStore from '../store/animation';


export default class SVGElement extends React.Component {

  constructor(props) {
    super(props);

    bindAll(this, ['onChangeNode']);
    this.state = {node: animationStore.computeLiveImage()[props.id]};
    animationStore.on('change:' + props.id, this.onChangeNode);
  }

  onChangeNode() {
    this.setState({node: animationStore.computeLiveImage()[this.state.node.id]});
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

SVGElement.propTypes = {
  id: React.PropTypes.string.isRequired
};
