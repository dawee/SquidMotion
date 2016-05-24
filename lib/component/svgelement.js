import React from 'react';
import {selectElement} from '../action/svg'; 


export default class SVGElement extends React.Component {
  onClick() {
    if (!!this.props.bounds) {
      selectElement(this.props.id);
    }
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

  onMouseDown() {}

  onMouseEnter() {}

  onMouseLeave() {}

  onMouseMove() {}

  onMouseOut() {}

  onMouseOver() {}

  onMouseUp() {}
}
