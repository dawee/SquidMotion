const React = require('react');
const bindAll = require('101/bind-all');
const diff = require('deep-diff');

let dragging = false;
let dragger = null;
let lastX = 0;
let lastY = 0;
let shiftPressed = false;

function updatePressedKeys(evt) {
  shiftPressed = evt.getModifierState('Shift');
}

document.addEventListener('keydown', updatePressedKeys);
document.addEventListener('keyup', updatePressedKeys);

class Component extends React.Component {

  constructor(props) {
    super(props);
    this.bindEvents();
    this.initState();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !!diff(this.state, nextState);
  }

  onDragEnter(evt) {
    dragging = true;
    dragger = this;
    lastX = evt.nativeEvent.screenX;
    lastY = evt.nativeEvent.screenY;
    dragger.onDragStart();
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
    if (!dragging) return;

    dragger.onDragStop();
    dragging = false;
    dragger = null;
  }

  onDragStart() {}
  onDragStop() {}
  onDrag() {}

  initState() {}

  isShiftPressed() {
    return shiftPressed;
  }

  bindEvents() {
    bindAll(this, [
      'onDrag',
      'onDragEnter',
      'onDragMove',
      'onDragLeave',
    ].concat(this.constructor.events || []));
  }

}

exports.Component = Component;
