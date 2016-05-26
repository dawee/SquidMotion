import React from 'react';
import SVGElement from './svgelement';


export default class SVGCircle extends SVGElement {
  render() {
    return <circle {...this.getAttributes()} />;
  }
}