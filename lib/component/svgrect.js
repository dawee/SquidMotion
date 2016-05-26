import React from 'react';
import SVGElement from './svgelement';


export default class SVGRect extends SVGElement {
  render() {
    return <rect {...this.getAttributes()} />;
  }
}