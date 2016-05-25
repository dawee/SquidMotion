import React from 'react';
import {selectElement} from '../action/svg'; 


export default class SVGElement extends React.Component {
  onClick() {}

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

  onMouseDown(evt) {
    if (!!this.props.bounds) {
      selectElement(this.props.id);
      //evt.stopPropagation();
    }
  }

  onMouseEnter() {}

  onMouseLeave() {}

  onMouseMove() {}

  onMouseOut() {}

  onMouseOver() {}

  onMouseUp() {}
}
