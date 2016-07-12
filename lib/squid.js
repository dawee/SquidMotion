const React = require('react');


let count = 0;
let dragging = false;
let dragger = null;
let lastX = 0;
let lastY = 0;


class Component extends React.Component {

  onDragEnter(evt) {
    dragging = true;
    dragger = this;
    lastX = evt.nativeEvent.screenX;
    lastY = evt.nativeEvent.screenY;
  }

  onDragMove(evt) {
    if (!dragging) return;
    
    dragger.onDrag(
      evt.nativeEvent.screenX - lastX,
      evt.nativeEvent.screenY - lastY
    );
    
    lastX = evt.nativeEvent.screenX;
    lastY = evt.nativeEvent.screenY;
  }

  onDragLeave() {
    dragging = false;
    dragger = null;
  }

  onDrag(tx, ty) {}
}

exports.Component = Component;