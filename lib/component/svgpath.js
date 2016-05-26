import React from 'react';
import SVGElement from './svgelement';


export default class SVGPath extends SVGElement {
  render() {
    return <path {...this.getAttributes()} />;
  }
}