import React from 'react';
import {selectElement} from '../action/svg'; 


export default class SVGElement extends React.Component {
  onClick() {
  }

  onContextMenu() {}

  onDoubleClick() {}

  onDrag() {}

  onDragEnd() {}

  onDragEnter() {}

  onDragExit() {}

  onDragLeave() {}

  onDragOver() {}

  onDragStart() {}

  onDrop() {}

  onMouseDown() {
    if (!!this.props.bounds) {
      selectElement(this.props.id);
    }
  }

  onMouseEnter() {}

  onMouseLeave() {}

  onMouseMove() {}

  onMouseOut() {}

  onMouseOver() {}

  onMouseUp() {}
}
