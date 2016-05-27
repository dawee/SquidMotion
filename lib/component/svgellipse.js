import React from 'react';
import SVGElement from './svgelement';


export default class SVGEllipse extends SVGElement {
  render() {
    return <ellipse {...this.getAttributes()} />;
  }

}
